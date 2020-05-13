import database from "../models/database";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";
import { Q } from '@nozbe/watermelondb'
import CartEntry from "../models/cartEntry/CartEntry";
import BranchProductService from "./BranchProductService";
import {v4 as uuid} from 'uuid';
import Carts from "../models/carts/Carts";
import BranchService from "./BranchService";
import CustomerService from "./CustomerService";

export default class CartService {
    async cartId() {
        if(!await database.adapter.getLocal("cartId")){
            const dataCollection = database.collections.get(Carts.table);
            const workingDate = await database.adapter.getLocal("workingDate");

            await database.action(async () => {
                const newCart = await dataCollection.create(cart => {
                    cart.discount = 0;
                    cart.branchId = LocalInfo.branchId;
                    cart.cartDate = LocalInfo.workingDate;
                    cart.status = 'active';
                    cart.createdBy = LocalInfo.userId;
                    cart._raw.id = uuid()
                });

                await database.adapter.setLocal("cartId" , await newCart.id);
            });
        }

        const cartId = await database.adapter.getLocal("cartId");
        localStorage.setItem('cartId' , cartId);

        return cartId;
    }

    static async cartQuantity() {
        const cartId = await new CartService().cartId();
        let quantity = new ModelAction('CartEntry').findById(cartId);

        return await quantity;
    }

    async getCartProducts(){
        const cartId = await new CartService().cartId();

        try {
            let cartCollection = new ModelAction('CartEntry').findByColumnNotObserve({
                name: 'cartId',
                value: cartId,
                fxn: 'eq'
            });
            cartCollection = await cartCollection;

            return cartCollection;
        }catch (e) {
            return e;
        }
    }

    /*
    * Get Cart products by Id
    */
    async getCartProductsById(cartId){
        try {
            let cartCollection = new ModelAction('CartEntry').findByColumnNotObserve({
                name: 'cartId',
                value: cartId,
                fxn: 'eq'
            });
            cartCollection = await cartCollection;

            return cartCollection;
        }catch (e) {
            return e;
        }
    }

    /*
    *
    * Get cart individual items total
    * */
    getCartEntryTotal(product){
        return parseFloat(((product.sellingPrice * product.quantity) - (product.discount * product.quantity))).toFixed(2);
    }

    /*
    * Get cart total amount
    * */
    static async getCartEntryAmount(){
        return ((await new CartService().getCartProducts())).reduce((a, b) => parseFloat(a) + parseFloat(new CartService().getCartEntryTotal(b) || 0), 0).toFixed(2);
    }

    /*
    * Get cart total amount by Id
    * */
    static async getCartEntryAmountById(cartId){
        return ((await new CartService().getCartProductsById(cartId))).reduce((a, b) => parseFloat(a) + parseFloat(new CartService().getCartEntryTotal(b) || 0), 0).toFixed(2);
    }

    /*
    * @var cartEntry
    * @var new quantity
    * @return new cartEntry
    * */
    async updateCartEntryDetails(cartEntry , quantity){
        //1. Check if quantity of product is valid
        //2. Update quantity of entry
        const branchProduct = await cartEntry.branchProduct.fetch();
        let branchProductQuantity = new BranchProductService(branchProduct).getProductQuantity();
        branchProductQuantity = await branchProductQuantity;
        if(branchProductQuantity >= quantity){
            console.log(quantity);
            try {
                new ModelAction('CartEntry').update(cartEntry.id , {
                    cartId: cartEntry.cartId,
                    branchId: cartEntry.branchId,
                    productId: cartEntry.productId,
                    branchProductId: cartEntry.branchProductId,
                    sellingPrice: cartEntry.sellingPrice,
                    entryDate: cartEntry.entryDate,
                    costPrice: cartEntry.costPrice,
                    discount: cartEntry.discount,
                    quantity: parseFloat(quantity),
                });

                return true;
            } catch (e) {
                return false;
            }
        }else{
            return false
        }
    }

