import LocalInfo from "./LocalInfo";
import database from "../models/database";
import {v4 as uuid} from "uuid";
import Audits from "../models/audit/Audit";
import ModelAction from "./ModelAction";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import AuditEntries from "../models/auditEntry/AuditEntries";
import BranchStockService from "./BranchStockService";
import format from "date-fns/format";
import SaleService from "./SaleService";

export default class AuditService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    async auditId() {
        if(!await database.adapter.getLocal("auditId")){
            const dataCollection = database.collections.get(Audits.table);

            await database.action(async () => {
                const newAudit = await dataCollection.create(audit => {
                    audit.branchId = LocalInfo.branchId;
                    audit.createdBy = LocalInfo.userId;
                    audit._raw.id = uuid()
                });

                await database.adapter.setLocal("auditId" , await newAudit.id);
            });
        }

        const auditId = await database.adapter.getLocal("auditId");
        localStorage.setItem('auditId' , auditId);

        return auditId;
    }

    static async auditEntryQuantity() {
        const auditId = await new AuditService().auditId();

        let quantity = await new ModelAction('AuditEntries').findByColumnNotObserve({
            name: 'auditId',
            value: auditId,
            fxn: 'eq'
        });

        return await quantity.length;
    }

    async addProductToAudit(data) {
        const auditId = await this.auditId();

        const dataCollection = database.collections.get('auditEntries');

        let product = await dataCollection.query(
            Q.where('auditId' , auditId),
            Q.where('productId' , data.productId)
        ).fetch();

        if(product.length > 0){
            product = product[0];

            try {
                new ModelAction('AuditEntries').update(product.id , {
                    auditId: product.auditId,
                    branchId: LocalInfo.branchId,
                    productId: product.productId,
                    branchProductId: product.branchProductId,
                    sellingPrice: data.sellingPrice,
                    costPrice: parseFloat(data.costPrice),
                    storeQuantity: parseFloat(data.storeQuantity),
                    quantityCounted: data.quantityCounted + product.quantityCounted,
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
            new ModelAction('AuditEntries').post(columns);

            return true;
        } catch (e) {
            return false;
        }
    }

    async getAuditProductDetails(productId , auditId = this.auditId()){
        const dataCollection = database.collections.get(AuditEntries.table);

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
        try{
            const auditEntries = await new ModelAction('AuditEntries').findByColumnNotObserve({
                name: 'auditId',
                value: await auditId,
                fxn: 'eq'
            });

            const salesColumn = {
                type: 'audit',
                paymentType: 'audit',
                customerId: 0,
                discount: 0,
                branchId: LocalInfo.branchId,
                salesDate: format(new Date(), 'MM/dd/yyyy'),
                receiptNumber: uuid(),
                createdBy: LocalInfo.userId,
            };

            await new ModelAction('Sales').post(salesColumn);
            const sale = await SaleService.getLastSale();

            auditEntries.map((entry) => {
                if(entry.quantityCounted > entry.storeQuantity){
                    console.log("Stock")

                    const formFields = {
                        quantity: entry.quantityCounted - entry.storeQuantity,
                        sellingPrice: entry.sellingPrice,
                        costPrice: entry.costPrice,
                        paymentSource: 'audit',
                        type: 'audit',
                        productId: entry.productId,
                        branchProductId: entry.branchProductId,
                        branchId: LocalInfo.branchId,
                    };

                    new BranchStockService().addStock(formFields);

                }else if(entry.storeQuantity > entry.quantityCounted){
                    console.log("Sale")
                    const entryColumns = {
                        productId: entry.productId,
                        customerId: 0,
                        sellingPrice: entry.sellingPrice,
                        quantity: parseFloat(entry.storeQuantity - entry.quantityCounted),
                        saleId: sale.id,
                        discount: 0,
                        costPrice: entry.costPrice,
                        branchId: entry.branchId,
                        branchProductId: entry.branchProductId,
                    };

                    new ModelAction('SaleEntry').post(entryColumns);
                }
            });

            const data = {
                changeDue: 0,
                amountPaid: await SaleService.getSaleEntryAmountById(sale.id)
            };

            localStorage.removeItem("auditId");
            await database.adapter.removeLocal("auditId");
            SaleService.makePayment(sale , data);

            return true;
        }catch (e) {
            return false;
        }

    }
}
