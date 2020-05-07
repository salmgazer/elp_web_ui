import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import YearView from './YearView';
import DateToggle from "../../../../components/DateToggle/DateToggle";


class SortDate extends Component{
    state={
        activeStep: 0,
        pageName: false,
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
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
                <DateToggle
                    setView={this.setStepContentView.bind(this)}
                />
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

export default withRouter(SortDate);