import React, {Component} from 'react';
import {withRouter} from "react-router";

import AddEmployee from './sections/AddEmployee';
import EditEmployee from './sections/EditEmployee';
import EmployeeActivity from './sections/EmployeeActivity';
import EmployeeDetails from './sections/EmployeeDetails';
import EmployeesList from './sections/EmployeesList';
import LinkEmployee from './sections/LinkEmployee';
import EmployeePermission from './sections/EmployeePermission';

class Employees extends Component{

    state={
        activeStep: 1,
        branchEmployees: [
            {
                'name': 'Kwame Befo',
                'position': 'attendant'
            },
            {
                'name': 'Ama Serwaa',
                'position': 'attendant'
            },
            {
                'name': 'Poku Clif',
                'position': 'supervisor'
            }
        ],
        currentEmployee: 
            {
                'name': 'Kwame Befo',
                'position': 'attendant',
                'items': '50',
                'sales': 'GHC 500',
                'purchases': 'GHC 200',
                'prev': 'GHC 100'
            },
        employeeActivities: [
            {
                'product': 'Beta Malt 250ml',
                'name': 'Ama Serwah',
                'date': '26/11/20',
                'time': '12:00pm'
            },
            {
                'product': 'Beta Malt 250ml',
                'name': 'Ama Serwah',
                'date': '26/11/20',
                'time': '12:00pm'
            },
            {
                'product': 'Beta Malt 250ml',
                'name': 'Ama Serwah',
                'date': '26/11/20',
                'time': '12:00pm'
            },
        ],
        employeePermission: [
            {
                'permission': 'Admin'
            }
        ]
        
    }

    getStepContent = step => {
        switch (step) {
            case 1:
                return <EmployeesList setView={this.setStepContentView.bind(this)} branchEmployees={this.state.branchEmployees} />;
            case 2:
                return <LinkEmployee setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <AddEmployee setView={this.setStepContentView.bind(this)} />;
            case 4:
                return <EmployeeDetails setView={this.setStepContentView.bind(this)} currentEmployee={this.state.currentEmployee} />;
            case 5:
                return <EditEmployee setView={this.setStepContentView.bind(this)} />;
            case 6:
                return <EmployeeActivity setView={this.setStepContentView.bind(this)} employeeActivities={this.state.employeeActivities} />;
            case 7:
                return <EmployeePermission setView={this.setStepContentView.bind(this)} employeePermission={this.state.employeePermission} />;
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

export default withRouter(Employees);