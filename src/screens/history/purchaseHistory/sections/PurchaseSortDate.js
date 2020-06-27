import React, {Component} from 'react';
import {withRouter} from "react-router";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";

import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import YearView from './YearView';
import DateToggle from "../../../../components/DateToggle/DateToggle";

class SortDate extends Component{
    state={
        activeStep: 0,
        currentProduct: {},
        pageName: false,
        error: false,
        errorMsg: '',
        success: false,
        successMsg: '',
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} deleteProduct={this.deleteProduct.bind(this)}  updateStockEntry={this.updateStockEntry.bind(this)} />;
            case 2:
                return <WeekView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 3:
                return <MonthView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 4:
                return <YearView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    getChildrenViewDetails = async (index , view) => {
        localStorage.setItem("activeHistoryIndex" , index);

        switch(view){
            case 0:
                this.setState({
                    activeStep: view
                });
                return true;
            case 2:
                this.setState({
                    activeStep: view
                });
                return true;
            case 3:
                this.setState({
                    activeStep: view
                });
                return true;
            default:
                return false;
        }
    };

    async componentDidUpdate(prevProps) {
        const {...props} = this.props;

        if(prevProps.activeStep !== props.activeStep){
            console.log('me')
        }
    }

    deleteProduct = async (pId) => {
        confirmAlert({
           title: 'Confirm to delete',
           message: 'Are you sure you want to delete this entry.',
           buttons: [
               {
                   label: 'Yes',
                   onClick: () => {
                       new ModelAction('BranchProductStock').softDelete(pId);
                   }
               },
               {
                   label: 'No',
                   onClick: () => {
                       return false;
                   }
               }
           ]
       })
    };

    async updateStockEntry(pId, formFields){
        console.log(formFields)
        console.log(pId)
        if (formFields.costPrice) {
            const data = {
                costPrice: parseFloat(formFields.costPrice)
            };
            try {
                const status = new ModelAction('BranchProductStock').update(pId, data);
                console.log(status)
                if(status){
                    return true;
                }
                alert('Something went wrong');
                return false;
            }catch (e) {
                return false;
            }
        }
        else {

            try {
                const status = new ModelAction('BranchProductStock').update(pId, formFields);
                console.log(status)
                if(status){
                    return true;
                }
                alert('Something went wrong');
                return false;
            }catch (e) {
                return false;
            }
        }
    };

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

export default withRouter(SortDate);
