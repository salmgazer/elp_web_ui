import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import OwnerMainPage from './owner/OwnerMainPage';
import CollectionHistory from './owner/CollectionHistory';
import AddCollection from "./owner/addCollection";
import CashflowService from "../../services/CashflowService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import LocalInfo from "../../services/LocalInfo";
import Cashflow from "../../models/cashflow/Cashflow";
import getUnixTime from 'date-fns/getUnixTime';
import format from "date-fns/format";
import AddCollectionOwner from "./owner/addCollectionOwner";
import AttendantMainPage from "./owner/AttendantMainPage";
import BranchService from "../../services/BranchService";
const day = format(new Date() , 'MM/dd/yyyy');
const selectedDay = format(new Date(localStorage.getItem('collectionDate')) , 'MM/dd/yyyy');

class Owner extends Component {
    state={
        //activeStep: LocalInfo.branchRole === 'owner' && parseInt(localStorage.getItem('employees')) > 0 ? 0 : 4,
        activeStep: LocalInfo.branchRole === 'owner' ? 0 : 4,
        todayCollection:[],
        pendingCollection:[],
        collections: [],
        branchDetails: {
            total: 0,
            profit: 0,
            credit: 0,
            purchases: 0,
        },
        selectedDate: day,
        dateCollections: []
    };

    async componentDidMount() {
        const { history, database , todayCollection , pendingCollection , collections , dateCollections} = this.props;

        console.log(dateCollections)
        await this.setState({
            todayCollection: todayCollection,
            pendingCollection: pendingCollection,
            collections: collections,
            branchDetails: await new BranchService().getSalesDetails('today'),
            dateCollections: dateCollections,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , todayCollection , pendingCollection , collections , dateCollections} = this.props;

        if(collections.length !== prevProps.collections.length || todayCollection.length !== prevProps.todayCollection.length || pendingCollection.length !== prevProps.pendingCollection.length){
            await this.setState({
                todayCollection: todayCollection,
                pendingCollection: pendingCollection,
                collections: collections,
                branchDetails: await new BranchService().getSalesDetails('today'),
                dateCollections: dateCollections,
            });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <OwnerMainPage branchDetails={this.state.branchDetails} disapproveCollection={this.disapproveCollection.bind(this)} approveCollection={this.approveCollection.bind(this)} setView={this.setStepContentView.bind(this)} pendingCollection={this.state.todayCollection} collection={this.state.pendingCollection} />;
            case 1:
                return <CollectionHistory changeCollectionDate={this.changeCollectionDate.bind(this)} disapproveCollection={this.disapproveCollection.bind(this)} approveCollection={this.approveCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.dateCollections} />;
            case 2:
                return <AddCollection  branchDetails={this.state.branchDetails} addNewCollection={this.addNewCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.pendingCollection} />;
            case 3:
                return <AddCollectionOwner changeCollectionDate={this.changeCollectionDate.bind(this)} branchDetails={this.state.branchDetails} addNewCollection={this.addNewCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.pendingCollection} />;
            case 4:
                return <AttendantMainPage addNewCollection={this.addNewCollection.bind(this)} branchDetails={this.state.branchDetails} disapproveCollection={this.disapproveCollection.bind(this)} approveCollection={this.approveCollection.bind(this)} setView={this.setStepContentView.bind(this)} pendingCollection={this.state.todayCollection} collection={this.state.pendingCollection} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async changeCollectionDate(day){
        localStorage.setItem('collectionDate' , format(new Date(day), 'MM/dd/yyyy'));

        this.setState({
            selectedDate: format(new Date(day), 'MM/dd/yyyy')
        });
    }

    async addNewCollection(formFields){
        try {
            const response = await CashflowService.addCollection(formFields);

            if(response){
                return response;
            }else {
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    }

    async approveCollection(id){
        try {
            const response = await CashflowService.approveCollection(id);

            if(response){
                return response;
            }else {
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    }

    async disapproveCollection(id){
        try {
            const response = await CashflowService.disapproveCollection(id);

            if(response){
                /*await this.setState({
                    todayCollection: await CashflowService.getTodayCollections(),
                    pendingCollection: await CashflowService.getTodayPendingCollections()
                });*/
                return response;
            }else {
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    }

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

const EnhancedOwner = withDatabase(
    withObservables(['todayCollection' , 'pendingCollection' , 'collections' , 'dateCollections'], ({ database , todayCollection, pendingCollection , collections , dateCollections }) => ({
        todayCollection: database.collections.get(Cashflow.table).query(
            Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
        ).observe(),
        pendingCollection: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getUnixTime(new Date(day)))
        ).observe(),
        collections: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
        ).observe(),
        dateCollections: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getUnixTime(new Date(selectedDay)))
        ).observe(),
    }))(withRouter(Owner))
);

export default withRouter(EnhancedOwner);
