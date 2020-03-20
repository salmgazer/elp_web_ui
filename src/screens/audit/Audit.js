import React, {Component} from 'react';
import {withRouter} from "react-router";
import {confirmAlert} from "react-confirm-alert";

import AuditHistory from './sections/AuditHistory';
import Reconciliation from './sections/Reconciliation';
import AuditDetails from './sections/AuditDetails';

class Audit extends Component{

    state={
        activeStep: 1,
        datesList: [
            {
                'date_id': '1',
                'date': '20th March 2020',
                'time': '2:00pm',
                'status': 'Unbalanced'
            },
            {
                'date_id': '2',
                'date': '20th March 2020',
                'time': '4:00pm',
                'status': 'Balanced'
            },
        ],
        productList: [
            {
                'prod_id': '1',
                'name': 'Milo Sachet 50g',
                'image': 'no_image.png',
                'app': '50',
                'count': '40',
                'difference': '10'
            },
            {
                'prod_id': '2',
                'name': 'Ena pa mackrel',
                'image': 'no_image.png',
                'app': '50',
                'count': '50',
                'difference': '0'
            },
            {
                'prod_id': '3',
                'name': 'Gino tomato paste',
                'image': 'no_image.png',
                'app': '50',
                'count': '60',
                'difference': '-10'
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return 'Audit';
            case 1:
                return <AuditHistory setView={this.setStepContentView.bind(this)} auditDates={this.state.datesList} />
            case 2:
                return <AuditDetails setView={this.setStepContentView.bind(this)} products={this.state.productList} deleteProduct={this.deleteProduct.bind(this)} />
            case 3:
                return <Reconciliation />
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    deleteProduct = (pId , event) => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = [...this.state.productList];

                        const result = old_list.filter(item => item.prod_id !== pId);

                        this.setState({
                            productList: [...result],
                        });
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


    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

export default withRouter(Audit);