import database from "../models/database";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";
import { Q } from '@nozbe/watermelondb'
import CartEntry from "../models/cartEntry/CartEntry";
import BranchProductService from "./BranchProductService";
import {v4 as uuid} from 'uuid';
import Carts from "../models/carts/Carts";

export default class CartService {
    async cartId() {
        if(!await database.adapter.getLocal("cartId")){
            const dataCollection = database.collections.get('carts');

            await database.action(async () => {
                const newCart = await dataCollection.create(cart => {
                    cart.discount = 0;
                    cart.branchId = LocalInfo.branchId;
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
    *
    * Get cart individual items total
    * */
    getCartEntryTotal(product){
        return parseFloat(((product.sellingPrice * product.quantity) - product.discount)).toFixed(2);
    }

    /*
    * Get cart total amount
    * */
    static async getCartEntryAmount(){
        return ((await new CartService().getCartProducts())).reduce((a, b) => parseFloat(a) + parseFloat(new CartService().getCartEntryTotal(b) || 0), 0).toFixed(2);
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

        if(product.length > 0){
            console.log(product);
            product = product[0];

            try {
                new ModelAction('CartEntry').update(product.id , {
                    cartId: product.cartId,
                    branchId: product.branchId,
                    productId: product.productId,
                    branchProductId: product.branchProductId,
                    sellingPrice: data.sellingPrice,
                    costPrice: data.costPrice,
                    discount: data.discount + product.discount,
                    quantity: data.quantity + product.quantity,
                });

                return true;
            } catch (e) {
                return false;
            }
        }

        const columns = {
            cartId: cartId,
            branchId: data.branchId,
            productId: data.productId,
            branchProductId: data.branchProductId,
            sellingPrice: data.sellingPrice,
            costPrice: data.costPrice,
            discount: data.discount,
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
    * Suspend a cart
    * */

    async suspendCart(){
        const customerId = await database.adapter.getLocal("activeCustomer");
        const cartId = await database.adapter.getLocal("cartId");

        const dataCollection = await this.database.collections.get(Carts.table).find(cartId);

        console.log(customerId)

        try {
            await database.action(async () => {
                await dataCollection.update(cart => {
                    cart.status = 'suspend'
                })
            });

            await database.adapter.removeLocal("activeCustomer");
            await database.adapter.removeLocal("cartId");
            return true;
        }catch (e) {
            return false;
        }
    }
}