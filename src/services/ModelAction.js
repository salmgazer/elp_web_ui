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
            columns.map(column => Q.where(column.name , column.value))
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

    /*
    * @todo query like the available query parameters
    * */
}