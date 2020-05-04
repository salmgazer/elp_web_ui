import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import MainAuditView from "./sections/mainAuditView";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../services/BranchService";
import LocalInfo from "../../services/LocalInfo";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import BranchCustomer from "../../models/branchesCustomer/BranchCustomer";
import Carts from "../../models/carts/Carts";
import AuditService from "../../services/AuditService";
import AddAuditProductView from "./sections/addAuditProductView";
import AuditedProductsView from "./sections/auditedProductsView";
import AuditEntries from "../../models/auditEntry/AuditEntries";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../services/ModelAction";

class Audit extends Component {
    state = {
        isDrawerShow: false,
        activeStep: 0,
        spCount: 0,
        branchProducts: [],
        currentProduct: 0,
        auditEntries: [],
    };

    async componentDidMount() {
        const { history, database , branchProducts , auditedEntries , auditEntriesQuantity , branchCustomers , savedCarts} = this.props;

        console.log(auditedEntries)
        await this.setState({
            branchProducts: branchProducts,
            spCount: auditedEntries.length,
            auditEntries: auditedEntries,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchProducts , auditedEntries , auditEntriesQuantity , branchCustomers , savedCarts } = this.props;
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
                return <AuditedProductsView balanceAllHandler={this.balanceAllHandler.bind(this)} productAdd={this.showAddView.bind(this)} deleteProductHandler={this.deleteProduct.bind(this)} auditEntries={this.state.auditEntries} setView={this.setStepContentView.bind(this)} />;
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

    balanceAllHandler = async () => {
        await confirmAlert({
            title: 'Confirm to balance all',
            message: 'Are you sure you want to balance all products.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await new AuditService().balanceAllProducts();
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
    withObservables(['branchProducts' , 'branchCustomers' , 'auditedEntries' , 'savedCarts'], ({ branchProducts , database , branchCustomers , auditedEntries , savedCarts }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        auditEntriesQuantity: AuditService.auditEntryQuantity(),
        cartQuantity: database.collections.get('cartEntries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observeCount(),
        audits: database.collections.get(BranchCustomer.table).query().observe(),
        auditedEntries: database.collections.get(AuditEntries.table).query(Q.where('auditId' , localStorage.getItem('auditId'))).observe(),
        branchCustomers: database.collections.get(BranchCustomer.table).query().observe(),
        savedCarts: database.collections.get(Carts.table).query(
            Q.where('status' , 'suspend'),
            Q.where('branchId' , LocalInfo.branchId)
        ).observe(),
        //cartQ: database.collections.get(CartEntry.table).query(Q.where('id', new CartService().cartId())).observe(),
        //cartQ: database.collections.get(CartEntry.table).find(new CartService().cartId()),
    }))(withRouter(Audit))
);

export default EnhancedAudit;
