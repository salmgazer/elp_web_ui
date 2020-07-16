import React, {useState, useEffect, useRef} from "react";
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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Api from "../../../services/Api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import PrimaryValidationField from "../../../components/Input/validationInput/PrimaryTextField";
import PrimaryLoader from "../../../components/Loader/Loader";
import PrimaryPasswordField from "../../../components/Input/validationInput/PrimaryPasswordField";

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

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            borderColor: '#DAAB59',
            padding: '4px !important', // override inline-style
        },
    },
})(TextValidator);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPassword = props => {
    const { history } = props;
    const classes = useStyles();
    const [checkStatus , setCheckStatus] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formFields , setFormFields] = useState({
        password: "",
        passwordRepeat: ""
    });
    const [btnState , setBtnState] = useState(false);

    const [stepError , setStepError] = useState({
        password: false,
        passwordRepeat: false,
    });

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

    const submit = async () => {
        setBtnState(true);
        const userData = {
            userId: localStorage.getItem('randomId'),
            otp: localStorage.getItem('userOTP'),
            password: formFields.password,
        };

        try{
            let response = await new Api('others').update(
                userData,
                {},
                {},
                `https://${Api.apiDomain()}/v1/client/users/reset_password`,
            );

            setSuccessMsg('Your password has been changed successfully. Please login to your account');
            setSuccessDialog(true);

            setTimeout(function(){
                setSuccessDialog(false);
            }, 2000);

            history.push(paths.login);
        } catch (error) {
            document.getElementById("loginForm").reset();
            setErrorMsg('Could not send code. Please enter again!');
            setErrorDialog(true);
        }

        setBtnState(false);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
        setSuccessDialog(false);
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <React.Fragment>
                <CssBaseline />

                <Container maxWidth="sm">
                    <Typography
                        variant="h6"
                        component="p"
                        className={`text-dark mt-3 font-weight-bold`}
                        style={{fontSize: '22px' , textAlign: 'center', width: '100%', margin: '0 auto' }}
                    >
                        Change password
                    </Typography>
                    <Box component="div" m={2} style={{paddingTop: '0px'}}>
                        <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                    </Box>
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

                    <Grid container spacing={3} className={`px-4 mt-2`}>
                        <PrimaryPasswordField
                            name="password"
                            label="Password"
                            required={true}
                            setValue={handleChange}
                            setValid={handleFormValidation}
                            value={formFields.password}
                            values={[formFields.password , formFields.passwordRepeat]}
                        />

                        <PrimaryPasswordField
                            name="passwordRepeat"
                            label="Password Confirmation"
                            required={true}
                            setValue={handleChange}
                            setValid={handleFormValidation}
                            value={formFields.passwordRepeat}
                            values={[formFields.password , formFields.passwordRepeat]}
                        />

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px' , textAlign: 'center'}}
                            onClick={submit}
                            className={`${classes.button} mx-auto mt-2 mb-5`}
                            disabled={!(stepError.passwordRepeat && stepError.password) || btnState}
                        >
                            {
                                btnState ?
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

export default withRouter(ResetPassword);
