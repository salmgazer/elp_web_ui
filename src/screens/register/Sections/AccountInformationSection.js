import React, {useState , useEffect , useRef} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Api from "../../../services/Api";


const GreenCheckbox = withStyles({
    root: {
        color: '#333',
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        width: '90%',
        'text-align': 'center',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

const PasswordTextField = withStyles({
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

export default function AccountInformationSection(props) {
    const PersonalInformationForm = useRef(null);
    const [error , setError] = useState('none');
    const [errorMsg , setErrorMsg] = useState('');

    const userFields = props.formData;
    const [showPassword, setShowPassword] = useState({
        showPassword: false,
        checkedB: false,
    });

    const [formFields , setFormFields] = useState({
        username: userFields.username,
        password: userFields.password,
        passwordRepeat: userFields.passwordRepeat,
    });

    const checkPassword = (event) => {
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
        props.collectData(event);

        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { ...values } = props.formData;

            if (value !== formFields.password) {
                return false;
            }
            return true;
        });
    };

    const checkSameUsernamePassword = (event) => {
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
        props.collectData(event);

        ValidatorForm.addValidationRule('isUsernamePasswordMatch', (value) => {
            const { ...values } = props.formData;
console.log(value , formFields.username)
            if (value == formFields.username) {
                return false;
            }
            return true;
        });
    };

    const handleChangeChk = name => async (event) => {
        setShowPassword({ ...showPassword, [name]: event.target.checked });

        if(event.target.checked === true){
            const { ...formData }  = formFields;

            let f = userFields.phone;

            f = f.replace(/-/g , "");

            formData['username'] = f;
            /*if (event.target.name === 'password') {
                this.form.isFormValid(false);
            }*/
            const {...fakeEvent} = event;
            fakeEvent.target.name = "username";
            fakeEvent.target.value = f;

            //await usernameFormatter(fakeEvent);
            /*setFormFields(formData);
            props.collectData(fakeEvent);*/
            await usernameFormatter(fakeEvent);
            /*ValidatorForm.addValidationRule('isUsernamePasswordMatch', (value) => {
                const { ...values } = props.formData;

                if (value == formFields.password) {
                    return false;
                }
                return true;
            });*/
        }else{
            const { ...formData }  = formFields;

            formData['username'] = '';
            /*if (event.target.name === 'password') {
                this.form.isFormValid(false);
            }*/

            const {...fakeEvent} = event;
            fakeEvent.target.name = "username";
            fakeEvent.target.value = '';
            setFormFields(formData);
            props.collectData(fakeEvent);
        }

    };

    const handleClickShowPassword = () => {
        setShowPassword({ ...showPassword, showPassword: !showPassword.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const usernameFormatter = async (event) => {
        event.target.value = ((event.target.value).replace(" " , "")).toLowerCase();
        handleChange(event);

        setError('none');
        setErrorMsg('');

        const userData = {
            username: event.target.value
        };

        try{
            let response = await new Api('others').index(
                {},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/users/exists?username=${userData.username}`,
                {},
            );

            if(response.data.valid === false){
                props.isValid(false);
                setError('block');
                setErrorMsg('Username exists in database. Use another username');
            }else{
                setError('none');
                setErrorMsg('');
            }
        } catch (error) {
            console.log('Could not check username. Please enter again!');
        }

    };

    const handleChangeHandler = (event) => {
        const { ...formData }  = formFields;
        //console.log(formData.firstName);
        formData[event.target.name] = event.target.value;
        /*if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }*/

        setFormFields(formData);
        props.collectData(event);
    };

    const handleChange = (event) => {
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
        props.collectData(event);
    };

    const handleFormValidation = async (result) => {
        props.isValid(await PersonalInformationForm.current.isFormValid());
    };

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <ValidatorForm
                ref={PersonalInformationForm}
                onError={handleFormValidation}
                className={classes.root}
                instantValidate
            >
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                style={{paddingLeft: '0px'}}
                                checked={showPassword.checkedB}
                                onChange={handleChangeChk('checkedB')}
                                value="checkedB"
                                color="success"
                                name="checkedB"
                            />
                        }
                        label="Use phone number to login"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Username"
                        required
                        variant="outlined"
                        name="username"
                        validatorListener={handleFormValidation}
                        onChange={usernameFormatter}
                        value={formFields.username}
                        validators={['required', 'minStringLength:3']}
                        errorMessages={['Username is a required field', 'The minimum length for username is 3']}
                        helperText=""
                        id="username"
                    />

                    <span style={{display: `${error}` , color: 'red' , fontSize: '10px' , textAlign: 'center'}}>{errorMsg}</span>
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Password"
                        required
                        variant="outlined"
                        name="password"
                        validatorListener={handleFormValidation}
                        onChange={checkSameUsernamePassword}
                        value={formFields.password}
                        validators={['required', 'minStringLength:4' , 'isUsernamePasswordMatch']}
                        errorMessages={['Password is a required field', 'The minimum length for password is 4' , 'Username and password can not be same']}
                        helperText=""
                        id="password"
                        type={showPassword.showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                    {showPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>

                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Confirm password"
                        required
                        variant="outlined"
                        name="passwordRepeat"
                        validatorListener={handleFormValidation}
                        id="passwordConfirm"
                        type={showPassword.showPassword ? 'text' : 'password'}
                        value={formFields.passwordRepeat}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['Password confirmation is a required field', 'passwords do not match']}
                        helperText=""
                        onChange={checkPassword}
                    />
                </Grid>

                {/*<Grid item xs={12}>
                    <FakeFormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <PasswordTextField
                            id="password"
                            type={showPassword.showPassword ? 'text' : 'password'}
                            value={formFields.password}
                            validators={['required', 'minStringLength:4']}
                            errorMessages={['Password is a required field', 'The minimum length for password is 4']}
                            helperText=""
                            required
                            name="password"
                            onChange={handleChangeHandler}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FakeFormControl>
                </Grid>*/}
                {/*<Grid item xs={12}>
                    <FakeFormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                        <PasswordTextField
                            id="passwordConfirm"
                            type={showPassword.showPassword ? 'text' : 'password'}
                            value={formFields.passwordRepeat}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={['Password confirmation is a required field', 'password mismatch']}
                            helperText=""
                            onChange={handleChangeHandler}
                            name="passwordRepeat"
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FakeFormControl>
                </Grid>*/}
            </ValidatorForm>
        </Paper>
    );
}
