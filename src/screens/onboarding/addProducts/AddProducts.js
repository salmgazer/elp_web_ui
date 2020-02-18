import React, {Component} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {withRouter} from "react-router";
import './sections/AddProducts.scss';
import MainView from "./sections/MainView";
import AddProductView from "./sections/AddProductView";
import AddedProductView from "./sections/AddedProductView";

class AddProducts extends Component{
    state = {
        isDrawerShow: false,
        value: 0,
        storeProducts: 1,
        activeStep: 0,
        currentProduct: 0,
        productList: [
            {
                "pro_id": "119",
                "pro_name": "Bella Vinas Red Wine 5L",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1952",
                "pro_name": "Kasapreko 750ml Tonic PB - Pack of 12",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1943",
                "pro_name": "Darling Lemon 330ml - Pack of 12",
                "image": "no_image.png",
                "p_cat_id": "137",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1964",
                "pro_name": "Choice Irish Cream 50ml - Pack of 20",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "1126",
                "pro_name": "Sangria Don Simon Red Wine 1L Tetrapak",
                "image": " Sangria Don Simon Red Wine 1L Tetrapak.jpg",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
            {
                "pro_id": "2836",
                "pro_name": "Four Special 1.5L Wine",
                "image": "no_image.png",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine"
            },
        ],
    };

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainView viewAddedProducts={this.viewAddedProducts(this)} products={this.state.productList} productAdd={this.showAddView.bind(this)} spCount={this.state.storeProducts} />;
            case 1:
                return <AddProductView product={this.state.currentProduct}/>;
            case 2:
                return <AddedProductView pro_quantity={this.state.storeProducts}/>;
            default:
                return 'Complete';
        }
    };
    viewAddedProducts = () => {
        return 0;
    };

    showAddView = proId => {
        console.log(proId);
        const old_list = this.state.productList;
        console.log(old_list)

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.pro_id === proId));
        //Assign current object to new variable

        this.setState({
            currentProduct: itemIndex,
            activeStep: 1
        });
    };



    useStyles = () => makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },
    }));

    render(){
        return(
            <div>
                <SectionNavbars title="Stock">
                    <MenuIcon
                        onClick={() => this.setState({isDrawerShow: true})}
                        style={{fontSize: '2.5rem'}}
                    />
                </SectionNavbars>

                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

export default withRouter(AddProducts);