import React, {Component} from 'react';
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import SystemDate from "../../Components/Date/SystemDate";
import Grid from "@material-ui/core/Grid";
import CardGridComponent from "../../dashboard/Sections/CardGridComponent";
import SellView from "./sections/SellView";
import AddProductCart from "./sections/AddProductCart";

export default class Sell extends Component {
    state = {
        isDrawerShow: false,
        salesMade: 175,
        profitMade: 50,
        activeStep: 0,
        spCount: 3,
        productList: [
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
                return <SellView productAdd={this.showAddView.bind(this)} products={this.state.productList} spCount={this.state.spCount} salesMade={this.state.salesMade} profitMade={this.state.profitMade}/>;
            case 1:
                return <AddProductCart setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} spCount={this.state.spCount} salesMade={this.state.salesMade} profitMade={this.state.profitMade}/>;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*Add product to cart*/
    showAddView = async (proId , step) => {
        console.log(`${proId} from addProduct`);
        const old_list = this.state.productList;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.pro_id === proId));
        //Assign current object to new variable

        //console.log(product);
        await this.setState({
            currentProduct: itemIndex[0],
            activeStep: step
        });
    };

    render(){
        return (
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}