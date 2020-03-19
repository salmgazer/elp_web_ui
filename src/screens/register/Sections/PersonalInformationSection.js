import React, {useState , useRef , useEffect } from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import phoneFormat from '../../../services/phoneFormatter';

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

export default function PersonalInformationSection(props) {
    const PersonalInformationForm = useRef(null);

    const userFields = props.formData;
    const classes = useStyles();
    const [formFields , setFormFields] = useState({
        firstName: userFields.firstName,
        otherNames: userFields.otherNames,
        phone: userFields.phone,
    });

    const handleChange = async(event) => {
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
        props.collectData(event);
    };

    const handleFormValidation = async(result) => {
        props.isValid(await PersonalInformationForm.current.isFormValid());
    };

    /*
    * Add dashes to contact
    * */
    const addDashes = event => {
        if(event.target.value.length <= 12){
            event.target.value = phoneFormat(event.target.value);
            handleChange(event);
            return true;
        }

        return false;
    };

    return (
        <Paper className={`${classes.paper}`}>
            <ValidatorForm
                ref={PersonalInformationForm}
                className={classes.root}
                instantValidate
            >
                <Grid item xs={12}>
                    <ValidationTextField
                        onChange={handleChange}
                        className={classes.margin}
                        label="First name"
                        name="firstName"
                        required
                        variant="outlined"
                        id="firstName"
                        value={formFields.firstName}
                        validators={['required', 'minStringLength:2']}
                        errorMessages={['first name is a required field', 'The minimum length for first name is 2']}
                        helperText=""
                        validatorListener={handleFormValidation}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        onChange={handleChange}
                        name="otherNames"
                        className={classes.margin}
                        label="Other names"
                        required
                        variant="outlined"
                        id="otherNames"
                        validatorListener={handleFormValidation}
                        value={formFields.otherNames}
                        validators={['required', 'minStringLength:2']}
                        errorMessages={['Other names is a required field', 'The minimum length for other name is 2']}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        onChange={addDashes}
                        name="phone"
                        label="Phone number"
                        required
                        type="tel"
                        validatorListener={handleFormValidation}
                        pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                        variant="outlined"
                        id="phone_input"
                        validators={['required', 'minStringLength:12' , 'maxStringLength:12']}
                        errorMessages={
                            [
                                'Contact is a required field',
                                'The minimum length for contact is 10' ,
                                'The maximum length for contact is 10'
                            ]
                        }
                        value={formFields.phone}
                    />
                </Grid>
            </ValidatorForm>
        </Paper>
    );
}
