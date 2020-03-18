import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import YearView from './YearView';


class SortDate extends Component{

    state={
        isDrawerShow: false,
        activeStep: 0,
        productList: [
            {
                "pro_id": "1234",
                "name": "Bella Vinas Red Wine",
                "image": "no_image.png",
                "quantity": "5",
                "sales": "500",
                "profit": "100"
            },
            {
                "pro_id": "5678",
                "name": "Nido Milk Sachet",
                "image": "no_image.png",
                "quantity": "10",
                "sales": "600",
                "profit": "10"
            },
            {
                "pro_id": "9101",
                "name": "Milo Sachet 50g",
                "image": "no_image.png",
                "quantity": "15",
                "sales": "700",
                "profit": "70"
            },
            {
                "pro_id": "1121",
                "name": "Ideal Milk 50g",
                "image": "no_image.png",
                "quantity": "2",
                "sales": "800",
                "profit": "150"
            },
            {
                "pro_id": "1415",
                "name": "Beta Malt 500ml PB",
                "image": "no_image.png",
                "quantity": "4",
                "sales": "900",
                "profit": "200"
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
            },
            {
                'day': 'Wednesday, 11th Mar, 2020',
                'sales': '700',
                'profit': '300'
            },
            {
                'day': 'Thursday, 12th Mar, 2020',
                'sales': '600',
                'profit': '100'
            },
            
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
            },
            {
                'week': 'Week 7: 01/03/2020 - 05/03/2020',
                'sales': '700',
                'profit': '300'
            },
            {
                'week': 'Week 8: 08/03/2020 - 12/03/2020',
                'sales': '600',
                'profit': '100'
            },
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
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} products={this.state.productList} pageName="Sold items" />;
            case 1:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Sold items" />;
            case 2:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Sold items" />;
            case 3:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Sold items" />;
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

export default withRouter(SortDate);