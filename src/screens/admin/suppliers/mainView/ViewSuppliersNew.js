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
import MainSuppliersView from "./sections/MainSuppliersView";

class ViewSuppliersNew extends Component {
    state = {
        activeStep: 0,
    };

    async componentDidMount() {
        const { history, database} = this.props;

        /*await this.setState({

        });*/
    }

    async componentDidUpdate(prevProps) {
        const { history, database } = this.props;

        /*if(this.state.savedCart.length !== savedCarts.length || this.state.currentCustomer !== await CartService.getCartCustomerId() || this.props.cartQuantity !== prevProps.cartQuantity || branchCustomers.length !== prevProps.branchCustomers.length){
            this.setState({

            });
        }*/
    }

    //Steps to select category
    getSteps = () => {
        return ['All Suppliers View' , 'Single Supplier View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainSuppliersView setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    /*
    * @todo change color of active tab
    * */
    setStepContentView = step => {
        this.setState({
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

const EnhancedViewSuppliersNew = withDatabase(
    withObservables(['branchProducts' , 'branchCustomers' , 'savedCarts'], ({ branchProducts , database , branchCustomers , savedCarts }) => ({
        cartQuantity: database.collections.get('cartEntries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observeCount(),
    }))(withRouter(ViewSuppliersNew))
);

export default EnhancedViewSuppliersNew;
