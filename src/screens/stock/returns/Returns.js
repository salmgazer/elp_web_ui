import React, {Component} from 'react';
import {withRouter} from "react-router";

import ReturnSupplier from './sections/ReturnSupplier';
import ReturnProduct from './sections/ReturnProduct';
import StockMovement from './sections/StockMovement';


class Returns extends Component {

    state={
        activeStep: 2
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <ReturnSupplier setView={this.setStepContentView.bind(this)} />
            case 1:
                return <ReturnProduct setView={this.setStepContentView.bind(this)}  />
            case 2:
                return <StockMovement setView={this.setStepContentView.bind(this)}  />
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

export default withRouter(Returns);