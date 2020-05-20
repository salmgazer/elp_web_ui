import entities from "../config/supplierEntities";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";

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
                entityName: entityItem.name,
                contact: entityItem.contact ? row[entityItem.contact] : ""
            }
        });
    }

    /*
    * @todo
    * 1. check if there is an entity,
    * 2. if entity
    *   a. Create supplier
    * 3. else entity
    *   a. create entity
    *   b. create supplier
    * 4. If salesperson create salesperson
    *
    * */
    async addSupplier(data){
        let supplier = "";
        let salesperson = "";

        if(data.entityId === ""){
            let entity = "";

            try {
                switch(data.entityType){
                    case 'SuppliersCompany':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name,
                            contact: data.contact,
                            isTemporary: true,
                            createdBy: LocalInfo.userId
                        });
                    break;
                    case 'Customer':
                        const nameSplit = (data.name).split(' ');

                        entity = await new ModelAction(data.entityType).post({
                            firstName: nameSplit[0],
                            otherNames: nameSplit.slice(1 , nameSplit.length).join(' '),
                            phone: data.contact,
                            isTemporary: true,
                            createdBy: LocalInfo.userId
                        });

                        const branchCustomerColumns = {
                            branchId: LocalInfo.branchId,
                            createdBy: LocalInfo.userId,
                            customerId: entity.id,
                        };

                        try {
                            await new ModelAction('BranchCustomer').post(branchCustomerColumns);
                        }catch (e) {
                            console.log(e);
                            return false;
                        }
                    break;

                    case 'Brand':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name
                        });
                    break;
                    case 'Manufacturer':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name
                        });
                    break;
                }
            }catch (e){
                console.log(e);
            }

            console.log(entity);
            data.entityId = entity.id;
        }

        try {
            console.log('I am here')
            supplier = await new ModelAction('BranchSuppliers').post({
                entityId: data.entityId,
                entityType: data.entityType,
                name: data.name,
                contact: data.contact,
                branchId: LocalInfo.branchId,
                createdBy: LocalInfo.userId,
                deliveryDays: data.deliveryDays,
            });
        }catch (e){
            console.log(e);
        }

        if(supplier){
            if(data.salespersonName){
                try {
                    salesperson = await new ModelAction('BranchSupplierSalespersons').post({
                        branchSupplierId: supplier.id,
                        name: data.salespersonName,
                        contact: data.salespersonContact,
                        branchId: LocalInfo.branchId,
                        createdBy: LocalInfo.userId,
                    });
                }catch (e){
                    console.log(e);
                }
            }
        }

        localStorage.setItem("supplierId" , supplier.id);
    }

}
