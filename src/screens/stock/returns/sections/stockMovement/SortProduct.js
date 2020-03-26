import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';
import SProductView from './views/SProductView';


class SortProduct extends Component{

    state={
        isDrawerShow: false,
        activeStep: 4,
        productList: [
            {
                "pro_id": "1",
                "pro_name": "Beta Malt 350 ml",
                "name": "Beta Malt 350 ml",
                "image": "no_image.png",
                "date": "6th Mar, 2020",
                "time": "5:00 pm"
            },
        ],
        weekList: [ 
            {
                'day_id': '1',
                'day': 'Monday, 9th Mar, 2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            {
                'day_id': '2',
                'day': 'Tuesday, 10th Mar, 2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            } 
        ],
        monthList: [ 
            {
                'week_id': '1',
                'week': 'Week 5: 17/02/2020 - 21/02/2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            {
                'week_id': '2',
                'week': 'Week 6: 24/02/2020 - 28/02/2020',
                "date": "18th Mar, 2020",
                "time": "10:00 pm"
            }
        ],
        yearList: [ 
            {
                'month_id': '1',
                'month': 'January 2020',
                "date": "15th Mar, 2020",
                "time": "2:00 pm"
            },
            {
                'month_id': '2',
                'month': 'February 2020',
                "date": "15th Mar, 2020",
                "time": "2:00 pm"
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 4:
                return <SProductView setView={this.setStepContentView.bind(this)} products={this.state.productList} />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} products={this.state.productList} pageName="Beta Malt sold"  />;
            case 1:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Beta Malt sold"  />;
            case 2:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Beta Malt sold" />;
            case 3:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Beta Malt sold" />;
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