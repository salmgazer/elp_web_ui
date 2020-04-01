import database from "../models/database";
import models from "../models/models";
import { Q } from '@nozbe/watermelondb'

export default class ModelAction {
    constructor(model) {
        this.model = models[model];
        this.table = models[model].table;
        this.database = database;
        this.columns = models[model].columns;
        //console.log(this.columns.name)
    }

    /*
    * @var
    * @return array of items
    * */
    async index(){
        const data = await database.collections.get(this.table).query().observe();
        console.log(data);
        return await database.collections.get(this.table).query().observe();
    }

    /*
    * @var
    * @return object
    * */
    async findById(id){
        const dataCollection = database.collections.get(this.table);

        console.log(id);
        console.log(await dataCollection.find(id))
        return await dataCollection.findAndObserve(id);
    }

    /*
    * @var
    * @return array
    * */
    async findByColumns(columns){
        const dataCollection = database.collections.get(this.table);

        return await dataCollection.query(
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

        await database.action(async () => {
            const newItem = await dataCollection.create(item => {
                this.columns.map((column) => item[column] = columns[column])
            });

            return newItem;
        })
    }

    /*
    *Create an item
    * @var
    * @return object
    * */
    async update(id , columns){
        const dataCollection = database.collections.get(this.table).find(id);

        await database.action(async () => {
            const newItem = await dataCollection.update(item => {
                this.columns.map((column) => item[column] = columns[column])
            });

            return newItem;
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

    async queryType(column) {
        switch (column.fxn) {
            case '':
                return Q.where(column.name , column.value);
                break;
            case 'notEq':
                return Q.where(column.name , Q.notEq(column.value));
                break;
            case 'gt':
                return Q.where(column.name , Q.gt(column.value));
                break;
            case 'weakGt':
                return Q.where(column.name , Q.weakGt(column.value));
                break;
            case 'gte':
                return Q.where(column.name , Q.gte(column.value));
                break;
            case 'lt':
                return Q.where(column.name , Q.lt(column.value));
                break;
            case 'lte':
                return Q.where(column.name , Q.lte(column.value));
                break;
            case 'between':
                return Q.where(column.name , Q.between(column.min , column.max));
                break;
            case 'oneOf':
                return Q.where(column.name , Q.oneOf(column.value));
                break;
            case 'notIn':
                return Q.where(column.name , Q.notIn(column.value));
                break;
            case 'like':
                return Q.where(column.name , Q.like(`%${Q.sanitizeLikeString(column.value)}%`));
                break;
            case 'notLike':
                return Q.where(column.name , Q.notLike(`%${Q.sanitizeLikeString(column.value)}%`));
                break;
            default:
                return Q.where(column.name , Q.eq(column.value));

        }
    }
    /*
    * @todo query like the available query parameters
    * */
}