import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './sections/MainPage';
import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import ReturnsProducts from './sections/ReturnsProducts';
import ConfirmPage from './sections/ConfirmPage';


class StockReturns extends Component{

    state={
        activeStep: 1,
        branchSuppliers: [
            {
                'name': "Nico's Enterprise",
                'date': '1st June 2020'
            },
            {
                'name': 'Kasapreko Limited',
                'date': '25th April 2020'
            },
            {
                'name': 'Bell Aqua Water',
                'date': 'yesterday'
            }
        ],
        returns: [
            {
                'name': 'Kasapreko Limited',
                'date': '1st June 2020',
                'sales': '50',
                'time': '7:00 pm'
            },
            {
                'name': 'Kasapreko Limited',
                'date': '1st June 2020',
                'sales': '50',
                'time': '5:00 pm'
            }
        ],
        supplier: {
            'name': 'Kasapreko Limited',
            'date': '25th April 2020',
            'time': '4:00 pm',
            'cost': '50'
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
                return <MainPage setView={this.setStepContentView.bind(this)} branchSuppliers={this.state.branchSuppliers} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} returns={this.state.returns}  />;
            case 5:
                return <ReturnsProducts setView={this.setStepContentView.bind(this)} supplier={this.state.supplier} products={this.state.products} />;
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

export default withRouter(StockReturns);