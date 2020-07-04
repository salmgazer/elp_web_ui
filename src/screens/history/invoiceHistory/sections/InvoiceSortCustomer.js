import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../../../services/BranchService";
import Sales from "../../../../models/sales/Sales";
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
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            activeStep: 1,
            branchCustomers: [],
            currentCustomer: {},
            pageName: true,
            currentSale: {},
            allSales: []
        };
    };

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchCustomers, currentSale, sales } = this.props;

        await this.setState({
            branchCustomers: branchCustomers,
            currentSale: currentSale,
            allSales: sales,
        });
    }

    async componentDidUpdate(prevProps) {
        const {currentSale, sales} = this.props;

        if(sales.length !== prevProps.sales.length){
            await this.setState({
            currentSale: currentSale,
            allSales: sales,
        });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 1:
                return <SortCustomerView setView={this.setStepContentView.bind(this)} searchCustomer={this.searchCustomerHandler.bind(this)} branchCustomers={this.state.branchCustomers} customerAdd={this.showAddView.bind(this)} />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName} customerAdd={this.changeToPaymentView.bind(this)} />;
            case 2:
                return <WeekView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 3:
                return <MonthView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 4:
                return <YearView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} pageName={this.state.pageName}  />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)} sale={this.state.currentSale} />;
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

        this.setState({
            currentCustomer: itemIndex,
            activeStep: step
        });
    };

    changeToPaymentView = async (id , step) => {
        const old_list = this.state.allSales;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === id));

        this.setState({
            currentSale: itemIndex,
            activeStep: step
        });
    };

    getChildrenViewDetails = async (index , view) => {
        localStorage.setItem("activeHistoryIndex" , index);

        switch(view){
            case 0:
                this.setState({
                    activeStep: view
                });
                return true;
            case 2:
                this.setState({
                    activeStep: view
                });
                return true;
            case 3:
                this.setState({
                    activeStep: view
                });
                return true;
            default:
                return false;
        }
    };

    render(){
        return(
            <div>
                {
                    this.state.activeStep !== 1 ?
                        <DateToggle
                            setView={this.setStepContentView.bind(this)}
                        />
                        :
                        ''

                }

                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database, sales }) => ({
        branchCustomers: new BranchService(LocalInfo.branchId).getCustomers(),
        sales: database.collections.get(Sales.table).query().observe(),
    }))(withRouter(SortCustomer))
);

export default withRouter(EnhancedDirectiveViewStock);
