import React from 'react';
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
})(TextField);

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


export default function ShopInformationSection() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        store_type: '',
        name: 'Select a store type',
    });

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

    return (
        <Paper className={classes.paper} style={{'margin-bottom': '80px'}}>
            <form className={classes.root} noValidate>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Store name"
                        required
                        variant="outlined"
                        defaultValue=""
                        id="storeName"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Location"
                        required
                        variant="outlined"
                        defaultValue=""
                        id="location"
                    />
                </Grid>

                <Grid item xs={12} className={classes.margin}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                            Store Category:
                        </InputLabel>
                        <ValidationSelectField
                            native
                            value={state.store_type}
                            onChange={handleChange('store_type')}
                            labelWidth={labelWidth}
                            inputProps={{
                                name: 'store_type',
                                id: 'storeCategory',
                            }}
                            className={classes.select}
                        >
                            <option value={10}>Drink Store</option>
                            <option value={20}>Pharmacy</option>
                            <option value={30}>Material</option>
                        </ValidationSelectField>
                    </FormControl>
                </Grid>

                <Grid item xs={12} className={classes.margin}>
                    <FormControl className={classes.margin} component="fieldset">
                        <FormLabel component="legend" className={classes.left}>Store type:</FormLabel>
                        <RadioGroup className={classes.margin} defaultValue="1" aria-label="store_type" name="customized-radios">
                            <FormControlLabel value="1" control={<StyledRadio />} label="Retail" />
                            <FormControlLabel value="2" control={<StyledRadio />} label="Wholesale" />
                            <FormControlLabel value="3" control={<StyledRadio />} label="Both" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </form>
        </Paper>
    );
}
