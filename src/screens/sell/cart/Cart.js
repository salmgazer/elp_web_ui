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



class Cart extends Component{

    state={
        isDrawerShow: false,
        cartId: new CartService().cartId(),
        activeStep: 0,
        productList: [],
        cartEntries: this.props.cartEntries,
    };

    async componentDidMount() {
        const { history, database , cartQuantity , cart , cartEntries} = this.props;

        this.state.cartId = await new CartService().cartId();
        console.log(await new CartService().cartId());
        console.log(await cartQuantity);
        console.log(await cart[0].cart_entries.fetch());
        this.setState({
            productList: cartEntries
        });
        console.log(cartEntries);
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <CartView setView={this.setStepContentView.bind(this)} products={this.state.productList} deleteProduct={this.deleteProduct.bind(this)} />;
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
        console.log(pId);

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('CartEntry').softDelete(pId)
                        this.setState({
                            productList: this.props.cartEntries
                        })
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

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }


}

const EnhancedCart = withDatabase(
    withObservables([], ({ database }) => ({
        cartQuantity: CartService.cartQuantity(),
        cart: database.collections.get('carts').query(Q.where('id' , localStorage.getItem('cartId'))).observe(),
        cartEntries: database.collections.get('cartEntries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observe(),
    }))(withRouter(Cart))
);

export default EnhancedCart;