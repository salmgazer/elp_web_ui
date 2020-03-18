import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';
import SortSupplierView from './views/SortSupplierView';
import Payment from './views/Payment';
import DaySupplierView from './views/DaySupplierView';


class SortProduct extends Component{

    state={
        isDrawerShow: false,
        activeStep: 6,
        suppliersInfo: [
            {
                "supp_id": "1234",
                "name": "Niko's Enterprise",
                "date": "Friday, 13th March 2020 | 5:00pm",
                "worth": "200"
            },
            {
                "supp_id": "5678",
                "name": "Niko's Enterprise",
                "date": "Friday, 13th March 2020 | 2:00pm",
                "worth": "300"
            }
        ],
        suppliers: [
            {
                "supp_id": "1234",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "worth": "500"
            }
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
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            }
        ],
        monthList: [ 
            {
                "week_id": "1",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            }
        ],
        yearList: [ 
            {
                "month_id": "1",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 6:
                return <SortSupplierView setView={this.setStepContentView.bind(this)} cellName="Nico's enterprise" pageName="Search for a product to view history" />;
            case 1:
                return <DayView setView={this.setStepContentView.bind(this)} suppliers={this.state.suppliersInfo} products={this.state.productList} supplierDetails={this.state.suppliers} pageName="Nico's enterprise" profitName="Amount owed" />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Nico's enterprise" profitName="Amount owed" />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Nico's enterprise" profitName="Amount owed" />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Nico's enterprise" profitName="Amount owed" />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)}  />;
            case 0:
                return <DaySupplierView setView={this.setStepContentView.bind(this)} supplierDetails={this.state.suppliers} pageName="Nico's enterprise" profitName="Amount owed" />;
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