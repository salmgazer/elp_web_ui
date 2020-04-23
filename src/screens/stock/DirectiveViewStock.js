import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import StockMainPage from "./sections/stockMainPage";
import './stock.scss';
import Api from "../../services/Api";
import LocalInfo from '../../services/LocalInfo';
import StockProductSingle from "./sections/stockProductSingle";
import StockSummaryPage from "./sections/itemsLeft/stockSummaryPage";
import ItemsOutOfStock from "./sections/outOfStock/itemsOutOfStock";
import ItemsLowStock from "./sections/lowStock/itemsLowStock";
import AddNewStockPage from "./sections/addNewStockPage";
import MoveStock from "./sections/moveStock/moveStock";
import ProductServiceHandler from '../../services/ProductServiceHandler';
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { v1 as uuidv1 } from 'uuid';
import BranchService from "../../services/BranchService";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import CartService from "../../services/CartService";
import BranchStockService from "../../services/BranchStockService";
import SaleService from "../../services/SaleService";
import BranchProductStock from "../../models/branchesProductsStocks/BranchProductStock";

class DirectiveViewStock extends Component{
    state = {
        activeStep: 0,
        stockList: [],
        branchProducts: [],
        companyBranches: [],
        currentProduct: {},
        storeDetails: {
            itemsInStore: '2000',
            totalCostPrice: '50,000',
            totalSellingPrice: '60,000',
            totalExpectedProfit: '10,000',
        },
    };

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {

        const { branchProducts } = this.props;
        console.log(branchProducts);

        await this.setState({
            branchProducts: branchProducts,
            companyBranches: LocalInfo.branches,
        });
    }

    async componentDidUpdate(prevProps) {
        const { branchProducts , branchProductStock } = this.props;
        console.log(branchProducts);
        if(prevProps.branchProductStock.length !== branchProductStock.length){
            this.setState({
                branchProducts: branchProducts,
                companyBranches: LocalInfo.branches,
            });
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
                return <StockMainPage branchProducts={this.state.branchProducts} stock={this.state.stockList} setView={this.setStepContentView.bind(this)} addProductStockView={this.showProductStockView.bind(this)}/> ;
            case 1:
                return <StockProductSingle product={this.state.currentProduct} setView={this.setStepContentView.bind(this)}/>;
            case 2:
                return <StockSummaryPage storeDetails={this.state.storeDetails} setView={this.setStepContentView.bind(this)}/>;
            case 3:
                return <ItemsOutOfStock addNewProductStockView={this.addNewProductStockView.bind(this)} stock={this.state.stockList} storeDetails={this.state.storeDetails} setView={this.setStepContentView.bind(this)}/>;
            case 4:
                return <ItemsLowStock addNewProductStockView={this.addNewProductStockView.bind(this)} stock={this.state.stockList} storeDetails={this.state.storeDetails} setView={this.setStepContentView.bind(this)}/>;
            case 5:
                return <AddNewStockPage product={this.state.currentProduct} updateProduct={this.updateNewProduct.bind(this)} setView={this.setStepContentView.bind(this)}/>;
            case 6:
                return <MoveStock product={this.state.currentProduct} setView={this.setStepContentView.bind(this)} moveStock={this.moveStock.bind(this)} />;
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
        const old_list = this.state.branchProducts;

        const newStep = this.state.companyBranches.length > 1 ? 1 : 5;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === productId));
        //console.log(itemIndex)

        this.setState({
            currentProduct: itemIndex,
            activeStep: newStep
        });
    };

    /*
    * Add new stock
    * */

    addNewProductStockView = (productId) => {
        console.log(`${productId} from addStock`);
        const old_list = this.state.stockList;

        //Find index of specific object using findIndex method.
        const product = old_list.filter((product => product.id === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: product[0],
            activeStep: 5
        });
    };

    async updateNewProduct(formFields){
        console.log(formFields)
        try {
            const status = await new BranchStockService().addStock(formFields);
            console.log(status)
            if(status){
                return true;
            }
            alert('Something went wrong');
            return false;
        }catch (e) {
            return false;
        }
    }

    async moveStock(formFields){
        try {
            const status = await new BranchStockService().moveStock(formFields);
            console.log(status)
            if(status){
                return true;
            }

            alert('Something went wrong');
            return false;
        }catch (e) {
            return false;
        }
    }

    render(){
        return (
            <div>{this.getStepContent(this.state.activeStep)}</div>
        )
    }
}

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchProducts' , 'branchProductStock'], ({ branchProducts , branchProductStock, database }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        branchProductStock: database.collections.get(BranchProductStock.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
    }))(withRouter(DirectiveViewStock))
);

export default withRouter(EnhancedDirectiveViewStock);

