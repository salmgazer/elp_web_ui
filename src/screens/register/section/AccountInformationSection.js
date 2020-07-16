import React, {useState , useEffect } from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PrimaryValidationField from "../../../components/Input/validationInput/PrimaryTextField";
import {green} from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import PrimaryPasswordField from "../../../components/Input/validationInput/PrimaryPasswordField";

const GreenCheckbox = withStyles({
    root: {
        textAlign: 'left',
        float: 'left',
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

export default function AccountInformationSection(props) {
    const [checkStatus , setCheckStatus] = useState(false);
    const [checkedB , setCheckedB] = useState(false);
    const userFields = props.formData;
    const dataValid = props.dataValid;

    const [formFields , setFormFields] = useState({
        username: userFields.username,
        password: userFields.password,
        passwordRepeat: userFields.passwordRepeat,
        checkedB: userFields.checkedB
    });

    const [stepError , setStepError] = useState({
        username: dataValid.username,
        password: dataValid.password,
        passwordRepeat: dataValid.passwordRepeat,
    });

    useEffect(() => {
        if (!checkStatus) {
            validForms();
            setCheckStatus(1);
        }
    });

    const handleChange = async (name , value) => {
        const { ...formData }  = formFields;
        formData[name] = value;
        setFormFields(formData);
        await props.collectData(name , value);
    };

    const handleFormValidation = async (name , value) => {
        const { ...formData }  = stepError;
        formData[name] = value;
        setStepError(formData);
        await props.validDataHandler(name , value);
    };

    const validForms = async () => {
        if(stepError.username && stepError.password && stepError.passwordRepeat){
            await props.isValid(false);
        }else{
            await props.isValid(true);
        }
    };

    const handleChangeChk = async(event) => {
        //setShowPassword({ ...showPassword, [name]: event.target.checked });
        setCheckedB(event.target.checked);

        if(event.target.checked === true){
            let f = userFields.phone;
            f = f.replace(/-/g , "");
            console.log(f)
            await props.collectData('username' , f);
        }else{
            props.collectData('username' , '');
            await props.validDataHandler('username' , '');
        }
    };

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                style={{paddingLeft: '0px'}}
                                checked={checkedB}
                                onChange={handleChangeChk}
                                value="checkedB"
                                color="default"
                                name="checkedB"
                            />
                        }
                        label="Use phone number to login"
                    />
                </Grid>

                <PrimaryValidationField
                    name="username"
                    label="Username"
                    required={true}
                    checkUsername={true}
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.username}
                />

                <PrimaryPasswordField
                    name="password"
                    label="Password"
                    required={true}
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.password}
                    values={[userFields.password , userFields.passwordRepeat]}
                />

                <PrimaryPasswordField
                    name="passwordRepeat"
                    label="Password Confirmation"
                    required={true}
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.passwordRepeat}
                    values={[userFields.password , userFields.passwordRepeat]}
                />
            </Grid>
        </Paper>
    );
}
