import React, {useState, useEffect, useRef} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Api from '../../../services/Api';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    select: {
        '&:before': {
            borderColor: '#DAAB59',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: '#DAAB59',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '95%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
        width: '90%',
        'text-align': 'center',
    },
    left: {
        'text-align': 'left',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: 'green',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
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

const ValidationSelectField = withStyles({
    root: {
        '& select:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& select:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& select:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& select:valid:focus + fieldset': {
            borderLeftWidth: 6,
            borderColor: '#DAAB59',
            padding: '4px !important', // override inline-style
        },
    },
})(Select);

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="primary"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const values = [
    {
      value: '2020',
      label: '2020',
    },
    {
      value: '2019',
      label: '2019',
    },
    {
      value: '2018',
      label: '2018',
    },
    {
      value: '2017',
      label: '2017',
    }
  ];

export default function ShopInformationSection(props) {
    const ShopInformationForm = useRef(null);
    const userFields = props.formData;
    const classes = useStyles();
    const [categories , setCategories] = useState([]);
    const [checkStatus , setCheckStatus] = useState(false);

    const [formFields , setFormFields] = useState({
        companyName: userFields.companyName,
        location: userFields.location,
        businessCategoryId: userFields.businessCategoryId,
        storeType: userFields.storeType,
    });

    /*useEffect(() => {
        (
            async function validateForm(){
                //let newCategory = await new Api('business_categories').index();
                props.isValid(await ShopInformationForm.current.isFormValid());
                console.log(props.isValid(await ShopInformationForm.current.isFormValid()));
            }
        )();
    });*/

    useEffect(() => {
        if (!checkStatus) {
            handleFormValidation();
            setCheckStatus(1);
        }
    });

    useEffect(() => {
        (
            async function getCategories(){
                //let newCategory = await new Api('business_categories').index();
                let newCategory = await new Api('business_categories').index();
                setCategories(newCategory.data.business_categories);
            }
        )();
    }, []);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChangeHandler = (event) => {
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
        props.collectData(event);
    };

    const handleFormValidation = async(result) => {
        props.isValid(await ShopInformationForm.current.isFormValid());
    };

    //handleFormValidation(true);

    return (
        <Paper className={classes.paper} style={{'marginBottom': '80px'}}>
            <ValidatorForm
                ref={ShopInformationForm}
                onError={handleFormValidation}
                className={classes.root}
                instantValidate
            >

                <Typography className="text-dark" style={{ fontSize: '17px', marginBottom: '10px' }} >
                    Enter the name of the store you work in
                </Typography>

                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Enter store name"
                        required
                        variant="outlined"
                        name="companyName"
                        value={formFields.companyName}
                        id="storeName"
                        onChange={handleChangeHandler}
                        validators={['required', 'minStringLength:3']}
                        errorMessages={['Company name is a required field', 'Company name should be more than 3']}
                        helperText=""
                        validatorListener={handleFormValidation}
                    />
                </Grid>

                <Typography className="text-dark" style={{ fontSize: '17px', marginBottom: '10px' }} >
                    or
                </Typography>

                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', textTransform: 'Capitalize'}}
                    //onClick={() => history.goBack()}
                >
                    Create shareable link
                </Button>

                <Grid item xs={12} className={classes.margin}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                            I am a/an:
                        </InputLabel>
                        <ValidationSelectField
                            native
                            onChange={handleChangeHandler}
                            value={formFields.businessCategoryId}
                            labelWidth={labelWidth}
                            inputProps={{
                                name: 'businessCategoryId',
                                id: 'businessCategoryId',
                            }}
                            className={classes.select}
                        >
                            <option values={0}>Select Category</option>
                            {values.map((value) =>
                                <option key={value.id} value={value.id}>{value.name}</option>
                            )}
                        </ValidationSelectField>
                    </FormControl>
                </Grid>

            </ValidatorForm>
        </Paper>
    );
}
