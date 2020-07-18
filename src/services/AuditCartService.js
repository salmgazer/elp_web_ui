import LocalInfo from "./LocalInfo";
import database from "../models/database";
import {v4 as uuid} from "uuid";
import ModelAction from "./ModelAction";
import BranchStockService from "./BranchStockService";
import SaleService from "./SaleService";
import { Q } from '@nozbe/watermelondb';
import getUnixTime from "date-fns/getUnixTime";
import CustomerService from "./CustomerService";
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import AuditCartEntries from "../models/auditCartEntry/AuditCartEntries";
import AuditCarts from "../models/auditCart/AuditCart";

export default class AuditCartService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    async auditId() {
        const aId = localStorage.getItem("auditId") || "";
        if(!aId){
            try{
                const response = await new ModelAction('AuditCarts').post({
                    branchId: LocalInfo.branchId,
                    createdBy: LocalInfo.userId,
                    status: 'unbalanced',
                    isActive: true,
                    auditDate: getUnixTime(new Date()),
                });

                await database.adapter.setLocal("auditId" , response.id);
                localStorage.setItem('auditId' , response.id);
            }catch (e) {
                console.log("Problem creating audit identifier");
                return false
            }
        }

        return await database.adapter.getLocal("auditId");
    }

    static async auditEntryQuantity() {
        const auditId = await new AuditCartService().auditId();

        let quantity = await new ModelAction('AuditCartEntries').findByColumnNotObserve({
            name: 'auditId',
            value: auditId,
            fxn: 'eq'
        });

        return await quantity;
    }

    static async deleteLocalAudits() {
        try {
            const audits = await new ModelAction('AuditCarts').indexNotObserve();
            const entries = await new ModelAction('AuditCartEntries').indexNotObserve();

            for(let i = 0; i < audits.length; i++){
                await new ModelAction('AuditCarts').destroy(audits[i].id);
            }

            for(let i = 0; i < entries.length; i++){
                await new ModelAction('AuditCartEntries').destroy(entries[i].id);
            }
        }catch (e) {
            console.log(e);
            return e;
        }
    }

    /*static async deleteAudits() {
        try {
            const audits = await new ModelAction('Audits').indexNotObserve();
            const entries = await new ModelAction('AuditEntries').indexNotObserve();

            for(let i = 0; i < audits.length; i++){
                await new ModelAction('Audits').softDelete(audits[i].id);
            }

            for(let i = 0; i < entries.length; i++){
                await new ModelAction('AuditEntries').softDelete(entries[i].id);
            }
        }catch (e) {
            console.log(e);
            return e;
        }
    }*/

    async changeAuditedProductsType(value , auditId = this.auditId()) {
        const collection = await database.collections.get(AuditCartEntries.table);

        const entries = await collection.query(
            Q.where('auditId' , await auditId)
        ).fetch();

        switch (value) {
            case 'all':
                return entries;
            case 'zero':
                return entries.filter((entry) => entry.storeQuantity === entry.quantityCounted);
            case 'positive':
                return entries.filter((entry) => entry.quantityCounted > entry.storeQuantity);
            case 'negative':
                return entries.filter((entry) => entry.quantityCounted < entry.storeQuantity);
            default:
                return 'error';
        }
    }

    /*
    * Search for a branch product
    * */
    async searchBranchAuditedProduct(searchValue, auditId = this.auditId()) {

        const products = await new ModelAction('Product').findByColumnNotObserve({
            name: 'name',
            value: searchValue,
            fxn: 'like'
        });

        return database.collections.get(AuditCartEntries.table).query(
            Q.where('productId', Q.oneOf(products.map(p => p.id))),
            Q.where('branchId', LocalInfo.branchId),
            Q.where('auditId' , await auditId)
        ).fetch();
    }

    async addProductToAudit(data) {
        const auditId = await this.auditId();

        const dataCollection = database.collections.get(AuditCartEntries.table);

        let product = await dataCollection.query(
            Q.where('auditId' , auditId),
            Q.where('productId' , data.productId)
        ).fetch();

        if(product.length > 0){
            product = product[0];

            try {
                new ModelAction('AuditCartEntries').update(product.id , {
                    auditId: product.auditId,
                    branchId: LocalInfo.branchId,
                    productId: product.productId,
                    branchProductId: product.branchProductId,
                    sellingPrice: data.sellingPrice,
                    costPrice: parseFloat(data.costPrice),
                    storeQuantity: parseFloat(data.storeQuantity),
                    quantityCounted: data.quantityCounted,
                    //quantityCounted: data.quantityCounted + product.quantityCounted,
                });

                return true;
            } catch (e) {
                return false;
            }
        }

        const columns = {
            auditId: auditId,
            branchId: LocalInfo.branchId,
            productId: data.productId,
            branchProductId: data.branchProductId,
            sellingPrice: data.sellingPrice,
            costPrice: data.costPrice,
            storeQuantity: parseFloat(data.storeQuantity),
            quantityCounted: data.quantityCounted,
        };

        try {
            new ModelAction('AuditCartEntries').post(columns);

            return true;
        } catch (e) {
            return false;
        }
    }

    async getAuditProductDetails(productId , auditId = this.auditId()){
        const dataCollection = database.collections.get(AuditCartEntries.table);

        const product = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('auditId' , await auditId),
        ).fetch();

        if(product.length === 0){
            return false;
        }else{
            return product[0];
        }
    }

    async balanceAllProducts(auditId = this.auditId()) {
        const aId = await auditId;

        try {
            const auditEntries = await new ModelAction('AuditCartEntries').findByColumnNotObserve({
                name: 'auditId',
                value: aId,
                fxn: 'eq'
            });
            let saleCount = 0;

            /*
            * @todo change audit date current working date
            * */

            const salesColumn = {
                type: 'audit',
                paymentType: 'audit',
                customerId: (await CustomerService.getCashCustomer())[0].id,
                discount: 0,
                branchId: LocalInfo.branchId,
                salesDate: getUnixTime(new Date()),
                receiptNumber: uuid(),
                createdBy: LocalInfo.userId,
            };

            await new ModelAction('Sales').post(salesColumn);

            const sale = await SaleService.getLastSale();

            for (let i = 0; i < auditEntries.length; i++){
                const entry = auditEntries[i];

                if (entry.quantityCounted > entry.storeQuantity) {

                    const formFields = {
                        quantity: entry.quantityCounted - entry.storeQuantity,
                        costPrice: entry.costPrice,
                        sellingPrice: entry.sellingPrice,
                        type: 'audit',
                        productId: entry.productId,
                        branchProductId: entry.branchProductId,
                        branchId: LocalInfo.branchId,
                        stockDate: getUnixTime(new Date()),
                    };

                    await new BranchStockService().addStock(formFields);

                } else if (entry.storeQuantity > entry.quantityCounted) {
                    saleCount++;

                    const entryColumns = {
                        productId: entry.productId,
                        customerId: 0,
                        sellingPrice: entry.sellingPrice,
                        quantity: parseFloat(entry.storeQuantity - entry.quantityCounted),
                        saleId: sale.id,
                        discount: 0,
                        entryDate: getUnixTime(new Date()),
                        costPrice: entry.costPrice,
                        branchId: entry.branchId,
                        branchProductId: entry.branchProductId,
                    };

                    await new ModelAction('SaleEntry').post(entryColumns);
                }
            }

            const data = {
                type: 5,
                changeDue: 0,
                amountPaid: await SaleService.getSaleEntryAmountById(sale.id)
            };

            if(saleCount > 0){
                await SaleService.makePayment(sale, data);
            }else{
                await new ModelAction('Sales').softDelete(sale.id);
            }

            await new ModelAction('AuditCarts').update(aId , {
                status: 'balanced',
                isActive: false
            });

            localStorage.removeItem("auditId");
            await database.adapter.removeLocal("auditId");

            await this.auditId();
            return true;
        }catch (e) {
            return false;
        }

    }

    static async getAuditHistory(date){
        /*const auditEntries = await new ModelAction('AuditEntries').findByColumnNotObserve({
            name: 'branchId',
            value: LocalInfo.branchId,
            fxn: 'eq'
        });
*/
        const day = new Date(date);

        const start = getUnixTime(startOfDay(day));
        const end = getUnixTime(endOfDay(day));

        return await database.collections.get(AuditCarts.table).query(
            Q.where('isActive' , false),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('auditDate' , Q.between(start , end)),
        ).fetch();
    }

    async getAuditDetails(date) {
        const audit = await AuditCartService.getAuditHistory(date);

        console.log(audit);

        return {
            audits: audit
        }
    }

    static async getProductAuditHistory(productId) {
        return database.collections.get(AuditCartEntries.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('branchProductId' , productId)
        ).fetch();
    }
}
