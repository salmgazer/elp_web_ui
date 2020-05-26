import React, {Component} from 'react';
import {withRouter} from "react-router";

import AddEmployee from './sections/AddEmployee';
import EditEmployee from './sections/EditEmployee';
import EmployeeActivity from './sections/EmployeeActivity';
import EmployeeDetails from './sections/EmployeeDetails';
import EmployeesList from './sections/EmployeesList';
import LinkEmployee from './sections/LinkEmployee';
import SearchEmployees from './sections/SearchEmployees';


class Employees extends Component{

    state={
        activeStep: 2,
        branchEmployees: [],
        employeesList: [
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
        ]
    }

    // async componentDidMount() {
    //     const { branchEmployees } = this.props;

    //     await this.setState({
    //         branchEmployees: branchEmployees,
    //     });

    //     if (branchEmployees.length === 0 ){
    //         await this.setState({
    //             activeStep: 0,
    //         });
    //     } else {
    //         await this.setState({
    //             activeStep: 1,
    //         });
    //     }

    // }

    // async componentDidUpdate(prevProps) {
    //     const { branchEmployees } = this.props;

    //     if(prevProps.branchEmployees.length !== branchEmployees.length){
    //         this.setState({
    //             branchEmployees: branchEmployees,
    //         });
    //     }
    // }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <SearchEmployees setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <EmployeesList setView={this.setStepContentView.bind(this)} employeesList={this.state.employeesList} />;
            case 2:
                return <LinkEmployee setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <AddEmployee setView={this.setStepContentView.bind(this)} />;
            case 4:
                return <EmployeeDetails setView={this.setStepContentView.bind(this)} />;
            case 5:
                return <EditEmployee setView={this.setStepContentView.bind(this)} />;
            case 6:
                return <EmployeeActivity setView={this.setStepContentView.bind(this)} />;
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