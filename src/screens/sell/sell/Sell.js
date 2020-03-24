import React, {Component} from 'react';
import SellView from "./sections/SellView";
import AddProductCart from "./sections/AddProductCart";
import Api from "../../../services/Api";
import LocalInfo from "../../../services/LocalInfo";

export default class Sell extends Component {
    state = {
        isDrawerShow: false,
        salesMade: 175,
        profitMade: 50,
        activeStep: 0,
        spCount: 3,
        productList: []
    };

    async componentDidMount() {
        const branchId = LocalInfo.branchId;
        const accessToken = LocalInfo.accessToken;

        try {
            let products = await new Api('others').index(
                {},
                {'Authorization': `Bearer ${accessToken}`},
                `https://elp-core-api-dev.herokuapp.com/v1/client/branches/${branchId}/products`,
            );

            localStorage.setItem('storeProductsLookup' , JSON.stringify(products.data.products));

            this.setState({
                'productList' : products.data.products,
            });

            console.log(products);
        }catch (error) {
            console.log(error)
        }
    }

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
    showAddView = async (productId , step) => {
        const old_list = this.state.productList;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: itemIndex,
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