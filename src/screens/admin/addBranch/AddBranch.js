import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import MainPage from './sections/MainPage';
import ImportProducts from './sections/ImportProducts';
import AddedProducts from './sections/AddedProducts';
import CompleteStock from './sections/CompleteStock';

class AddBranch extends Component{

    state={
        activeStep: 2,
        addedProducts: [
            {
                'id': '1',
                'name': 'Beta Malt 250ml',
                "image": "no_image.png",
                'amount': '12'
            },
            {
                'id': '2',
                'name': 'Fanta',
                "image": "no_image.png",
                'amount': '4'
            },
            {
                'id': '3',
                'name': 'Coca cola 300ml',
                "image": "no_image.png",
                'amount': '100'
            },
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainPage setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <ImportProducts setView={this.setStepContentView.bind(this)} />;
            case 2:
                return <AddedProducts setView={this.setStepContentView.bind(this)} addedProducts={this.state.addedProducts}/>;
            case 3:
                return <CompleteStock setView={this.setStepContentView.bind(this)} />
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

export default withRouter(AddBranch);
