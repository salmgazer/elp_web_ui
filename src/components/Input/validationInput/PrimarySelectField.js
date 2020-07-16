import React, {useState, useRef, useEffect} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ValidationService from "../../../services/ValidationService";
import {makeStyles} from "@material-ui/core";
import WarningIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles({
    formControl: {
        margin: '2px',
        width: `100% !important`,
        textAlign: 'left !important',
    },

    formControlError: {
        margin: '2px',
        width: `100% !important`,
        textAlign: 'left !important',

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
                borderWidth: 2,
            },
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& fieldset': {
                borderColor: `red !important`,
                borderWidth: 2,
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            }
        },
    },

    formControlValid: {
        margin: '2px',
        width: `100% !important`,
        textAlign: 'left !important',

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderWidth: 2,
                borderColor: 'green',
            },
        },

        '& .MuiOutlinedInput-root.Mui-focused': {
            '& fieldset': {
                borderColor: `green !important`,
                borderWidth: 2,
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            }
        },
    },
});

const PrimarySelectField = (props) => {
    const [value , setValue] = useState(0);
    const [error , setError] = useState(false);
    const [valid , setValid] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    const [labelWidth, setLabelWidth] = React.useState(0);
    const inputLabel = React.useRef(null);

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
            const result = new ValidationService().validateOne(props.name , props.value);

            if(result === undefined){
                setError(false);
                setValid(true);
                setErrorMsg('');
            }else{
                setValid(false);
                setError(true);
                setErrorMsg(addLineBreaks(result));
            }
        }
    });


    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const inputRef = useRef();

    const validateField = (event) => {
        setValue(event.target.value);
        const result = new ValidationService().validateOne(event.target.name , event.target.value);

        if(result === undefined){
            setError(false);
            setValid(true);
            setErrorMsg('');

            props.setValue(event.target.name , event.target.value);
            props.setValid(event.target.name , true);
        }else{
            setValid(false);
            setError(true);
            setErrorMsg(addLineBreaks(result));
            props.setValue(event.target.name , event.target.value);
            props.setValid(event.target.name , false);
        }
    };

    const addLineBreaks = errors => {
        return errors.map((error, index) => (
            <React.Fragment key={`${error}-${index}`}>
                <WarningIcon
                    style={{
                        fontSize: '12px',
                        //paddingRight: '10px',
                    }}
                />
                <span style={{
                    paddingTop: '2px'
                }}>
                    {error}
                </span>

                <br />
            </React.Fragment>
        ));
    };

    const classes = useStyles();
    const items = props.values || [];

    return (
        <Grid className={`mt-2`} item xs={12}>
            <FormControl variant="outlined" className={valid ? classes.formControlValid : errorMsg ? classes.formControlError : classes.formControl}>
                <InputLabel ref={inputLabel}>{props.label}</InputLabel>
                <Select
                    value={value}
                    onChange={validateField}
                    variant="outlined"
                    inputProps={{
                        name: props.name,
                        id: props.selectId,
                    }}
                    labelWidth={labelWidth}
                >
                    <MenuItem value={0} key={0}>
                        {props.defaultValue}
                    </MenuItem>
                    {
                        items.map((item) =>
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )}
                </Select>

                <FormHelperText style={{color: 'red'}}>{error ? errorMsg : ''}</FormHelperText>
            </FormControl>
        </Grid>
    )
};

export default PrimarySelectField;
