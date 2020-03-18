import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from '../../salesHistory/sections/DayView';
import WeekView from '../../salesHistory/sections/WeekView';
import MonthView from '../../salesHistory/sections/MonthView';
import YearView from '../../salesHistory/sections/YearView';
import SProductView from '../../salesHistory/sections/SProductView';


class SortProduct extends Component{

    state={
        isDrawerShow: false,
        activeStep: 4,
        productList: [
            {
                "pro_id": "1234",
                "name": "Bella Vinas Red Wine",
                "pro_name": "Bella Vinas",
                "image": "no_image.png",
                "quantity": "5",
                "sales": "500",
                "profit": "100"
            }
        ],
        weekList: [ 
            {
                'day': 'Monday, 9th Mar, 2020',
                'sales': '800',
                'profit': '500'
            },
            {
                'day': 'Tuesday, 10th Mar, 2020',
                'sales': '900',
                'profit': '200'
            }
            
        ],
        monthList: [ 
            {
                'week': 'Week 5: 17/02/2020 - 21/02/2020',
                'sales': '800',
                'profit': '500'
            },
            {
                'week': 'Week 6: 24/02/2020 - 28/02/2020',
                'sales': '900',
                'profit': '200'
            }
        ],
        yearList: [ 
            {
                'month': 'January 2020',
                'sales': '800',
                'profit': '500'
            },
            {
                'month': 'February 2020',
                'sales': '900',
                'profit': '200'
            },
            {
                'month': 'March 2020',
                'sales': '700',
                'profit': '300'
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 4:
                return <SProductView setView={this.setStepContentView.bind(this)} products={this.state.productList} />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} products={this.state.productList} pageName="Bella sold" profitName="Expected Profit" />;
            case 1:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Bella sold" profitName="Expected Profit" />;
            case 2:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Bella sold" profitName="Expected Profit" />;
            case 3:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Bella sold" profitName="Expected Profit" />;
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