import React , {useState} from "react";
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
import Box from '@material-ui/core/Box';
import paths from "../../utilities/paths";
import SectionNavbars from '../../components/Sections/SectionNavbars';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AuthService from '../../services/AuthService';
import "./Register.scss";
import SimpleSnackbar from "../../components/Snackbar/SimpleSnackbar";
import PrimaryLoader from "../../components/Loader/Loader";
import LocalInfo from "../../services/LocalInfo";
import format from "date-fns/format";
import Api from "../../services/Api";
import PersonalInformationSection from "./section/PersonalInformationSection";
import ShopInformationSection from "./section/ShopInformationSection";
import AccountInformationSection from "./section/AccountInformationSection";

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
        color: '#0000002e',
        border: '3px solid #0000002e',
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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

function getSteps() {
    return ['Personal', 'Company', 'Account'];
}

const Register = props => {
    const { history } = props;
    const [loading , setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [data , setData] = useState({
        firstName: '',
        otherNames: '',
        phone: '',
        companyName: '',
        location: '',
        businessCategoryId: 0,
        storeType: 'Retail',
        username: '',
        password: '',
        passwordRepeat: '',
        isValid: false,
        checkedB: false,
    });

    const [isValid , setIsValid] = useState(false);

    const [dataValid , setDataValid] = useState({
        firstName: false,
        otherNames: false,
        phone: false,
        companyName: false,
        location: false,
        businessCategoryId: false,
        storeType: true,
        username: false,
        password: false,
        passwordRepeat: false,
    });

    /*@todo
    * change state for password and confirm password...
    * */
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <PersonalInformationSection isValid={formValidHandler} validDataHandler={validDataHandler} formData={data} dataValid={dataValid} collectData={formDataHandler}/>;
            case 1:
                return <ShopInformationSection isValid={formValidHandler} validDataHandler={validDataHandler} formData={data} dataValid={dataValid} collectData={formDataHandler}/>;
            case 2:
                return <AccountInformationSection isValid={formValidHandler} validDataHandler={validDataHandler} formData={data} dataValid={dataValid} collectData={formDataHandler}/>;
            default:
                return 'Complete';
        }
    }

    const formValidHandler = (result) => {
        setIsValid(result);
    };

    const formDataHandler = async (name , value) => {
        const { ...formData }  = data;

        formData[name] = value;

        setData(formData);
    };

    const validDataHandler = async (name , value) => {
        const { ...formData }  = dataValid;

        formData[name] = value;

        setDataValid(formData);

        if(activeStep === 0){
            if(formData.firstName && formData.otherNames && formData.phone){
                setIsValid(false);
            }else {
                setIsValid(true);
            }
        }else if (activeStep === 1){
            if(formData.companyName && formData.location && formData.businessCategoryId && formData.storeType){
                setIsValid(false);
            }else {
                setIsValid(true);
            }
        }else if (activeStep === 2){
            if(formData.username && formData.passwordRepeat && formData.password){
                setIsValid(false);
            }else {
                setIsValid(true);
            }
        }
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleFinish = async() => {
        setLoading(true);

        let req = await new AuthService().register(data);

        if(!req.error){
            /*
            * @todo
            * push user details to watermelon...
            * */
            localStorage.setItem('userContact' , req.user.phone);
            localStorage.setItem('userOTP' , req.user.otp);
            localStorage.setItem('firstName' , req.user.firstName);
            LocalInfo.setWorkingDate(format(new Date(), 'MM/dd/yyyy'));
            localStorage.setItem('workingDate' , format(new Date(), 'MM/dd/yyyy'));

            const params = {
                "phone" : localStorage.getItem('userContact'),
                "password" : localStorage.getItem('randomString'),
                "otp" : req.user.otp,
            };

            try {
                let user = await new Api('others').update(
                    params,
                    {},
                    {},
                    `https://${Api.apiDomain()}/v1/client/users/verify`,
                );

                if(user){
                    localStorage.setItem('accessToken' , user.data.token);
                    localStorage.removeItem('randomString');
                    localStorage.removeItem('userOTP');
                    setTimeout(function(){
                        setLoading(false);
                        localStorage.removeItem('isRegistering');
                        history.push(paths.get_started);
                    }, 2000);
                }
            }catch (error) {
                setErrorMsg('Something went wrong trying to log in.');
                setErrorDialog(true);
                setLoading(false);

                console.log(error)
            }

        }else{
            setLoading(false);
            await setErrorDialog(true);
            await setErrorMsg(req.error.msg);

            return setTimeout(function(){
                setErrorDialog(false);
            }, 3000);
        }

        //history.push(paths.verify_sms);
    };

    return (
        <div className={classes.root}>
            <SectionNavbars
                title="Create Account"
                leftIcon={
                    <div>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftOnClick={() => history.goBack()}
            >
            </SectionNavbars>

            <SimpleSnackbar
                type="warning"
                openState={errorDialog}
                message={errorMsg}
            />

            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                style={{marginTop: '40px'}}
            >
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length - 1 ? (
                    <div>
                        <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            p={1}
                            style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
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
                                disabled={isValid || loading}
                            >
                                {
                                    loading ?
                                        <PrimaryLoader
                                            style={{width: '30px' , minHeight: '2.5rem'}}
                                            color="#FFFFFF"
                                            type="Oval"
                                            className={`mt-1`}
                                            width={25}
                                            height={25}
                                        />
                                        :
                                        'Finish'
                                }
                            </Button>
                        </Box>
                    </div>
                ) : (
                    <div>
                        <div
                            className={classes.instructions}
                        >
                            {getStepContent(activeStep)}
                        </div>
                        <Box
                            boxShadow={2}
                            bgcolor="background.paper"
                            p={1}
                            style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                        >
                            {activeStep === 0 ? '' :
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px'}}
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                            }
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                onClick={handleNext}
                                className={classes.button}
                                disabled={isValid}
                            >
                                Next
                            </Button>
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withRouter(Register);
