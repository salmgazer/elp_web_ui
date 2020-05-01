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
import SaleService from "../../services/SaleService";
import CartService from "../../services/CartService";

class Audit extends Component {
    state = {
        isDrawerShow: false,
        salesMade: 175,
        profitMade: 50,
        activeStep: 0,
        spCount: 0,
        productList: [],
        savedCart: [],
        branchProducts: [],
        customers: [],
        currentCustomer: 0,
        salesTodayDetails: {},
    };

    async componentDidMount() {
        const { history, database , branchProducts , cartQuantity , branchCustomers , savedCarts} = this.props;

        const salesTodayDetails = await new SaleService().getTodaySalesDetails();

        await this.setState({
            branchProducts: branchProducts,
            spCount: cartQuantity,
            customers: branchCustomers,
            currentCustomer: await CartService.getCartCustomerId(),
            savedCart: savedCarts,
            salesTodayDetails: salesTodayDetails,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchProducts , cartQuantity , branchCustomers , savedCarts } = this.props;

        const salesTodayDetails = await new SaleService().getTodaySalesDetails();

        if(this.state.savedCart.length !== savedCarts.length || this.state.currentCustomer !== await CartService.getCartCustomerId() || this.props.cartQuantity !== prevProps.cartQuantity || branchCustomers.length !== prevProps.branchCustomers.length){
            this.setState({
                spCount: cartQuantity,
                customers: branchCustomers,
                currentCustomer: await CartService.getCartCustomerId(),
                savedCart: savedCarts,
                salesTodayDetails: salesTodayDetails,
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
                return <MainAuditView setView={this.setStepContentView.bind(this)} branchProducts={this.state.branchProducts}/>;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
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
    withObservables(['branchProducts' , 'branchCustomers' , 'savedCarts'], ({ branchProducts , database , branchCustomers , savedCarts }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        cartQuantity: database.collections.get('cartEntries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observeCount(),
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
