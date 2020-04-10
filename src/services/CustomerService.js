import ModelAction from "./ModelAction";
import database from "../models/database";
import Customer from "../models/customers/Customer";
import LocalInfo from "./LocalInfo";

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

    async getLastCustomer(){
        const customers = await database.collections.get(Customer.table).query().fetch();
        console.log(customers);
        return customers[customers.length - 1];
    }

    async getCustomerName(branchCustomer){
        const newCustomer = await branchCustomer.customer.fetch();

        return `${newCustomer.firstName} ${newCustomer.otherNames}`;
    }
}