import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Sales from "../../../../../../../models/sales/Sales";
import withObservables from "@nozbe/with-observables";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import SectionNavbars from "../../../../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SecondaryButton from "../../../../../../../components/Buttons/SecondaryButton";
import Box from "@material-ui/core/Box/Box";
// import CustomerService from '../../../../../../../services/CustomerService';
import BranchCustomer from "../../../../../../../models/branchesCustomer/BranchCustomer";

import { Q } from '@nozbe/watermelondb'
import LocalInfo from "../../../../../../../services/LocalInfo";
import Today from './sections/Today';
import Yesterday from './sections/Yesterday';
import ThisWeek from './sections/ThisWeek';
import ThisMonth from './sections/ThisMonth';
import OtherToggle from "../../../../../../../components/DateToggle/OtherToggle";

class OtherStockHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeStep: 0,
            history: {},
            currentSale: {},
            allSales: [],
            branchCustomers: []
        }
    }

        /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchCustomers, currentSale, sales } = this.props;

        await this.setState({
            branchCustomers: branchCustomers,
            currentSale: currentSale,
            allSales: sales,
        });
    }

    // async componentDidUpdate(prevProps) {
    //     const { branchCustomers, currentSale, sales} = this.props;

    //     if(sales.length !== prevProps.sales.length){
    //         await this.setState({
    //         branchCustomers: branchCustomers,
    //         currentSale: currentSale,
    //         allSales: sales,
    //     });
    //     }
    // }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <Today setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <Yesterday setView={this.setStepContentView.bind(this)} />;
            case 2:
                return <ThisWeek setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <ThisMonth setView={this.setStepContentView.bind(this)}/>;
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
                <SectionNavbars
                    title="Other Sales"
                    leftIcon={
                        <div>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                    leftOnClick={() => this.props.history.goBack()}
                />

                <OtherToggle
                    setView={this.setStepContentView.bind(this)}
                />

                {this.getStepContent(this.state.activeStep)}

                <Box
                    className="shadow1"
                    bgcolor="background.paper"
                    p={1}
                    style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <div
                        onClick={() => this.props.history.goBack()}
                    >
                        <SecondaryButton
                            classes={`py-1 px-5`}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </Box>
            </div>
        )
    }
}

const EnhancedOtherStockHistory = withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers, sales ,  database }) => ({
        branchCustomers: database.collections.get(BranchCustomer.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
        sales: database.collections.get(Sales.table).query().observe(),
    }))(withRouter(OtherStockHistory))
);

export default withRouter(EnhancedOtherStockHistory);
