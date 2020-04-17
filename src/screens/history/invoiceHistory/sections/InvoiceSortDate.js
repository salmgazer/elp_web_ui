import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './DayView';
import WeekView from '../../orderHistory/sections/views/WeekView';
import MonthView from '../../orderHistory/sections/views/MonthView';
import YearView from '../../orderHistory/sections/views/YearView';
import Payment from '../../orderHistory/sections/views/Payment';
import DateToggle from "../../../../components/DateToggle/DateToggle";

class InvoiceSortDate extends Component {

    state={
        activeStep: 0,
        invoiceList: [
            {
                "inv_id": "1234",
                "name": "Cash customer",
                "date": "Friday, 13th March 2020 | 5:00pm",
                "worth": "200",
                "number": "1234567",
                "status": "Owes GHC 50"
            },
            {
                "inv_id": "5678",
                "name": "Chris Asante",
                "date": "Friday, 13th March 2020 | 4:00pm",
                "worth": "400",
                "number": "7654321",
                "status": "Full payment"
            },
            {
                "inv_id": "9101",
                "name": "Cash customer",
                "date": "Friday, 13th March 2020 | 3:00pm",
                "worth": "100",
                "number": "9876543",
                "status": "Full payment"
            },
            {
                "inv_id": "1121",
                "name": "Fred Yeboah",
                "date": "Friday, 13th March 2020 | 2:00pm",
                "worth": "500",
                "number": "3456789",
                "status": "Owes GHC 10"
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
                "name": "Cash customer",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            },
            {
                "day_id": "2",
                "name": "Chris Asante",
                "image": "no_image.png",
                "owed": "100",
                "worth": "500"
            }
        ],
        monthList: [ 
            {
                "week_id": "1",
                "name": "Cash customer",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            },
            {
                "week_id": "2",
                "name": "Chris Asante",
                "image": "no_image.png",
                "owed": "10",
                "worth": "500"
            }
        ],
        yearList: [ 
            {
                "month_id": "1",
                "name": "Cash customer",
                "image": "no_image.png",
                "owed": "3",
                "worth": "200"
            },
            {
                "month_id": "2",
                "name": "Chris Asante",
                "image": "no_image.png",
                "owed": "40",
                "worth": "500"
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} prod={this.state.productList}  invoices={this.state.invoiceList} profitName="Amount owed" />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Purchased items" profitName="Amount owed" />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Purchased items" profitName="Amount owed" />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Purchased items" profitName="Amount owed" />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)}  />;
            default:
                return 'Complete';
        }
    };

    async componentDidUpdate(prevProps) {
        const {...props} = this.props;

        if(prevProps.activeStep !== props.activeStep){
            console.log('me')
        }
    }

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    render() {
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

export default withRouter(InvoiceSortDate);