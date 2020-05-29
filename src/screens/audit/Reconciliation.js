import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './sections/reconciliation/MainPage';
import ReconciliationReport from './sections/reconciliation/ReconciliationReport';
import ReconciliationDetails from './sections/reconciliation/ReconciliationDetails';
import ReconciliationHistory from './sections/reconciliation/ReconciliationHistory';

class Reconciliation extends Component{

    state={
        activeStep: 0,
        detailsList: [
            {
                'id': '1',
                'date': 'Monday, 23rd March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'cashIn': '40',
            },
            {
                'id': '2',
                'date': 'Tuesday, 24th March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'cashIn': '40',
            },
            {
                'id': '3',
                'date': 'Wednesday, 25th March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'cashIn': '40',
            },
            {
                'id': '4',
                'date': 'Thursday, 26th March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'cashIn': '40',
            }
        ],
        historyList: [
            {
                'id': '1',
                'dateRange': '23rd Mar 2020 - 27th Mar 2020',
                'time': '2:00 pm',
                'status': '60'
            },
            {
                'id': '2',
                'dateRange': '3rd Mar 2020 - 7th Mar 2020',
                'time': '10:00 am',
                'status': '60'
            },
            {
                'id': '3',
                'dateRange': '2nd Mar 2020 - 5th Mar 2020',
                'time': '7:00 pm',
                'status': '60'
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainPage setView={this.setStepContentView.bind(this)}  />;
            case 1:
                return <ReconciliationReport setView={this.setStepContentView.bind(this)} balance='700' cash='600' />
            case 2:
                return <ReconciliationDetails setView={this.setStepContentView.bind(this)} sales='1000' credit='500' reconciliationDetail={this.state.detailsList} />
            case 3:
                return <ReconciliationHistory setView={this.setStepContentView.bind(this)} histList={this.state.historyList} />
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

export default withRouter(Reconciliation);