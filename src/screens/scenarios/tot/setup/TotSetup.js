import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
// import Container from '@material-ui/core/Container';
import Step1 from "./sections/Step1";
import Step2 from "./sections/Step2";
import Step3 from "./sections/Step3";
import Step4 from "./sections/Step4";
import Step5 from "./sections/Step5";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

const TotSetup = props => {
    const [activeStep , setActiveStep] = React.useState(4);
    let currentPathname = null;
    let currentSearch = null;

    /*
    * Prevent user from going back
    * */
    useEffect(() => {
        const { history } = props;

        history.listen((newLocation, action) => {
            if (action === "PUSH") {
                if (
                    newLocation.pathname !== currentPathname ||
                    newLocation.search !== currentSearch
                ) {
                    currentPathname = newLocation.pathname;
                    currentSearch = newLocation.search;

                    history.push({
                        pathname: newLocation.pathname,
                        search: newLocation.search
                    });
                }
            } else {
                history.go(1);
            }
        });
    }, []);

    const setStepContentView = step => {
        setActiveStep(step);
    };

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <Step1 step={setStepContentView.bind(this)} />;
            case 1:
                return <Step2 step={setStepContentView.bind(this)} />;
            case 2:
                return <Step3 step={setStepContentView.bind(this)} />;
            case 3:
                return <Step4 step={setStepContentView.bind(this)} />;
            case 4:
                return <Step5 step={setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '90vh' }}>
            
                {getStepContent(activeStep)}
          
        </div>
    );
};

export default withRouter(TotSetup);
