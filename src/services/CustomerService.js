import ModelAction from "./ModelAction";

export default class CustomerService {
    getCustomers(){
        return new ModelAction('Customer').index();
    }
}