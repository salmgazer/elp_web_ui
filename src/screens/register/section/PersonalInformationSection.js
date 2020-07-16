import React, {useState, useEffect} from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PrimaryValidationField from "../../../components/Input/validationInput/PrimaryTextField";

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

export default function PersonalInformationSection(props) {
    //const PersonalInformationForm = useRef(null);
    //const [error , setError] = useState('none');
    //const [errorMsg , setErrorMsg] = useState('');
    const [checkStatus , setCheckStatus] = useState(false);
    const userFields = props.formData;
    const dataValid = props.dataValid;

    const classes = useStyles();

    const [formFields , setFormFields] = useState({
        firstName: userFields.firstName,
        otherNames: userFields.otherNames,
        phone: userFields.phone,
    });

    const [stepError , setStepError] = useState({
        firstName: dataValid.firstName,
        otherNames: dataValid.otherNames,
        phone: dataValid.phone
    });

    useEffect(() => {
        if (!checkStatus) {
            validForms();
            setCheckStatus(1);
        }
    });

    const validForms = async () => {
        if(stepError.firstName && stepError.otherNames && stepError.phone){
            await props.isValid(false);
        }else{
            await props.isValid(true);
        }
    };

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

    return (
        <Paper className={`${classes.paper}`}>
            <Grid container spacing={1}>
                <PrimaryValidationField
                    name="firstName"
                    label="First name"
                    required={true}
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.firstName}
                />

                <PrimaryValidationField
                    name="otherNames"
                    label="Other names"
                    required={true}
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.otherNames}
                />

                <PrimaryValidationField
                    name="phone"
                    label="Phone number"
                    pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                    required={true}
                    checkUserPhone={true}
                    type="tel"
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.phone}
                />
            </Grid>
        </Paper>
    );
}
