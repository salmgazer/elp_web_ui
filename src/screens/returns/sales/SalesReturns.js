import React, {Component} from 'react';
import {withRouter} from "react-router";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../../services/BranchService";
import LocalInfo from "../../../services/LocalInfo";

import MainPage from './sections/MainPage';
import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import ReturnsProducts from './sections/ReturnsProducts';
import ConfirmPage from './sections/ConfirmPage';
import CustomerService from '../../../services/CustomerService';


class SalesReturns extends Component{

    constructor(props){
        super(props);
        this.state = {
            activeStep: 1,
            branchCustomers: [],
            currentCustomer: {},
            saleEntries: [],
            invoice: [],
            pageName: true
        }
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

    // state={
    //     activeStep: 1,
    //     branchCustomers: [
    //         {
    //             'name': 'Kwame Befo',
    //             'date': '1st June 2020'
    //         },
    //         {
    //             'name': 'Ama Serwaa',
    //             'date': '25th April 2020'
    //         },
    //         {
    //             'name': 'Poku Clif',
    //             'date': 'yesterday'
    //         }
    //     ],
    //     returns: [
    //         {
    //             'name': 'Kwame Befo',
    //             'receiptNumber': '12345566',
    //             'sales': '50',
    //             'date': '7:00 pm'
    //         },
    //         {
    //             'name': 'Kwame Befo',
    //             'receiptNumber': '12345566',
    //             'sales': '50',
    //             'date': '5:00 pm'
    //         }
    //     ],
    //     customer: {
    //         'name': 'Pearl Gemegah',
    //         'date': '25th April 2020',
    //         'time': '4:00 pm',
    //         'cost': '300'
    //     },
    //     products: [
    //         {
    //             'name': 'Beta Malt 500ml',
    //             'quantity': '4',
    //             'cost': '50',
    //             'date': '5:00 pm',
    //             'image': 'no_image.png'
    //         },
    //         {
    //             'name': 'Sprite 500ml',
    //             'quantity': '7',
    //             'cost': '100',
    //             'date': '5:00 pm',
    //             'image': 'no_image.png'
    //         }
    //     ],
    //     singleProduct: [
    //         {
    //             'name': 'Sprite 500ml',
    //             'cost': '5',
    //             'image': 'no_image.png'
    //         }
    //     ]
    // }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} pageName={this.state.pageName} customer={this.state.currentCustomer} returnProducts={this.returnProducts.bind(this)} />;
            case 1:
                return <MainPage setView={this.setStepContentView.bind(this)} searchCustomer={this.searchCustomerHandler.bind(this)} branchCustomers={this.state.branchCustomers} customerAdd={this.showAddView.bind(this)} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 5:
                return <ReturnsProducts setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} products={this.state.saleEntries} />;
            case 6:
                return <ConfirmPage setView={this.setStepContentView.bind(this)} products={this.state.singleProduct} />;
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

    returnProducts = async (step, saleEntries) => {
        console.log(saleEntries);
        this.setState({
            saleEntries: saleEntries,
            activeStep: step
        });
    };

    render(){
        return(
            <div>

                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

const EnhancedSalesReturns= withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database }) => ({
        branchCustomers: new BranchService(LocalInfo.branchId).getCustomers(),
    }))(withRouter(SalesReturns))
);

export default withRouter(EnhancedSalesReturns);