import React, {Component} from 'react';
import {withRouter} from "react-router";
import CartView from "./sections/ViewCart";
import {confirmAlert} from "react-confirm-alert";
import Checkout from "./sections/Checkout";
import CompleteCart from "./sections/CompleteCart";
import CartService from "../../../services/CartService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { Q } from '@nozbe/watermelondb'
import ModelAction from "../../../services/ModelAction";
import BranchCustomer from "../../../models/branchesCustomer/BranchCustomer";



class Cart extends Component{

    state={
        isDrawerShow: false,
        cartId: new CartService().cartId(),
        activeStep: 0,
        productList: [],
        cartTotalProduct: 0,
        cartTotalAmount: 0,
        cartEntries: this.props.cartEntries,
        customers: [],
        currentCustomer: 0,
    };

    async componentDidMount() {
        const { history, database , cartQuantity , cart , cartEntries , branchCustomers} = this.props;
        //new ModelAction('Customer').destroy('b08d6c51-f93a-4a9e-b03f-2fa07f026919');
        //new ModelAction('BranchCustomer').destroy('62124785-3095-4707-82b1-76ea4bc10fec');
        this.state.cartId = await new CartService().cartId();
        //console.log(await new CartService().cartId());
        //console.log(await cartQuantity);
        //console.log(customers);
        //console.log(this.state.cartTotalProduct);
        //console.log(await cart[0].cart_entries.fetch());
        await this.setState({
            productList: cartEntries,
            cartTotalProduct: await CartService.getCartProductQuantity(),
            cartTotalAmount: await CartService.getCartEntryAmount(),
            customers: branchCustomers
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , cartQuantity , cart , cartEntries , branchCustomers} = this.props;

        //console.log(cartEntries);
        //console.log(customers);
        //this.state.cartId = await new CartService().cartId();
        //console.log(await new CartService().cartId());
        //console.log(await cartQuantity);
        //console.log(await cart[0].cart_entries.fetch());
        //console.log(this.state.cartTotalProduct);
        //console.log(await CartService.getCartProductQuantity());

        if(this.props.cartEntries !== prevProps.cartEntries || branchCustomers.length !== prevProps.branchCustomers.length || this.state.cartTotalProduct !== await CartService.getCartProductQuantity()){
            await this.setState({
                productList: this.props.cartEntries,
                cartTotalProduct: await CartService.getCartProductQuantity(),
                cartTotalAmount: await CartService.getCartEntryAmount(),
                customers: branchCustomers
            });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <CartView setCustomerHandler={this.setCustomerHandler.bind(this)} currentCustomer={this.state.currentCustomer} customers={this.state.customers} cartTotalAmount={this.state.cartTotalAmount} cartTotalProducts={this.state.cartTotalProduct} changeQuantity={this.changeProductQuantityHandler.bind(this)} entries={this.state.cartEntries} setView={this.setStepContentView.bind(this)} products={this.state.productList} deleteProduct={this.deleteProduct.bind(this)} />;
            case 1:
                return <Checkout setCustomerHandler={this.setCustomerHandler.bind(this)} currentCustomer={this.state.currentCustomer} customers={this.state.customers} cartTotalAmount={this.state.cartTotalAmount} setView={this.setStepContentView.bind(this)} />;
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

    setCustomerHandler(customer){
        this.setState({
            customers: this.props.branchCustomers,
            currentCustomer: customer
        })
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
    withObservables(['cartEntries' , 'branchCustomers'], ({ database , cartEntries, branchCustomers }) => ({
        cartQuantity: CartService.cartQuantity(),
        cart: database.collections.get('carts').query(Q.where('id' , localStorage.getItem('cartId'))).observe(),
        branchCustomers: database.collections.get(BranchCustomer.table).query().observe(),
        cartEntries: database.collections.get('cartEntries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observe(),
    }))(withRouter(Cart))
);

export default EnhancedCart;