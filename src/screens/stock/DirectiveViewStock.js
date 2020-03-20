import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import StockMainPage from "./sections/stockMainPage";
import './stock.scss';
import Api from "../../services/Api";
import LocalInfo from '../../services/LocalInfo';
import StockProductSingle from "./sections/stockProductSingle";

class DirectiveViewStock extends Component{
    state = {
        activeStep: 0,
        stockList: [],
        currentProduct: {},
        locations: [
            {
                name: 'Adenta',
                status: true,
                quantity: 500
            },
            {
                name: 'Lapaz',
                status: false,
                quantity: 500
            },
            {
                name: 'Warehouse',
                status: false,
                quantity: 1000
            }
        ]
    };

    /*
    * Fetch all products when component is mounted
    * */
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
                'stockList' : products.data.products,
            });

            console.log(products);
        }catch (error) {
            console.log(error)
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['Add Categories' , 'View Added Categories'];
    };

    /*
    * Get content of a particular view
    * */
    getStepContent = step => {
        switch (step) {
            case 0:
                return <StockMainPage stock={this.state.stockList} setView={this.setStepContentView.bind(this)} addProductStockView={this.showProductStockView.bind(this)}/> ;
            case 1:
                return <StockProductSingle locations={this.state.locations} product={this.state.currentProduct} setView={this.setStepContentView.bind(this)}/>;
            default:
                return 'Complete';
        }
    };

    /*
    * Go to next view
    * */
    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    /*
    * return to previous view
    * */
    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    /*
    * Set a particular view
    * */
    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*
    * View a products stock
    * */
    showProductStockView = (productId) => {
        console.log(`${productId} from addProduct`);
        const old_list = this.state.stockList;

        //Find index of specific object using findIndex method.
        const product = old_list.filter((product => product.id === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: product[0],
            activeStep: 1
        });
    };


    render(){
        return (
            <div>{this.getStepContent(this.state.activeStep)}</div>
        )
    }
}

export default withRouter(DirectiveViewStock);