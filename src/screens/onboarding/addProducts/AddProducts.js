import React, {Component} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {withRouter} from "react-router";
import './sections/AddProducts.scss';
import MainView from "./sections/MainView";
import AddProductView from "./sections/AddProductView";
import AddedProductView from "./sections/AddedProductView";
import {confirmAlert} from "react-confirm-alert";
import EditProductView from "./sections/EditProductView";
import CompleteView from "./sections/CompleteView";

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
        addedProducts: [
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "199",
                "pro_name": " CB Guvee Red Wine 750ml",
                "Weight_Type": "Litre",
                "product_weight": "750000000",
                "Bar_Code": "8851028002277",
                "p_cat_id": "1",
                "p_store_id": null,
                "p_manufact_id": "140",
                "image": "no_image.png",
                "Cost_Price": "12",
                "Selling_Price": "13",
                "pro_quantity": "427",
                "pro_detail_id": "106721",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "2727",
                "pro_name": " CBL Munchee Chocolate Cookies 100g",
                "Weight_Type": "Kilogram",
                "product_weight": "100000000",
                "Bar_Code": "8851028002277",
                "p_cat_id": "8",
                "p_store_id": null,
                "p_manufact_id": "140",
                "image": "no_image.png",
                "Cost_Price": "1.5",
                "Selling_Price": "20",
                "pro_quantity": "1",
                "pro_detail_id": "107715",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "200",
                "pro_name": " CBL Munchee Chocolate Sticks 20g",
                "Weight_Type": "Litre",
                "product_weight": "20000000",
                "Bar_Code": "705632441947",
                "p_cat_id": "21",
                "p_store_id": null,
                "p_manufact_id": "140",
                "image": "no_image.png",
                "Cost_Price": "1.5",
                "Selling_Price": "2",
                "pro_quantity": "1",
                "pro_detail_id": "107713",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "302",
                "pro_name": " Courvoisier Cognac 750ml GB",
                "Weight_Type": "Litre",
                "product_weight": "750000000",
                "Bar_Code": "012546011099",
                "p_cat_id": "96",
                "p_store_id": null,
                "p_manufact_id": "42",
                "image": "no_image.png",
                "Cost_Price": "3",
                "Selling_Price": "15",
                "pro_quantity": "6",
                "pro_detail_id": "107714",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "313",
                "pro_name": " Cremina Glucose",
                "Weight_Type": "Piece",
                "product_weight": "1000000000",
                "Bar_Code": "012546011099",
                "p_cat_id": "8",
                "p_store_id": null,
                "p_manufact_id": "140",
                "image": "Absolut Vodka 750ml GB.jpg",
                "Cost_Price": "0.17",
                "Selling_Price": "0.3",
                "pro_quantity": "1",
                "pro_detail_id": "106814",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "4",
                "pro_name": "10 Over 10 Cola+Orange 350ml PB",
                "Weight_Type": "Litre",
                "product_weight": "0.35",
                "Bar_Code": null,
                "p_cat_id": "93",
                "p_store_id": null,
                "p_manufact_id": "99",
                "image": "no_image.png",
                "Cost_Price": "0",
                "Selling_Price": "0",
                "pro_quantity": null,
                "pro_detail_id": "107748",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
        ]
    };

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainView setView={this.setStepContentView.bind(this)} viewAddedProducts={this.viewAddedProducts(this)} products={this.state.productList} productAdd={this.showAddView.bind(this)} spCount={this.state.addedProducts.length} />;
            case 1:
                return <AddProductView setView={this.setStepContentView.bind(this)} product={this.state.currentProduct}/>;
            case 2:
                return <AddedProductView deleteProduct={this.deleteProduct.bind(this)} products={this.state.addedProducts} setView={this.setStepContentView.bind(this)} pro_quantity={this.state.storeProducts} productEdit={this.showEditView.bind(this)}/>;
            case 3:
                return <EditProductView products={this.state.addedProducts} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} />;
            case 4:
                return <CompleteView/>;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    viewAddedProducts = () => {
        return 0;
    };

    showAddView = (proId , step) => {
        const old_list = this.state.productList;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.pro_id === proId));
        //Assign current object to new variable

        this.setState({
            currentProduct: itemIndex,
            activeStep: step
        });
    };

    showEditView = (proId , step) => {
        const old_list = this.state.addedProducts;

        //Find index of specific object using findIndex method.
        const product = old_list.filter((item => item.pro_id === proId));
        //Assign current object to new variable

        this.setState({
            currentProduct: product,
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
                        let old_list = [...this.state.addedProducts];

                        const result = old_list.filter(item => item.pro_id !== pId);

                        this.setState({
                            addedProducts: [...result],
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

    useStyles = () => makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },
    }));

    render(){
        return(
            <div>
                <SectionNavbars title="Stock" >
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