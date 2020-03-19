import React from 'react';
import {makeStyles} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import './GetStarted.scss';
import ViewWelcome from "./sections/ViewWelcome";
import ViewStore from "./sections/ViewStore";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

const GetStarted = props => {
    const [isStore , setIsStore] = React.useState(false);
    const [activeStep , setActiveStep] = React.useState(0);

    //Temporary name for firstname for user..
    const username = localStorage.getItem('firstName');

    //Steps to select category
    const getSteps = () => {
        return ['Welcome View' , 'Add Product View'];
    };

    const changeStep = () => {
        setActiveStep(1);
    };

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <ViewWelcome step={changeStep.bind(this)} username={username}/>;
            case 1:
                return <ViewStore/>;
            default:
                return 'Complete';
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '90vh' }}>
            <Container maxWidth="sm" p={0}>
                {getStepContent(activeStep)}
            </Container>
        </div>
    );
};

export default GetStarted;