import React, {Component} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {withRouter} from "react-router";
import CartView from "./sections/ViewCart";
import {confirmAlert} from "react-confirm-alert";
import Checkout from "./sections/Checkout";
import CompleteCart from "./sections/CompleteCart";
import LocalInfo from "../../../services/LocalInfo";
import CartService from "../../../services/CartService";
import Api from "../../../services/Api";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../../services/BranchService";
import Carts from "../../../models/carts/Carts";
import { Q } from '@nozbe/watermelondb'
import ModelAction from "../../../services/ModelAction";
import Customer from "../../../models/customers/Customer";



class Cart extends Component{

    state={
        isDrawerShow: false,
        cartId: new CartService().cartId(),
        activeStep: 0,
        productList: [],
        cartTotalProduct: 0,
        cartTotalAmount: 0,
        cartEntries: this.props.cartEntries,
        customers: []
    };

    async componentDidMount() {
        const { history, database , cartQuantity , cart , cartEntries , customers} = this.props;

        this.state.cartId = await new CartService().cartId();
        //console.log(await new CartService().cartId());
        console.log(await cartQuantity);
        console.log(this.state.cartTotalProduct);
        //console.log(await cart[0].cart_entries.fetch());
        this.setState({
            productList: cartEntries,
            cartTotalProduct: await CartService.getCartProductQuantity(),
            cartTotalAmount: await CartService.getCartEntryAmount(),
            customers: customers
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , cartQuantity , cart , cartEntries , customers} = this.props;

        console.log(cartEntries);
        //this.state.cartId = await new CartService().cartId();
        //console.log(await new CartService().cartId());
        //console.log(await cartQuantity);
        //console.log(await cart[0].cart_entries.fetch());
        console.log(this.state.cartTotalProduct);
        console.log(await CartService.getCartProductQuantity());

        if(this.props.cartEntries !== prevProps.cartEntries || this.state.cartTotalProduct !== await CartService.getCartProductQuantity()){
            this.setState({
                productList: this.props.cartEntries,
                cartTotalProduct: await CartService.getCartProductQuantity(),
                cartTotalAmount: await CartService.getCartEntryAmount(),
                customers: customers
            });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <CartView customers={this.state.customers} cartTotalAmount={this.state.cartTotalAmount} cartTotalProducts={this.state.cartTotalProduct} changeQuantity={this.changeProductQuantityHandler.bind(this)} entries={this.state.cartEntries} setView={this.setStepContentView.bind(this)} products={this.state.productList} deleteProduct={this.deleteProduct.bind(this)} />;
            case 1:
                return <Checkout setView={this.setStepContentView.bind(this)} />;
            case 2:
                return <CompleteCart setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    deleteProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('CartEntry').destroy(pId);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };

    async changeProductQuantityHandler(cartEntry , event){
        try {
            let status = new CartService().updateCartEntryDetails(cartEntry , event.target.value);
            status = await status;

            if(status){
                return true;
            }
            alert('Invalid quantity');
            return false;
        }catch (e) {
            return false;
        }
    }

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }


}

const EnhancedCart = withDatabase(
    withObservables(['cartEntries'], ({ database , cartEntries }) => ({
        cartQuantity: CartService.cartQuantity(),
        cart: database.collections.get('carts').query(Q.where('id' , localStorage.getItem('cartId'))).observe(),
        customers: database.collections.get(Customer.table).query().observe(),
        cartEntries: database.collections.get('cartEntries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observe(),
    }))(withRouter(Cart))
);

export default EnhancedCart;