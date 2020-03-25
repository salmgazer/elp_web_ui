import React, {Component} from 'react';
import {withRouter} from "react-router";

import CreditCard from './sections/CreditCard';
import MtnMoMo from './sections/MtnMoMo';
import AirtelTigoCash from './sections/AirtelTigoCash';
import VodafoneCash from './sections/VodafoneCash';

class Payment extends Component {

    state={
        activeStep: 0
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <CreditCard setView={this.setStepContentView.bind(this)} />
            case 1:
                return <MtnMoMo setView={this.setStepContentView.bind(this)}  />
            case 2:
                return <VodafoneCash setView={this.setStepContentView.bind(this)} />
            case 3:
                return <AirtelTigoCash setView={this.setStepContentView.bind(this)} />
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
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

export default withRouter(Payment);