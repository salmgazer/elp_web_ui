import React, { Component } from 'react';
import MainAuditView from "./sections/mainAuditView";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import {Q} from "@nozbe/watermelondb";
import BranchService from "../../services/BranchService";
import LocalInfo from "../../services/LocalInfo";
import AuditService from "../../services/AuditService";
import AddAuditProductView from "./sections/addAuditProductView";
import AuditedProductsView from "./sections/auditedProductsView";
import AuditEntries from "../../models/auditEntry/AuditEntries";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../services/ModelAction";
import Audits from "../../models/audit/Audit";
import AuditHistory from './sections/AuditHistory';
import AuditHistoryDetails from './sections/AuditHistoryDetails';
import GetStartedAudit from "./getStarted/getStartedAudit";
import CartService from "../../services/CartService";

class Audit extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            activeStep: 5,
            spCount: 0,
            branchProducts: [],
            currentProduct: 0,
            currentAudit: 0,
            auditEntries: [],
        }
    }

    async componentDidMount() {
        const { history, database , branchProducts , auditedEntries , auditEntriesQuantity} = this.props;

        console.log(auditedEntries)
        await this.setState({
            branchProducts: branchProducts,
            spCount: auditedEntries.length,
            auditEntries: auditedEntries,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchProducts , auditedEntries , auditEntriesQuantity} = this.props;
        console.log(auditedEntries)

        if(auditEntriesQuantity !== prevProps.auditEntriesQuantity || auditedEntries.length !== prevProps.auditedEntries.length){
            this.setState({
                spCount: auditedEntries.length,
                auditEntries: auditedEntries,
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
                return <MainAuditView productAdd={this.showAddView.bind(this)} searchHandler={this.searchHandler.bind(this)} spCount={this.state.spCount} setView={this.setStepContentView.bind(this)} branchProducts={this.state.branchProducts}/>;
            case 1:
                return <AddAuditProductView addToAudit={this.addProductToCartHandler.bind(this)} product={this.state.currentProduct} setView={this.setStepContentView.bind(this)} branchProducts={this.state.branchProducts}/>;
            case 2:
                return <AuditedProductsView changeAuditedProductsType={this.changeAuditedProductsType.bind(this)} searchAuditedHandler={this.searchAuditedHandler.bind(this)} balanceAllHandler={this.balanceAllHandler.bind(this)} productAdd={this.showAddView.bind(this)} deleteProductHandler={this.deleteProduct.bind(this)} auditEntries={this.state.auditEntries} setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <AuditHistory setView={this.setStepContentView.bind(this)} auditEntries={this.state.auditEntries} auditProducts={this.showAuditProductsView.bind(this)} deleteProductHandler={this.deleteAuditProduct.bind(this)} />
            case 4:
                return <AuditHistoryDetails setView={this.setStepContentView.bind(this)} changeAuditedProductsType={this.changeSingleProductsType.bind(this)} currentAudit={this.state.currentAudit} deleteProductHandler={this.deleteAuditProduct.bind(this)} searchAuditedHandler={this.searchAuditedHandler.bind(this)} />
            case 5:
                return <GetStartedAudit setView={this.setStepContentView.bind(this)} />
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*
    * Set changeAuditedProductsType
    * */
    changeAuditedProductsType = async (value) => {
        console.log(value)
        try {
            const products = await new AuditService().changeAuditedProductsType(value);

            this.setState({
                auditEntries: products,
            });
        }catch (e) {
            return false
        }
    };

    /*
    * Set changeAuditedProductsType
    * */
    changeSingleProductsType = async (value) => {
        console.log(value)
        try {
            const products = await new AuditService().changeAuditedProductsType(value);

            this.setState({
                currentAudit: products
            });
        }catch (e) {
            return false
        }
    };

    /*
    * Search products handler...
    * */
    searchHandler = async (searchValue) => {
        try {
            const products = await new BranchService().searchBranchProduct(searchValue);

            this.setState({
                branchProducts: products,
            });
        }catch (e) {
            return false
        }
    };

    /*
    * Search products handler...
    * */
    searchAuditedHandler = async (searchValue) => {

        try {
            const products = await new AuditService().searchBranchAuditedProduct(searchValue);

            this.setState({
                auditEntries: products,
            });
        }catch (e) {
            return false
        }
    };

    //Search product barcode
    searchBarcode = async (barcode) => {
        const products = await new BranchService().searchBarcodeProduct(barcode);

        await this.setState({
            currentProduct: products[0],
        });

        return products[0];
    };

    /*Add product to cart*/
    showAddView = async (productId) => {
        const old_list = this.state.branchProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.productId === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: itemIndex,
            activeStep: 1
        });
    };

    /*
    * View a products stock
    * */
    showAuditProductsView = (auditId, step) => {
        const old_list = this.state.auditEntries;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === auditId));

        this.setState({
            currentAudit: itemIndex,
            activeStep: step
        });
    };

    deleteProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('AuditEntries').destroy(pId);
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

    deleteAuditProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('AuditEntries').destroy(pId);
                        this.setState({
                            activeStep: 3
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

    balanceAllHandler = async () => {
        if(await new AuditService().balanceAllProducts()){
            this.setState({
                spCount: 0,
            });
            return true;
        }
        return false;
    };

    /*
    *Add product to cart
    * */
    addProductToCartHandler = (formFields) => {
        return new AuditService().addProductToAudit(formFields);
    };

    render() {
        return (
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedAudit = withDatabase(
    withObservables(['branchProducts' , 'auditedEntries'], ({ database , branchProducts, auditedEntries }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        audits: database.collections.get(Audits.table).query().observe(),
        auditedEntries: database.collections.get(AuditEntries.table).query(Q.where('auditId' , localStorage.getItem('auditId'))).observe(),
        auditEntriesQuantity: AuditService.auditEntryQuantity(),
    }))(withRouter(Audit))
);


export default EnhancedAudit;
