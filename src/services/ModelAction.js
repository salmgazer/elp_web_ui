import database from "../models/database";
import models from "../models/models";
import { Q } from '@nozbe/watermelondb'

export default class ModelAction {
    constructor(model) {
        this.model = models[model];
        this.table = models[model].table;
        this.database = database;
        this.columns = models[model].columns;
    }

    /*
    * @var
    * @return array of items
    * */
    async index(){
        return database.collections.get(this.table).query().observe();
    }

    /*
    * @var
    * @return object
    * */
    async findById(id){
        const dataCollection = database.collections.get(this.table);

        return dataCollection.findAndObserve(id);
    }

    /*
    * @var
    * @return array
    * */
    async findByColumns(columns){
        const dataCollection = database.collections.get(this.table);

        return dataCollection.query(
            columns.map(column => this.queryType(column))
        ).observe();
    }

    /*
    *Create an item
    * @var
    * @return object
    * */
    async post(columns){
        const dataCollection = database.collections.get(this.table);

        database.action(async () => {
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
    async update(id , columns){
        const dataCollection = database.collections.get(this.table).find(id);

        database.action(async () => {
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
        const dataCollection = database.collections.get(this.table).find(id);

        await database.action(async () => {
            await dataCollection.markAsDeleted() // syncable
        })
    }

    /*
    *Delete an item
    * @var
    * @return object
    * */
    async destroy(id){
        const dataCollection = database.collections.get(this.table).find(id);

        await database.action(async () => {
            await dataCollection.destroyPermanently() // permanent
        })
    }

    /*
    * @todo query like the available query parameters
    * */
    async queryType(column) {
        switch (column.fxn) {
            case '':
                return Q.where(column.name , column.value);
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