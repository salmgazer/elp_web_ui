import React, {Component} from 'react';
import {withRouter} from "react-router";
import SectionNavbars from "../../../Components/Sections/SectionNavbars";
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import MainView from './supplier/MainView';
import DayView from './supplier/DayView';
import WeekView from './supplier/WeekView';
import MonthView from './supplier/MonthView';
import YearView from './supplier/YearView';

class ReturnSupplier extends Component {

    state={
        activeStep: 0,
        suppliersList: [
            {
                'id': '1',
                'name': 'Cash supplier',
                'date': '20th March 2020'
            },
            {
                'id': '2',
                'name': 'Bell Aqua Ghana',
                'date': '20th March 2020'
            },
            {
                'id': '3',
                'name': 'Kasapreko Ghana',
                'date': '20th March 2020'
            },
            {
                'id': '4',
                'name': 'Coca Cola Ghana',
                'date': '20th March 2020'
            },
            {
                'id': '5',
                'name': 'Voltic Ghana',
                'date': '20th March 2020'
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
                "cost": "100"
            },
            {
                "pro_id": "2",
                "name": "Milo Sachet 50g",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100"
            },
            {
                "pro_id": "3",
                "name": "Ideal Milk 50g",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100"
            },
            {
                "pro_id": "4",
                "name": "Beta Malt 500ml PB",
                "image": "no_image.png",
                "quantity": "10",
                "cost": "100"
            }
        ],
        weekList: [ 
            {
                "day_id": "1",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            },
            {
                "day_id": "2",
                "name": "Kwame Despite Enterprise",
                "image": "no_image.png",
                "owed": "0",
                "worth": "500"
            }
        ],
        monthList: [ 
            {
                "week_id": "1",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            },
            {
                "week_id": "2",
                "name": "Kwame Despite Enterprise",
                "image": "no_image.png",
                "owed": "0",
                "worth": "500"
            },
            {
                "week_id": "3",
                "name": "Hisense Enterprise",
                "image": "no_image.png",
                "owed": "0",
                "worth": "260"
            },
            {
                "week_id": "4",
                "name": "Melcom Enterprise",
                "image": "no_image.png",
                "owed": "10",
                "worth": "40"
            }
        ],
        yearList: [ 
            {
                "month_id": "1",
                "name": "Niko's Enterprise",
                "image": "no_image.png",
                "owed": "20",
                "worth": "200"
            },
            {
                "month_id": "2",
                "name": "Kwame Despite Enterprise",
                "image": "no_image.png",
                "owed": "0",
                "worth": "500"
            },
            {
                "month_id": "3",
                "name": "Hisense Enterprise",
                "image": "no_image.png",
                "owed": "0",
                "worth": "260"
            },
            {
                "month_id": "4",
                "name": "Melcom Enterprise",
                "image": "no_image.png",
                "owed": "10",
                "worth": "40"
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainView setView={this.setStepContentView.bind(this)} suppliersList={this.state.suppliersList} />
            case 1:
                return <DayView setView={this.setStepContentView.bind(this)} suppliers={this.state.suppliersInfo} products={this.state.productList} pageName="Kasapreko Ghana" />
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)}  weekItem={this.state.weekList} pageName="Kasapreko Ghana"/>
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Purchased items" />
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Purchased items" />
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };


    render() {

        return(
            <div>

                <SectionNavbars 
                    title="Return purchases"  
                    icons={
                        <MoreVertIcon 
                            style={{fontSize: '2rem'}}
                        />}
                >
                    <MenuIcon
                        style={{fontSize: '2rem'}}
                    />
                    
                </SectionNavbars>
                
                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

export default withRouter(ReturnSupplier);