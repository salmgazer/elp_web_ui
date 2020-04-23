import CartService from "./CartService";
import database from "../models/database";
import Carts from "../models/carts/Carts";
import {v4 as uuid} from 'uuid';
import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import BranchService from "./BranchService";

export default class SaleService {
    async makeSell(data , paymentType){
        const cartId = await new CartService().cartId();

        try {
            const cartCollection = await database.collections.get(Carts.table);
            const cart = await cartCollection.find(cartId);
            const salesColumn = {
                type: 'sales',
                paymentType: SaleService.getPaymentType(paymentType),
                customerId: cart.customerId,
                discount: cart.discount,
                branchId: cart.branchId,
                receiptNumber: uuid(),
                createdBy: LocalInfo.userId,
            };

            await new ModelAction('Sales').post(salesColumn);
            const sale = await SaleService.getLastSale();
            await database.adapter.setLocal("saleId" , sale.id);

            try {
                SaleService.importCartToSales(cartId , sale);
                SaleService.makePayment(sale , data);
                await database.adapter.removeLocal("activeCustomer");
                await database.adapter.removeLocal("cartId");
                localStorage.removeItem("cartId");
            }catch (e) {
                return false
            }

            return false;
        } catch (e) {
            return e;
        }
    }

    static getPaymentType(paymentType){
        switch (paymentType) {
            case 0:
                return 'cash';
            case 1:
                return 'MoMo';
            case 2:
                return 'credit';
            case 3:
                return 'other';
            default:
                return 'cash';
        }
    }

    static async makePayment(sales , data){
        localStorage.setItem('amountPaid' , data.amountPaid);
        const salePaymentColumns = {
            saleId: sales.id,
            customerId: sales.customerId,
            createdBy: LocalInfo.userId,
            amount: data.changeDue >= 0 ? parseFloat(data.amountPaid - data.changeDue) : parseFloat(data.amountPaid),
        };

        try {
            await new ModelAction('SaleInstallment').post(salePaymentColumns);
        } catch (e) {
            return false;
        }
    }

    static async getLastSale(){
        const sales = await new ModelAction('Sales').findByColumnNotObserve({
            name: 'branchId',
            value: LocalInfo.branchId,
            fxn: 'eq',
        });

        return sales[sales.length - 1];
    }

    static async importCartToSales(cartId , sale){
        const cartEntries = await new ModelAction('CartEntry').findByColumnNotObserve({
            name: 'cartId',
            value: cartId,
            fxn: 'eq',
        });

        cartEntries.forEach(async entry => {
            const entryColumns = {
                productId: entry.productId,
                customerId: entry.customerId,
                sellingPrice: entry.sellingPrice,
                quantity: entry.quantity,
                saleId: sale.id,
                discount: entry.discount,
                costPrice: entry.costPrice,
                branchId: entry.branchId,
                branchProductId: entry.branchProductId,
            };

            await new ModelAction('SaleEntry').post(entryColumns);
        });
    }

    /*
    *
    * Get cart individual items total
    * */
    getSaleEntryTotal(product){
        return parseFloat(((product.sellingPrice * product.quantity) - (product.discount * product.quantity))).toFixed(2);
    }

    /*
    *
    * Get cart individual items total
    * */
    getSaleEntryProfit(product){
        return parseFloat(((product.sellingPrice * product.quantity) - ((product.costPrice * product.quantity) + (product.discount * product.quantity)))).toFixed(2);
    }

    /*
    *
    * Get sale individual items cost price
    * */
    getSaleEntryCostPrice(product){
        return parseFloat(product.costPrice * product.quantity).toFixed(2);
    }

    /*
    *
    * Get sale individual items selling price
    * */
    getSaleEntrySellingPrice(product){
        return parseFloat((product.sellingPrice * product.quantity) - (product.discount * product.quantity)).toFixed(2);
    }

    /*
    * Get Sale products by Id
    */
    async getSaleProductsById(saleId){
        try {
            const saleCollection = await new ModelAction('SaleEntry').findByColumnNotObserve({
                name: 'saleId',
                value: saleId,
                fxn: 'eq',
            });

            return saleCollection;
        }catch (e) {
            return e;
        }
    }

    /*
    * Get Sale payment by Id
    * @todo hwy does it return only the first product...?
    */
    async getSalePaymentById(saleId){
        try {
            let paymentCollection = new ModelAction('SaleInstallment').findByColumnNotObserve({
                name: 'saleId',
                value: saleId,
                fxn: 'eq'
            });
            paymentCollection = await paymentCollection;

            return paymentCollection;
        }catch (e) {
            return e;
        }
    }

    /*
    * Get sale total amount by Id
    * */
    static async getSaleEntryAmountById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntryTotal(b) || 0), 0).toFixed(2);
    }

    static async getCartEntryAmount(){
        return ((await new CartService().getCartProducts())).reduce((a, b) => parseFloat(a) + parseFloat(new CartService().getCartEntryTotal(b) || 0), 0).toFixed(2);
    }

    static async getSaleProductQuantity(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    /*
    * Get sale total profit by Id
    * */
    static async getSaleEntryProfitById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntryProfit(b) || 0), 0).toFixed(2);
    }

    /*
    * Get sale total cost price by Id
    * */
    static async getSaleEntryCostPriceById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntryCostPrice(b) || 0), 0).toFixed(2);
    }

    /*
    * Get sale total cost price by Id
    * */
    static async getSaleEntrySellingPriceById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntrySellingPrice(b) || 0), 0).toFixed(2);
    }

    /*
    * Get sale total amountPaid by Id
    * */
    static async getSaleEntryAmountPaidById(saleId){
        return ((await new SaleService().getSalePaymentById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(b.amount || 0), 0).toFixed(2);
    }

    /*
    * Get sale credit left
    * */
    static async getSaleEntryCreditById(saleId){
        return ((await this.getSaleEntryAmountById(saleId)) - (await this.getSaleEntryAmountPaidById(saleId)))
    }

    /*
    * Get today sales total amount
    * @return number - promise
    * */
    async getTodaySalesDetails() {
        const todaySales = await new BranchService().getTodaySales();

        let total = 0;
        let profit = 0;
        for (let step = 0; step < todaySales.length; step++) {
            total += parseFloat(await SaleService.getSaleEntryAmountById(todaySales[step].id));
        }

        for (let step = 0; step < todaySales.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(todaySales[step].id));
        }

        return {
            total,profit
        };
    }

    /*
    * Get sale payment status
    * */

    static async getSalePaymentStatus(saleId){
        const saleAmount = await SaleService.getSaleEntryAmountById(saleId);
        const saleAmountPaid = await SaleService.getSaleEntryAmountPaidById(saleId);

        if(saleAmountPaid >= saleAmount){
            return 'Full payment';
        }else{
            return `Owes GHC ${saleAmount - saleAmountPaid}`;
        }
    }

    static async getAllSalesQuantity(){
        const branchId = LocalInfo.branchId;

        const sales = new ModelAction('Sales').findByColumnNotObserve({
            name: 'branchId',
            value: branchId,
            fxn: 'eq'
        });


    }
}
