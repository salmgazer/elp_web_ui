import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import CustomerDetails from './sections/CustomerDetails';
import CustomerOrders from './sections/CustomerOrders';
import OrderDetails from './sections/OrderDetails';
import ViewCustomers from './sections/ViewCustomers';

class Customer extends Component{
    state={
        activeStep: 0,
        pageName: false,
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <CustomerDetails setView={this.setStepContentView.bind(this)}  />;
            case 2:
                return <CustomerOrders setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <OrderDetails setView={this.setStepContentView.bind(this)}/>;
            case 4:
                return <ViewCustomers setView={this.setStepContentView.bind(this)} />;
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

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

export default withRouter(Customer);