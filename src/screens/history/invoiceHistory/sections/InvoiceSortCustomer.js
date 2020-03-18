import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './DayView';
import WeekView from '../../orderHistory/sections/views/WeekView';
import MonthView from '../../orderHistory/sections/views/MonthView';
import YearView from '../../orderHistory/sections/views/YearView';
import Payment from '../../orderHistory/sections/views/Payment';
import SortCustomerView from '../../orderHistory/sections/views/SortSupplierView';




class SortProduct extends Component{

    state={
        isDrawerShow: false,
        activeStep: 6,
        invoiceList: [
            {
                "inv_id": "5678",
                "name": "Chris Asante",
                "date": "Friday, 13th March 2020 | 4:00pm",
                "worth": "400",
                "number": "7654321",
                "status": "Owes GHC 400"
            },
        ],
        productList: [
            {
                "pro_id": "1",
                "name": "Nido Milk Sachet",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100",
                "sales": "200"
            },
            {
                "pro_id": "2",
                "name": "Milo Sachet 50g",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100",
                "sales": "200"
            },
            {
                "pro_id": "3",
                "name": "Ideal Milk 50g",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100",
                "sales": "200"
            },
            {
                "pro_id": "4",
                "name": "Beta Malt 500ml PB",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100",
                "sales": "200"
            }
        ],
        weekList: [ 
            {
                "day_id": "1",
                "name": "Chris Asante",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            }
        ],
        monthList: [ 
            {
                "week_id": "1",
                "name": "Chris Asante",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            }
        ],
        yearList: [ 
            {
                "month_id": "1",
                "name": "Chris Asante",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 6:
                return <SortCustomerView setView={this.setStepContentView.bind(this)} cellName="Chris Asante" pageName="Search for a customer to view history" />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} prod={this.state.productList}  invoices={this.state.invoiceList} profitName="Amount owed" />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Chris Asante" profitName="Amount owed" />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Chris Asante" profitName="Amount owed" />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Chris Asante" profitName="Amount owed" />;
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


    render(){
        return(
            <div>

                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

export default withRouter(SortProduct);