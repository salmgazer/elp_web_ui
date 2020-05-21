import React, {Component} from 'react';
import LocalInfo from "../../../../services/LocalInfo";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import {Q} from "@nozbe/watermelondb";
import database from "../../../../models/database";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";
import paths from "../../../../utilities/paths";
import MainSuppliersView from "./sections/MainSuppliersView";
import SupplierService from "../../../../services/SupplierService";
import SingleSupplierDetails from "./sections/SingleSupplierDetails";
import SupplierStockView from "../orderStock/sections/SupplierStockView";

class ViewSuppliersNew extends Component {
    state = {
        activeStep: 0,
        branchSuppliers: []
    };

    async componentDidMount() {
        const { history, database , branchSuppliers} = this.props;

        console.log(branchSuppliers);
        await this.setState({
            branchSuppliers: branchSuppliers,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchSuppliers } = this.props;

        if(prevProps.branchSuppliers.length !== branchSuppliers.length){
            this.setState({
                branchSuppliers: branchSuppliers,
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['All Suppliers View' , 'Single Supplier View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainSuppliersView setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <SingleSupplierDetails setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    /*
    * @todo change color of active tab
    * */
    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    render(){
        return (
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedViewSuppliersNew = withDatabase(
    withObservables(['branchSuppliers'], ({ branchSuppliers , database }) => ({
        branchSuppliers: SupplierService.getBranchSuppliers(),
    }))(withRouter(ViewSuppliersNew))
);

export default EnhancedViewSuppliersNew;
