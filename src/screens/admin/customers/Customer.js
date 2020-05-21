import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import {confirmAlert} from "react-confirm-alert";
import withObservables from "@nozbe/with-observables";

import ModelAction from "../../../services/ModelAction";
import CustomerDetails from './sections/CustomerDetails';
import ViewCustomers from './sections/ViewCustomers';
import CustomerService from '../../../services/CustomerService';
import BranchService from "../../../services/BranchService";
import LocalInfo from "../../../services/LocalInfo";

class Customer extends Component{
    state={
        activeStep: 0,
        pageName: false,
        branchCustomers: [],
        currentCustomer: {}
    }

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchCustomers } = this.props;

        await this.setState({
            branchCustomers: branchCustomers,
        });
    }

    async componentDidUpdate(prevProps) {
        const {...props} = this.props;

        if(prevProps.activeStep !== props.activeStep){
            console.log('me')
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <ViewCustomers setView={this.setStepContentView.bind(this)} searchCustomer={this.searchCustomerHandler.bind(this)} branchCustomers={this.state.branchCustomers} customerAdd={this.showAddView.bind(this)} />;
            case 1:
                return <CustomerDetails setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} deleteStoreCustomer={this.deleteCustomer.bind(this)}  />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async searchCustomerHandler(searchValue){
        try{
            const customers = await new CustomerService().searchBranchCustomer(searchValue);
            this.setState({
                branchCustomers: customers,
            });
        }catch (e) {
            return false;
        }
    };

    showAddView = async (customerId , step) => {
        const old_list = this.state.branchCustomers;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.customerId === customerId));

        console.log(itemIndex)
        this.setState({
            currentCustomer: itemIndex,
            activeStep: step
        });
    };

    deleteCustomer = async (cId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this customer?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('BranchCustomer').destroy(cId);
                        this.setState({
                            activeStep: 0
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

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

const EnhancedDirectiveViewCustomers = withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database }) => ({
        branchCustomers: new BranchService(LocalInfo.branchId).getCustomers(),
    }))(withRouter(Customer))
);

export default withRouter(EnhancedDirectiveViewCustomers);