import database from "../models/database";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";
import { Q } from '@nozbe/watermelondb'
import CartEntry from "../models/cartEntry/CartEntry";

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

    getCartProducts(){
        this.cartId();
        const cartId = localStorage.getItem('cartId');
        const cartCollection = database.collections.get(CartEntry.table);

        //return cartCollection.find(cartId);
    }

    getCartEntryTotal(product){
        return ((product.sellingPrice * product.quantity) - product.discount).toFixed(2);
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
}