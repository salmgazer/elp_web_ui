import models from "../models/models";
import { Q } from '@nozbe/watermelondb'
import database from '../models/database';

export default class ModelAction {
    constructor(modelName) {
        this.model = models[modelName];
        this.table = models[modelName].table;
        this.database = database;
        this.columns = models[modelName].columns;
    }

    /*
    * @var
    * @return array of items
    * */
    index(){
        return this.database.collections.get(this.table).query().observe();
    }

    /*
    * @var
    * @return object
    * */
    findById(id){
        const dataCollection = this.database.collections.get(this.table);

        return dataCollection.findAndObserve(id);
    }

    findByColumn(column){
        const dataCollection = this.database.collections.get(this.table);

        return dataCollection.query(
            this.queryType(column)
        ).observe();
    }

    /*
    * @var
    * @return array
    * */
    findByColumns(columns){
        const dataCollection = this.database.collections.get(this.table);

        //columns.map(column => console.log(column));
        return dataCollection.query(
            columns.map(column => this.queryType(column))
            //this.queryType(columns[0])
            //columns.map(column => this.queryType(column))
        ).observe();
    }

    /*
    *Create an item
    * @var
    * @return object
    * */
    post(columns){
        const dataCollection = this.database.collections.get(this.table);

        this.database.action(async () => {
            return dataCollection.create(item => {
                this.columns.map((column) => item[column] = columns[column])
            });
        })
    }

    /*
    *Create an item
    * @var
    * @return object
    * */
    update(id , columns){
        const dataCollection = this.database.collections.get(this.table).find(id);

        this.database.action(async () => {
            return dataCollection.update(item => {
                this.columns.map((column) => item[column] = columns[column])
            });
        })
    }

    /*
    *Delete an item
    * @var
    * @return object
    * */
    async softDelete(id){
        const dataCollection = this.database.collections.get(this.table).find(id);

        await this.database.action(async () => {
            await dataCollection.markAsDeleted() // syncable
        })
    }

    /*
    *Delete an item
    * @var
    * @return object
    * */
    async destroy(id){
        const dataCollection = this.database.collections.get(this.table).find(id);

        await this.database.action(async () => {
            await dataCollection.destroyPermanently() // permanent
        })
    }

    /*
    * @todo query like the available query parameters
    * */
    queryType(column) {
        switch (column.fxn) {
            case 'eq':
                console.log(column)
                return Q.where(column.name , Q.eq(column.value));
            case 'notEq':
                return Q.where(column.name , Q.notEq(column.value));
            case 'gt':
                return Q.where(column.name , Q.gt(column.value));
            case 'weakGt':
                return Q.where(column.name , Q.weakGt(column.value));
            case 'gte':
                return Q.where(column.name , Q.gte(column.value));
            case 'lt':
                return Q.where(column.name , Q.lt(column.value));
            case 'lte':
                return Q.where(column.name , Q.lte(column.value));
            case 'between':
                return Q.where(column.name , Q.between(column.min , column.max));
            case 'oneOf':
                return Q.where(column.name , Q.oneOf(column.value));
            case 'notIn':
                return Q.where(column.name , Q.notIn(column.value));
            case 'like':
                return Q.where(column.name , Q.like(`%${Q.sanitizeLikeString(column.value)}%`));
            case 'notLike':
                return Q.where(column.name , Q.notLike(`%${Q.sanitizeLikeString(column.value)}%`));
            default:
                return Q.where(column.name , Q.eq(column.value));

        }
    }
}