import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    base: {
        width: '100%',
        marginTop: '10px',
    },
    margin: {
        margin: theme.spacing(1),
        width: '90%',
        'text-align': 'center',
    },
    left: {
        'text-align': 'left',
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

const PrimaryRadioGroup = (props) => {
    const [value , setValue] = useState(props.value);

    const handleChangeHandler = (event) => {
        setValue(event.target.value);
        //const result = new ValidationService().validateOne(event.target.name , event.target.value);

        props.setValue(event.target.name , event.target.value);
        props.setValid(event.target.name , true);

        /*if(result === undefined){
            setError(false);
            setValid(true);
            setErrorMsg('');


        }else{
            setValid(false);
            setError(true);
            setErrorMsg(addLineBreaks(result));
            props.setValue(event.target.name , event.target.value);
            props.setValid(event.target.name , false);
        }*/
    };

    const classes = useStyles();
    const items = props.values || [];

    return (
        <Grid item xs={12} className={classes.base}>
            <FormControl className={classes.base} component="fieldset">
                <FormLabel component="legend" className={classes.left}>{props.label}</FormLabel>
                <RadioGroup
                    className={classes.margin}
                    onChange={handleChangeHandler}
                    value={value}
                    name={props.name}
                >
                    {
                        items.map((item , index) =>
                            <FormControlLabel key={index} value={item.value} control={<StyledRadio />} label={item.label} />

                    )}
                </RadioGroup>
            </FormControl>
        </Grid>
    );
};

export default PrimaryRadioGroup;
