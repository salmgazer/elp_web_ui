import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './owner/MainPage';
import CollectionHistory from './owner/CollectionHistory';

class Owner extends Component {  

    state={
        activeStep: 0,
        todayCollection:[
            {
            'id': '1',
            'date': 'Thursday 3rd March 2020',
            'name': 'Ama Serwaa',
            'amount': '300'
            }
        ],
        pendingCollection:[
            {
                'id': '1',
                'empName': 'Ama Serwaa',
                'amount': '300',
            },
            {
                'id': '2',
                'empName': 'Kofi',
                'amount': '500',
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainPage setView={this.setStepContentView.bind(this)} pendingCollection={this.state.pendingCollection} collection={this.state.todayCollection} />;
            case 1:
                return <CollectionHistory setView={this.setStepContentView.bind(this)} collection={this.state.todayCollection} />;
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

export default withRouter(Owner);