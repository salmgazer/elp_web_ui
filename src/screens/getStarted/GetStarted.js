import React from 'react';
import {makeStyles} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import './GetStarted.scss';
import ViewWelcome from "./sections/ViewWelcome";
import ViewStore from "./sections/ViewStore";
import MainView from "../onboarding/addProducts/sections/MainView";
import AddProductView from "../onboarding/addProducts/sections/AddProductView";
import AddedProductView from "../onboarding/addProducts/sections/AddedProductView";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

/*const ViewControl = props => {
    if(props.isStore){
        return <ViewStore/>;
    }

    return <ViewWelcome username={props.username}/>;
};*/

const GetStarted = props => {
    const [isStore , setIsStore] = React.useState(false);
    const [activeStep , setActiveStep] = React.useState(0);

    //Temporary name for firstname for user..
    const username = localStorage.getItem('userFirstName');

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
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <Container maxWidth="sm" p={0}>
                {getStepContent(activeStep)}
            </Container>
        </div>
    );
};

export default GetStarted;