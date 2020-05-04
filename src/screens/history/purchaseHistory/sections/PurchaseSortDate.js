import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import YearView from './YearView';
import DateToggle from "../../../../components/DateToggle/DateToggle";


class SortDate extends Component{

    state={
        activeStep: 0,
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} pageName="Purchased items" />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName="Purchased items" />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName="Purchased items" />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName="Purchased items" />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async componentDidUpdate(prevProps) {
        const {...props} = this.props;

        if(prevProps.activeStep !== props.activeStep){
            console.log('me')
        }
    }


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