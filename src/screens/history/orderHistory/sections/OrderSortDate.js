import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';
import Payment from './views/Payment';
import DaySupplierView from './views/DaySupplierView';
import DateToggle from "../../../../components/DateToggle/DateToggle";

class OrderSortDate extends Component{

    state={
        activeStep: 0,
        suppliers: [
            {
                "supp_id": "1234",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "worth": "500"
            },
            {
                "supp_id": "5678",
                "name": "Kwame Despite Enterprise",
                "image": "no_image.png",
                "worth": "700"
            }
        ],
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
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 1:
                return <DayView setView={this.setStepContentView.bind(this)} suppliers={this.state.suppliersInfo} products={this.state.productList} supplierDetails={this.state.suppliers} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)}  />;
            case 0:
                return <DaySupplierView setView={this.setStepContentView.bind(this)} supplierDetails={this.state.suppliers} />;
    
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async componentDidUpdate(prevProps) {
        const {...props} = this.props;

        if(prevProps.activeStep !== props.activeStep){
            console.log('me')
        }
    }


    render(){
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

export default withRouter(OrderSortDate);