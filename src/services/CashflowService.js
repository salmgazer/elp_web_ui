import categories from "../config/cashflowCategories";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";
import getUnixTime from 'date-fns/getUnixTime';
import getTime from 'date-fns/getTime'
import format from "date-fns/format";
import database from "../models/database";
import Cashflow from "../models/cashflow/Cashflow";
import * as Q from "@nozbe/watermelondb/QueryDescription";

export default class CashflowService {
    static async exportDefaultCashflowCategories() {
        const entities = categories.categories;
        for (let i = 0; i < entities.length; i++){
            const category = entities[i];

            await new ModelAction('CashflowCategory').post(category);
        }

        const items = await new ModelAction('CashflowCategory').indexNotObserve();

        console.log(items)
        return items;
    }

    static async addCollection(formFields) {
        const category = await new ModelAction('CashflowCategory').findByColumnNotObserve({
            name: 'name',
            value: formFields.category,
            fxn: 'eq'
        });
        console.log(formFields)
        console.log(category[0].id);
        console.log(format(new Date(LocalInfo.workingDate), 'MM/dd/yyyy'))
        console.log(getUnixTime(format(new Date(LocalInfo.workingDate), 'MM/dd/yyyy')))
        return await new ModelAction('Cashflow').post({
            amount: parseFloat(formFields.amount),
            type: formFields.type,
            categoryId: category[0].id,
            branchId: LocalInfo.branchId,
            username: LocalInfo.userFullName,
            status: formFields.status || 'pending',
            createdBy: LocalInfo.userId,
            dateAdded: getTime(new Date(LocalInfo.workingDate)),
        });
    }

    static async getTodayCollections(){
        const day = format(new Date() , 'MM/dd/yyyy');
        const dataCollection = await database.collections.get(Cashflow.table);

        return await dataCollection.query(
            //Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getTime(new Date(day)))
        ).fetch();
    }

    static async getTodayPendingCollections(){
        const day = format(new Date() , 'MM/dd/yyyy');
        const dataCollection = await database.collections.get(Cashflow.table);

        return await dataCollection.query(
            Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getTime(new Date(day)))
        ).fetch();
    }

    static async approveCollection(id){
        console.log(id)
        return await new ModelAction('Cashflow').update(id , {
            status: 'approved'
        });
    }

    static async disapproveCollection(id){
        console.log(id)
        return await new ModelAction('Cashflow').update(id , {
            status: 'pending'
        });
    }

    static async changeCollectionDate(value) {
        const day = format(new Date(value) , 'MM/dd/yyyy');
        const dataCollection = await database.collections.get(Cashflow.table);

        return await dataCollection.query(
            Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getTime(new Date(day)))
        ).fetch();
    }
}
