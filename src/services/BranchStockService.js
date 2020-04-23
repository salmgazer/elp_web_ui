import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import database from '../models/database';
import { Q } from '@nozbe/watermelondb'

export default class BranchStockService{
    constructor(){
        this.branchId = LocalInfo.branchId;
        this.companyId = LocalInfo.companyId;
    }

    async addStock(formFields){
        const stockColumns = {
            quantity: parseFloat(formFields.quantity),
            branchId: formFields.branchId,
            productId: formFields.productId,
            branchProductId: formFields.branchProductId,
            costPrice: parseFloat(formFields.costPrice),
            createdBy: LocalInfo.userId,
        };

        try{
            const response = await new ModelAction('BranchProductStock').post(stockColumns);

            if(await BranchStockService.addStockHistory()){
                await BranchStockService.addPurchase(formFields);
                await BranchStockService.updateProduct(formFields);

                return true;
            }

            return false;
        } catch (e) {
            return false;
        }
    }

    async moveStock(formFields){
        const response = await this.addStock(formFields);
        alert(await formFields.branchProductId[0].id)
        if(response){
            const lastStock = await BranchStockService.getLastStock(formFields.branchId);

            const stockMovementColumns = {
                quantity: parseFloat(formFields.quantity),
                branchId: formFields.moveTo,
                productId: formFields.productId,
                branchProductId: (await formFields.branchProductId[0].id),
                costPrice: parseFloat(formFields.costPrice),
                branchFrom: formFields.moveFrom,
                branchTo: formFields.moveTo,
                createdBy: LocalInfo.userId,
                branchProductStockId: lastStock.id,
            };

            try{
                const response = await new ModelAction('StockMovement').post(stockMovementColumns);

                return true;
            } catch (e) {
                return false;
            }

        }else{
            return false;
        }
    }

    static async getLastStock(branchId = LocalInfo.branchId){
        const lastStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: branchId,
            fxn: 'eq',
        });

        return lastStock[lastStock.length - 1];
    }

    static async addStockHistory(){
        const lastStock = await BranchStockService.getLastStock();

        const historyColumns = {
            branchProductStockId: lastStock.id,
            quantity: lastStock.quantity,
            branchProductId: lastStock.branchProductId,
            createdBy: lastStock.createdBy,
        };

        try{
            await new ModelAction('BranchProductStockHistory').post(historyColumns);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async addPurchase(formFields){
        const lastStock = await BranchStockService.getLastStock();

        const purchaseColumns = {
            branchProductStockId: lastStock.id,
            amount: lastStock.quantity * lastStock.costPrice,
            branchId: lastStock.branchId,
            createdBy: lastStock.createdBy,
            paymentSource: formFields.paymentSource,
        };

        try{
            await new ModelAction('BranchPurchases').post(purchaseColumns);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async updateProduct(formFields){
        await new ModelAction('BranchProduct').update(formFields.branchProductId,{
            sellingPrice: parseFloat(formFields.sellingPrice)
        })
    }

    async getLastProductStock(productId){
        const dataCollection = await database.collections.get('branches_products_stocks');
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const stock = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('branchId' , Q.oneOf(branches))
        ).fetch();

        return stock[stock.length - 1];
    }

    async getCompanyProductStock(productId){
        const dataCollection = await database.collections.get('branches_products_stocks');
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const stock = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('branchId' , Q.oneOf(branches))
        ).fetch();

        return stock;
    }

    async getProductStockQuantity(productId){
        return ((await this.getCompanyProductStock(productId))).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    async getBranchStockQuantities(productId){
        const branches = LocalInfo.branches;
        const dataCollection = await database.collections.get('branches_products');

        const stocks = await this.getCompanyProductStock(productId);
        console.log(stocks)
        const response = branches.map((branch) => {
            const branchStock = stocks.filter(stock => stock.branchId === branch.id);
            console.log(branchStock)

            let branchProduct = dataCollection.query(
                Q.where('productId' , productId),
                Q.where('branchId' , branch.id)
            ).fetch();

            return {
                name: branch.name,
                quantity: (branchStock).reduce((a, b) => a + (b['quantity'] || 0), 0),
                id: branch.id,
                productId: productId,
                branchProductId: branchProduct,
            }
        });
        console.log(response)
        return response;
    }

    static async getBranchProductQuantity(productId , branchId){
        const dataCollection = await database.collections.get('branches_products_stocks');

        const stock = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('branchId' , branchId)
        ).fetch();

    }

    async getBranchItemsLeft(){

    }

    async getLowStockItems(){

    }

    async getItemsOutOfStock(){

    }
}
