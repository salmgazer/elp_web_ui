import React, {Component} from 'react';
import LocalInfo from "../../../../services/LocalInfo";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import {Q} from "@nozbe/watermelondb";
import database from "../../../../models/database";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";
import paths from "../../../../utilities/paths";
import SupplierService from "../../../../services/SupplierService";
import SupplierStockView from "./sections/SupplierStockView";
import AddSupplierOrderItem from "./sections/AddSupplierOrderItem";
import AddNewStockPage from "../../../stock/sections/addNewStockPage";
import BranchStockService from "../../../../services/BranchStockService";
import BranchService from "../../../../services/BranchService";

class SupplierOrderStock extends Component {
    state = {
        activeStep: 0,
        currentProduct: {},
        branchSupplierProducts: [],
        stockOrderId: '',
        stockOrderProducts: [],
    };

    async componentDidMount() {
        const { history, database , branchSupplierProducts , stockOrderId , stockOrderProducts } = this.props;

        console.log(branchSupplierProducts);
        await this.setState({
            branchSupplierProducts: branchSupplierProducts,
            stockOrderId: stockOrderId,
            stockOrderProducts: stockOrderProducts,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchSupplierProducts , stockOrderId , stockOrderProducts} = this.props;

        if(prevProps.branchSupplierProducts.length !== branchSupplierProducts.length || prevProps.stockOrderId !== stockOrderId || prevProps.stockOrderProducts.length !== stockOrderProducts.length){
            this.setState({
                branchSupplierProducts: branchSupplierProducts,
                stockOrderId: stockOrderId,
                stockOrderProducts: stockOrderProducts,
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['All Suppliers View' , 'Single Supplier View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <SupplierStockView productsAdded={(this.state.stockOrderProducts).length} stockOrderId={this.state.stockOrderId} searchProduct={this.searchProductHandler.bind(this)} addProductStockView={this.showProductStockView.bind(this)} branchSupplierProducts={this.state.branchSupplierProducts} setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <AddSupplierOrderItem productsAdded={(this.state.stockOrderProducts).length} stockOrderId={this.state.stockOrderId} product={this.state.currentProduct} updateProduct={this.updateNewProduct.bind(this)} setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    async searchProductHandler(searchValue){
        try{
            const products = await new SupplierService().searchBranchSupplierProduct(searchValue);
console.log(products)
            this.setState({
                branchSupplierProducts: products,
            });
        }catch (e) {
            return false;
        }
    }

    /*
    * @todo change color of active tab
    * */
    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async updateNewProduct(formFields){
        console.log(formFields)
        try {
            const status = await new BranchStockService().addSupplierStock(formFields);
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

    /*
    * View a products stock
    * */
    showProductStockView = (productId) => {
        const old_list = this.state.branchSupplierProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === productId));

        this.setState({
            currentProduct: itemIndex,
            activeStep: 1
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

const EnhancedSupplierOrderStock = withDatabase(
    withObservables(['branchSuppliers' , 'branchSupplierProducts' , 'stockOrderId' , 'stockOrderProducts'], ({ branchSuppliers , branchSupplierProducts, stockOrderId, stockOrderProducts, database }) => ({
        branchSuppliers: SupplierService.getBranchSuppliers(),
        branchSupplierProducts: new SupplierService().getBranchSupplierProducts(),
        stockOrderId: SupplierService.stockOrderId(),
        stockOrderProducts: SupplierService.stockOrderProducts(),
    }))(withRouter(SupplierOrderStock))
);

export default EnhancedSupplierOrderStock;
