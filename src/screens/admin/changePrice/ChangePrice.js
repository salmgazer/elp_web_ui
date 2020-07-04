import React, {Component} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import './sections/ChangePrice.scss';
import MainView from "./sections/MainView";
import AddProductView from "./sections/AddProductView";
import AddedProductView from "./sections/AddedProductView";
import {confirmAlert} from "react-confirm-alert";
import EditProductView from "./sections/EditProductView";
import CompleteView from "./sections/CompleteView";
import './changePrice.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import LocalInfo from "../../../services/LocalInfo";
import BranchService from "../../../services/BranchService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchStockService from "../../../services/BranchStockService";
import BranchProductStock from "../../../models/branchesProductsStocks/BranchProductStock";
import * as Q from "@nozbe/watermelondb/QueryDescription";


class ChangePrice extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            value: 0,
            storeProducts: 1,
            activeStep: 0,
            branchProducts: [],
            currentProduct: {},
            addedProducts: []
        };
    }

    async componentDidMount() {
        const { branchProducts } = this.props;

        await this.setState({
            branchProducts: branchProducts,
            companyBranches: LocalInfo.branches,
        });
    }

    async componentDidUpdate(prevProps) {
        const { branchProducts , branchProductStock } = this.props;

        if(prevProps.branchProductStock.length !== branchProductStock.length){
            this.setState({
                branchProducts: branchProducts,
                companyBranches: LocalInfo.branches,
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {

        switch (step) {
            case 0:
                return <MainView addProductPrice={this.addProductPrice.bind(this)} setView={this.setStepContentView.bind(this)} viewAddedProducts={this.viewAddedProducts(this)} products={this.state.productList} branchProducts={this.state.branchProducts} searchHandler={this.searchHandler.bind(this)} productAdd={this.showAddView.bind(this)} removeProduct={this.removeProduct.bind(this)} />;
            case 1:
                return <AddProductView updateProduct={this.updateNewProduct.bind(this)} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct}/>;
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

    removeProduct = (proId) => {
        confirmAlert({
            title: 'Confirm to remove',
            message: 'Are you sure you want to remove this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = this.state.productList;

                        const productIndex = old_list.findIndex((item => item.pro_id === proId));
                        const item = {...old_list[productIndex]};

                        item.status = false;

                        old_list[productIndex] = item;

                        this.setState({
                            productList: [...old_list],
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
        });
    };

    async addProductPrice(formFields){
        const oldAddedProducts = this.state.addedProducts;
        const branchPro = this.state.branchProducts;

        const productIndex = oldAddedProducts.findIndex((item => item.productId === (formFields.productId)));
        const branchProductIndex = branchPro.findIndex((item => item.productId === (formFields.productId)));

        let item = {};

        if(productIndex){
            item = {...oldAddedProducts[productIndex]};
            item.sellingPrice = formFields.sellingPrice;
        }else{
            oldAddedProducts.push(formFields);
        }

        this.setState({
            addedProducts: oldAddedProducts
        });

        //if(branchPro[branchProductIndex].sellingPrice >)
    }

    async updateNewProduct(formFields){
        try {
            const status = await new BranchStockService().addStock(formFields);
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
    * Search products handler...
    * */
    searchHandler = async (searchValue) => {
        /*
        * @todo make sure it works...
        * */
        try {
            const products = await new BranchService().searchBranchProduct(searchValue);

            this.setState({
                branchProducts: products,
            });
        }catch (e) {
            return false
        }
    };


    showAddView = async (productId , step) => {
        const old_list = this.state.branchProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.productId === productId));

        //console.log(itemIndex)
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

    addNewProduct = async(formFields) => {
        console.log(formFields)
        let old_list = this.state.productList;

        const productIndex = old_list.findIndex((item => item.pro_id === (formFields.pro_id)));
        const item = {...old_list[productIndex]};

        item.status = true;

        old_list[productIndex] = item;

        this.setState({
            productList: [...old_list],
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
            <div className={`addProducts`}>
                <SectionNavbars
                    title="Change selling price"
                    leftIcon={
                        <div
                            onClick={() => this.state.activeStep === 0 ? this.props.history.goBack() : this.setState({
                            activeStep: 0
                            })}
                        >
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchProducts' , 'branchProductStock'], ({ branchProducts , branchProductStock, database }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        branchProductStock: database.collections.get(BranchProductStock.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
    }))(withRouter(ChangePrice))
);

export default withRouter(EnhancedDirectiveViewStock);

