import entities from "../config/supplierEntities";
import ModelAction from "./ModelAction";

export default class SupplierService {
    static async supplierAggregator(){
        let dataset = [];
        const entityTypes = entities.entities;

        for(let i = 0; i < entityTypes.length; i++){
            const results = await new ModelAction(entityTypes[i].entity).indexNotObserve();

            const formattedResults = results.map((row) => {
                return (entityTypes[i].fields).map((field) => {
                    return {
                        field: row[field],
                    }
                })
            });

            dataset = dataset.concat(formattedResults);
        }

        return dataset;
    }

    static async getSuppliers(entity){
        //console.log(entity)
        const results = await new ModelAction(entity).indexNotObserve();
        const entityItem = ((entities.entities).filter((item) => item.entity === entity))[0];
        //console.log(entityItem)
        return Array.from(results , (row) => {
            let name = "";

            name = (entityItem.nameFields).map(field =>
                `${name} ${row[field]}`
            );

            return {
                id: row.id,
                name: (name.join('')).trim(),
                entity: entityItem.entity,
                contact: entityItem.contact ? row[entityItem.contact] : ""
            }
        });
    }
}