    static async getCartProductQuantity(){
        return ((await new CartService().getCartProducts())).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    async addProductToCart(data) {
        const cartId = await this.cartId();

        const dataCollection = database.collections.get('cartEntries');

        let product = await dataCollection.query(
            Q.where('cartId' , cartId),
            Q.where('productId' , data.productId)
        ).fetch();
        console.log(LocalInfo.workingDate);

        if(product.length > 0){
            console.log(product);
            product = product[0];

            try {
                new ModelAction('CartEntry').update(product.id , {
                    cartId: product.cartId,
                    branchId: LocalInfo.branchId,
                    productId: product.productId,
                    branchProductId: product.branchProductId,
                    sellingPrice: data.sellingPrice,
                    entryDate: LocalInfo.workingDate,
                    costPrice: data.costPrice,
                    discount: parseFloat(data.discount),
                    quantity: data.quantity + product.quantity,
                });

                return true;
            } catch (e) {
                return false;
            }
        }

        const columns = {
            cartId: cartId,
            branchId: LocalInfo.branchId,
            productId: data.productId,
            branchProductId: data.branchProductId,
            sellingPrice: data.sellingPrice,
            costPrice: data.costPrice,
            discount: parseFloat(data.discount),
            quantity: data.quantity,
        };

        try {
            new ModelAction('CartEntry').post(columns);

            return true;
        } catch (e) {
            return false;
        }
    }

    /*
    * Set cart customer
    * */
    async setCustomer(customer){
        await database.adapter.setLocal("activeCustomer" , customer);
        const cartId = await database.adapter.getLocal("cartId");

        const dataCollection = await database.collections.get(Carts.table).find(cartId);

        try {
            await database.action(async () => {
                await dataCollection.update(cart => {
                    cart.customerId = customer;
                })
            });

            return true;
        }catch (e) {
            return false;
        }
    }

    /*
    * Get cart customer
    * */
    async getCartCustomer(){
        const currentCustomer = await database.adapter.getLocal("activeCustomer");

        if(typeof currentCustomer === 'undefined' || currentCustomer === null || currentCustomer == 0){
            return 'Assign Customer';
        }
        const customers = await new BranchService().getCustomers();

        const searchCustomer = customers.filter((customer) => customer.customerId === currentCustomer)[0];

        return new CustomerService().getCustomerName(searchCustomer);
    }

    /*
    * Get cart customerId
    * */
    static async getCartCustomerId(){
        const currentCustomer = await database.adapter.getLocal("activeCustomer");

        if(typeof currentCustomer === 'undefined' || currentCustomer === null || currentCustomer == 0){
            return 0;
        }

        const customers = await new BranchService().getCustomers();
        const searchCustomer = customers.filter((customer) => customer.customerId === currentCustomer)[0];

        return searchCustomer.customerId;
    }

    static async getLastCartEntry(){
        const cartEntries = await new ModelAction('CartEntry').findByColumnNotObserve({
            name: 'branchId',
            value: LocalInfo.branchId,
            fxn: 'eq',
        });

        return cartEntries[cartEntries.length - 1];
    }

    /*
    * Suspend a cart
    * */
    async suspendCart(){
        const customerId = await database.adapter.getLocal("activeCustomer");
        const cartId = await database.adapter.getLocal("cartId");

        if(customerId == 0){
            return false;
        }
        const dataCollection = await database.collections.get(Carts.table).find(cartId);

        try {
            await database.action(async () => {
                await dataCollection.update(cart => {
                    cart.status = 'suspend';
                    cart.customerId = customerId;
                })
            });

            await database.adapter.removeLocal("activeCustomer");
            await database.adapter.removeLocal("cartId");
            localStorage.removeItem("cartId");
            return true;
        }catch (e) {
            return false;
        }
    }

    /*
    * Make a cart active
    * */
    static async activateCart(cartId){
        /*
        * @todo suspend current cart
        * */
        /*
            const cartId = await database.adapter.getLocal("cartId");
            if(cartId === 0 || typeof cartId === 'undefined' || cartId === null){}
        */

        const dataCollection = await database.collections.get(Carts.table).find(cartId);

        try {
            await database.action(async () => {
                await dataCollection.update(cart => {
                    cart.status = 'active';
                })
            });

            await database.adapter.setLocal("activeCustomer" , dataCollection.customerId);
            await database.adapter.setLocal("cartId" , dataCollection.id);
            localStorage.setItem("cartId" , dataCollection.id);
            return true;
        }catch (e) {
            return false;
        }
    }
}
