import React, {useState , useEffect} from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { ValidatorForm, TextValidator , SelectValidator} from 'react-material-ui-form-validator';
import Api from '../../../services/Api';

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


export default function ShopInformationSection(props) {
    const userFields = props.formData;
    const classes = useStyles();
    const [categories , setCategories] = useState([]);
    const [formFields , setFormFields] = useState({
        companyName: userFields.companyName,
        location: userFields.location,
        storeCategory: userFields.storeCategory,
    });

    const [state, setState] = useState({
        storeCaregory: '',
        name: 'Select a store type',
    });

    useEffect(() => {
        (
            async function getCategories(){
                let newCategory = await new Api('business_categories').index();
                setCategories(newCategory.data.data);
            }
        )();
    }, []);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleChangeHandler = (event) => {
        const { ...formData }  = formFields;
        //console.log(formData.firstName);
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
        props.collectData(event);
    };

    const handleFormValidation = (result) => {
        props.isValid(result);
    };

    const formRef = React.createRef('form');

    return (
        <Paper className={classes.paper} style={{'margin-bottom': '80px'}}>
            <ValidatorForm
                ref={formRef}
                onError={handleFormValidation}
                className={classes.root}
                instantValidate
            >
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Company name"
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
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Location"
                        required
                        variant="outlined"
                        name="location"
                        value={formFields.location}
                        onChange={handleChangeHandler}
                        validators={['required', 'minStringLength:3']}
                        errorMessages={['Location is a required field', 'Location should be more than 3']}
                        helperText=""
                        id="location"
                        validatorListener={handleFormValidation}
                    />
                </Grid>

                <Grid item xs={12} className={classes.margin}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                            Store Category:
                        </InputLabel>
                        <ValidationSelectField
                            native
                            onChange={handleChangeHandler}
                            value={formFields.storeCategory}
                            labelWidth={labelWidth}
                            inputProps={{
                                name: 'storeCategory',
                                id: 'storeCategory',
                            }}
                            className={classes.select}
                        >
                            <option value={0}>Select Category</option>
                            {categories.map((category) =>
                                <option value={category.id}>{category.name}</option>
                            )}
                        </ValidationSelectField>
                    </FormControl>
                </Grid>

                {/*<Grid item xs={12} className={classes.margin}>
                    <FormControl className={classes.margin} component="fieldset">
                        <FormLabel component="legend" className={classes.left}>Store type:</FormLabel>
                        <RadioGroup
                            className={classes.margin}
                            onChange={handleChangeHandler}
                            value={formFields.storeCategory}
                            aria-label="store_type"
                            name="customized-radios"
                            defaultValue="1"
                        >
                            <FormControlLabel value="1" control={<StyledRadio />} label="Retail" />
                            <FormControlLabel value="2" control={<StyledRadio />} label="Wholesale" />
                            <FormControlLabel value="3" control={<StyledRadio />} label="Both" />
                        </RadioGroup>
                    </FormControl>
                </Grid>*/}
            </ValidatorForm>
        </Paper>
    );
}
