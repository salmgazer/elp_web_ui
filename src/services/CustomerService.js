import ModelAction from "./ModelAction";
import database from "../models/database";
import Customer from "../models/customers/Customer";
import LocalInfo from "./LocalInfo";
import * as Q from "@nozbe/watermelondb/QueryDescription";

export default class CustomerService {
    getCustomers(){
        return new ModelAction('Customer').index();
    }

    async addCustomer(customerData){

        try {
            await new ModelAction('Customer').post(customerData);
        }catch (e) {
            console.log(e);
            return false;
        }

        const lastCustomer = await this.getLastCustomer();
        const branchCustomerColumns = {
            branchId: LocalInfo.branchId,
            createdBy: LocalInfo.userId,
            customerId: lastCustomer.id,
        };

        try {
            await new ModelAction('BranchCustomer').post(branchCustomerColumns);
        }catch (e) {
            console.log(e);
            return false;
        }
    }


    async updateCustomer(customerId, customerData){

        try {
            await new ModelAction('Customer').update(customerId, customerData);
        }catch (e) {
            console.log(e);
            return false;
        }

        // const lastCustomer = await this.getLastCustomer();
        const branchCustomerColumns = {
            branchId: LocalInfo.branchId,
            createdBy: LocalInfo.userId,
            customerId: customerId,
        };

        try {
            await new ModelAction('BranchCustomer').update(customerId, branchCustomerColumns);
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /*
    * Search for a branch customer
    * */
    async searchBranchCustomer(searchValue) {
        const customers = await new ModelAction('Customer').findByColumnNotObserve({
            name: 'firstName' || 'otherNames',
            value: searchValue,
            fxn: 'like'
        });

        return  database.collections.get('branches_customers').query(Q.where('customerId',
        Q.oneOf(customers.map(c => c.id))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }

    async getLastCustomer(){
        const customers = await database.collections.get(Customer.table).query().fetch();
        console.log(customers);
        return customers[customers.length - 1];
    }

    async getCustomerName(branchCustomer){
        const newCustomer = await branchCustomer.customer.fetch();

        return `${newCustomer.firstName} ${newCustomer.otherNames}`;
    }

    async getCustomerExist(phone){
        try {
            const customer = await new ModelAction('Customer').findByColumnNotObserve({
                name: 'phone',
                value: phone,
                fxn: 'eq'
            });
            if(customer.length > 0){
                return false;
            }else{
                return true;
            }
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}
