import React , {useState} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link, withRouter} from "react-router-dom";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../forgotPassword.scss';

import confirmImg from '../../../assets/img/forgot.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../utilities/paths";
import Api from "../../../services/Api";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import PrimaryValidationField from "../../../components/Input/validationInput/PrimaryTextField";
import PrimaryLoader from "../../../components/Loader/Loader";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
}));

const ForgotPassword = props => {
    // const { history } = props;
    const [successDialog, setSuccessDialog] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorDialog, setErrorDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [formFields , setFormFields] = useState({
        phone: "",
    });

    const [stepError , setStepError] = useState({
        phone: false
    });


    const classes = useStyles();

    //Logic for sending SMS
    const submit = async () => {
        setLoading(true);
        localStorage.setItem('userContact' , formFields.phone);

        try{
            let response = await new Api('others').index(
                {},
                {},
                `https://${Api.apiDomain()}/v1/client/users/verify_password_reset?phone=${formFields.phone}`,
                {}
            );

            setSuccessMsg('Your verification code has been sent.');
            setSuccessDialog(true);

            localStorage.setItem('userOTP' , response.data.otp);
            localStorage.setItem('randomId' , response.data.userId);
            setTimeout(function(){
                props.setView(1);
                setSuccessDialog(false);
            }, 2000);


        } catch (error) {
            setErrorMsg('Could not send code. Please enter again!');
            setErrorDialog(true);
        }
        setLoading(false);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };

    const handleChange = async (name , value) => {
        const { ...formData }  = formFields;
        formData[name] = value;
        setFormFields(formData);
    };

    const handleFormValidation = async (name , value) => {
        const { ...formData }  = stepError;
        formData[name] = value;
        setStepError(formData);
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <React.Fragment>
                <CssBaseline />
                <SimpleSnackbar
                    type="success"
                    openState={successDialog}
                    message={successMsg}
                />

                <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity="error">
                        {errorMsg}
                    </Alert>
                </Snackbar>

                <Container maxWidth="sm">
                    <Typography
                        variant="h6"
                        component="p"
                        className={`text-dark mt-3 font-weight-bold`}
                        style={{fontSize: '22px' , textAlign: 'center', width: '100%', margin: '0 auto' }}
                    >
                        Forgot password
                    </Typography>
                    <Box component="div" m={2} style={{paddingTop: '0px'}}>
                        <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                    </Box>

                    <Typography
                        variant="h6"
                        component="p"
                        className={`text-dark`}
                        style={{fontSize: '18px' , textAlign: 'center', width: '80%', margin: '0 auto' }}
                    >
                        Enter phone number you used to create your account
                    </Typography>

                    <Grid container spacing={3} className={`px-4 mt-2`}>
                        <PrimaryValidationField
                            name="phone"
                            label="Phone number"
                            pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                            required={true}
                            type="tel"
                            setValue={handleChange}
                            setValid={handleFormValidation}
                            value={formFields.phone}
                        />

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px' , textAlign: 'center'}}
                            onClick={submit}
                            className={`${classes.button} mx-auto mt-2 mb-5`}
                            disabled={!stepError.phone || loading}
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
                                    'Submit'
                            }
                        </Button>
                    </Grid>

                    <Link
                        to={paths.login}
                        className={`text-dark mt-3`}
                        style={{'marginTop': '20px', fontSize: '20px' , textDecorationColor: '#333333'}}
                    >
                            Back to login screen
                    </Link>
                    <br/>

                </Container>
            </React.Fragment>
        </div>
    );
};

export default withRouter(ForgotPassword);
