import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './sections/MainPage';
import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import ReturnsProducts from './sections/ReturnsProducts';
import ConfirmPage from './sections/ConfirmPage';


class SalesReturns extends Component{

    state={
        activeStep: 1,
        branchCustomers: [
            {
                'name': 'Kwame Befo',
                'date': '1st June 2020'
            },
            {
                'name': 'Ama Serwaa',
                'date': '25th April 2020'
            },
            {
                'name': 'Poku Clif',
                'date': 'yesterday'
            }
        ],
        returns: [
            {
                'name': 'Kwame Befo',
                'receiptNumber': '12345566',
                'sales': '50',
                'date': '7:00 pm'
            },
            {
                'name': 'Kwame Befo',
                'receiptNumber': '12345566',
                'sales': '50',
                'date': '5:00 pm'
            }
        ],
        customer: {
            'name': 'Pearl Gemegah',
            'date': '25th April 2020',
            'time': '4:00 pm',
            'cost': '300'
        },
        products: [
            {
                'name': 'Beta Malt 500ml',
                'quantity': '4',
                'cost': '50',
                'date': '5:00 pm',
                'image': 'no_image.png'
            },
            {
                'name': 'Sprite 500ml',
                'quantity': '7',
                'cost': '100',
                'date': '5:00 pm',
                'image': 'no_image.png'
            }
        ],
        singleProduct: [
            {
                'name': 'Sprite 500ml',
                'cost': '5',
                'image': 'no_image.png'
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns} />;
            case 1:
                return <MainPage setView={this.setStepContentView.bind(this)} branchCustomers={this.state.branchCustomers} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 5:
                return <ReturnsProducts setView={this.setStepContentView.bind(this)} customer={this.state.customer} products={this.state.products} />;
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

    render(){
        return(
            <div>

                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

export default withRouter(SalesReturns);