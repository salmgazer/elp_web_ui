import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import BranchProductService from "./BranchProductService";
import isToday from 'date-fns/isToday'
import isWeek from "date-fns/isThisWeek";
import isThisMonth from "date-fns/isThisMonth";
import isYear from "date-fns/isThisYear";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";
import database from "../models/database";
import * as Q from "@nozbe/watermelondb/QueryDescription";

export default class BranchService {
    constructor (branchId = LocalInfo.branchId) {
        this.branch = (LocalInfo.branches).find(branch => branch.branchId === branchId);
        this.branchId = branchId;
    }

    getProducts() {
        return new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });
    }

    /*
    * Get a branches customers
    * */
    getCustomers() {
        return new ModelAction('BranchCustomer').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });
    }

    /*
    * Search for a branch product
    * */
    async searchBranchProduct(searchValue) {
        const products = await new ModelAction('Product').findByColumnNotObserve({
            name: 'name',
            value: searchValue,
            fxn: 'like'
        });

        return  database.collections.get('branches_products').query(Q.where('productId',
          Q.oneOf(products.map(p => p.id))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }

    /*
    * @var product with barcode
    * @return object
    * @todo barcode search...
    * */
    async searchBarcodeProduct(barcode){
        console.log(barcode)
        const branchProducts = await this.getProducts() || [];
        console.log(branchProducts);
        //(await new BranchProductService(product).product()).barCode
        //const products = branchProducts.filter((product) => (product.id === barcode));
        const products = branchProducts.map(async (product) => {
            return await BranchService.filterProduct('barCode' , barcode , product)
        });

        console.log(products)
        //return products;
    }

    /*
    * Filter item
    * */
    static async filterProduct(column , value , item){
        const product = await new BranchProductService(item).product();
        console.log(product)
        return product[column] === value;
    }

    /*
    * Get Today sales using user role
    * @return all today sales
    * */
    async getTodaySales() {
        const userRole = LocalInfo.userRole;
        let todaySales = [];

        if(userRole === 'owner'){
            const sales = await new ModelAction('Sales').findByColumnNotObserve(
                {
                    name: 'branchId',
                    value: LocalInfo.branchId,
                    fxn: 'eq',
                }
            );

            todaySales = sales.filter(sale => isToday(sale.createdAt))
        }

        /*
        * @todo handle other user roles
        * */

        return todaySales;
    }

    
}
