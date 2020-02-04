import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SectionNavbars from '../Components/Sections/SectionNavbars';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonalInformationSection from './Sections/PersonalInformationSection';
import ShopInformationSection from './Sections/ShopInformationSection';
import AccountInformationSection from './Sections/AccountInformationSection';
import "./Register.scss";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 33,
    },
    active: {
        '& $line': {
            backgroundColor:
                '#DAAB59',
        },
    },
    completed: {
        '& $line': {
            backgroundColor:
                '#DAAB59',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#FFF',
        zIndex: 1,
        color: '#eaeaf0',
        border: '3px solid #eaeaf0',
        width: 65,
        height: 65,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor:
            '#FFF',
        color: '#DAAB59',
        border: '3px solid #DAAB59',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor:
            '#FFF',
        color: '#DAAB59',
        border: '3px solid #DAAB59',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <PersonOutlineOutlinedIcon />,
        2: <StorefrontOutlinedIcon />,
        3: <PhoneAndroidOutlinedIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const newBtnStyles = withStyles({
    buttonC1: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
    },
})(props => <Button {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Personal', 'Shop', 'Account'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <PersonalInformationSection/>;
        case 1:
            return <ShopInformationSection/>;
        case 2:
            return <AccountInformationSection/>;
        default:
            return 'Complete';
    }
}

const Register = props => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFinish = () => {
        props.history.push('/verify_sms')
    };

    return (
        <div className={classes.root}>
            <SectionNavbars title="Create Account">
                <ArrowBackIcon/>
            </SectionNavbars>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length - 1 ? (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            p={1}
                            style={{ height: '2rem', position: "fixed", bottom:"0", width:"100%" }}
                        >
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px'}}
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                onClick={handleFinish}
                                className={classes.button}
                            >
                                Finish
                            </Button>
                        </Box>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            p={1}
                            style={{ height: '2rem', position: "fixed", bottom:"0", width:"100%" }}
                        >
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px'}}
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Next
                            </Button>
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
}

export default withRouter(Register);