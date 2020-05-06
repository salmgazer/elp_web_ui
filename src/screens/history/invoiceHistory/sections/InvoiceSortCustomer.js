import React, {Component} from 'react';
import {withRouter} from "react-router";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../../../services/BranchService";
import LocalInfo from "../../../../services/LocalInfo";

import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import YearView from './YearView';
import Payment from '../../orderHistory/sections/views/Payment';
import DateToggle from "../../../../components/DateToggle/DateToggle";
import SortCustomerView from './SortCustomerView';
import CustomerService from '../../../../services/CustomerService';

class SortCustomer extends Component{

    state={
        isDrawerShow: false,
        activeStep: 1,
        branchCustomers: [],
        currentCustomer: {},
        pageName: true
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

    getStepContent = step => {
        switch (step) {
            case 1:
                return <SortCustomerView setView={this.setStepContentView.bind(this)} searchCustomer={this.searchCustomerHandler.bind(this)} branchCustomers={this.state.branchCustomers} customerAdd={this.showAddView.bind(this)} />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)}  />;
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


    render(){
        return(
            <div>
                <DateToggle
                    setView={this.setStepContentView.bind(this)}
                />
                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database }) => ({
        branchCustomers: new BranchService(LocalInfo.branchId).getCustomers(),
    }))(withRouter(SortCustomer))
);

export default withRouter(EnhancedDirectiveViewStock);
