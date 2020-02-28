import React, {Component} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {withRouter} from "react-router";
import CartView from "./sections/ViewCart";
import {confirmAlert} from "react-confirm-alert";
import Checkout from "./sections/Checkout";
import CompleteCart from "./sections/CompleteCart";


class Cart extends Component{

    state={
        isDrawerShow: false,
        activeStep: 0,
        productList: [
            {
                "pro_id": "1234",
                "pro_name": "Bella Vinas Red Wine 5L",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1233",
                "pro_name": "Kasapreko 750ml Tonic PB",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1232",
                "pro_name": "Pepsi Cola 300ml",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1231",
                "pro_name": "Kasapreko 750ml Tonic PB",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            }
        ]
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

    deleteProduct = (pId , event) => {
        console.log(pId);

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = [...this.state.productList];

                        const result = old_list.filter(item => item.pro_id !== pId);

                        this.setState({
                            productList: [...result],
                        });
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

export default withRouter(Cart);