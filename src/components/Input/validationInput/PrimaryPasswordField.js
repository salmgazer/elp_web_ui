import React, {useState, useRef, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid/Grid";
import ValidationService from "../../../services/ValidationService";
import WarningIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const useStyles = makeStyles({
    success: {
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: `green !important`,
                borderWidth: 2,
            }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: `green !important`,
                borderWidth: 2,
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            }
        },
    },
    error: {
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: `red !important`,
                borderWidth: 2,
            }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: `red !important`,
                borderWidth: 2,
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            }
        },
    },
    root: {
        '& input:valid:focus + fieldset': {
            borderColor: `red !important`,
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
        '& input:invalid:focus + fieldset': {
            borderColor: `red !important`,
            padding: '4px !important', // override inline-style
        },
    }
});

const PrimaryPasswordField = (props) => {
    const [value , setValue] = useState("");
    const [showPassword , setShowPassword] = useState(true);
    const [error , setError] = useState(false);
    const [valid , setValid] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);

            if(props.name === 'password'){
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

                repeatPasswordCheck();
            }

            if(props.name === 'passwordRepeat'){
                const result = new ValidationService().validatePassword(props.name , props.values);

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
        }
    });

    const repeatPasswordCheck = () => {
        const result = new ValidationService().validatePassword("passwordRepeat" , [value , props.values[1]]);
        /*
        * @todo validate change in password to repeat password
        * */
        /*if(result === undefined){
            props.setValid("passwordRepeat" , true);
            props.setValue("passwordRepeat" , props.values[1]);
        }else{
            props.setValid("passwordRepeat" , false);
            props.setValue("passwordRepeat" , props.values[1]);
        }*/
    };

    const validateField = async (event) => {
        setValue(event.target.value);
        const name = event.target.name;
        const value = event.target.value;

        if(props.name === 'password'){
            const result = new ValidationService().validateOne(props.name , value);

            if(result === undefined){
                setError(false);
                setValid(true);
                setErrorMsg('');

                await props.setValid(name , true);
                await props.setValue(name , value);
            }else{
                setValid(false);
                setError(true);
                setErrorMsg(addLineBreaks(result));

                await props.setValid(name , false);
                await props.setValue(name , value);
            }

            repeatPasswordCheck();
        }

        if(props.name === 'passwordRepeat'){
            const result = new ValidationService().validatePassword(props.name , [props.values[0] , value]);

            if(result === undefined){
                setError(false);
                setValid(true);
                setErrorMsg('');

                props.setValid(name , true);
                props.setValue(name , value);
            }else{
                setValid(false);
                setError(true);
                setErrorMsg(addLineBreaks(result));

                props.setValid(name , false);
                props.setValue(name , value);
            }
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

    return (
        <Grid className={`mt-2`} item xs={12}>
            <TextField
                classes={{
                    root: valid ? classes.success : errorMsg ? classes.error : classes.root
                }}
                inputRef={inputRef}
                autoFocus={props.autoFocus || false}
                error={error}
                helperText={errorMsg}
                fullWidth={true}
                //id={props.fieldId}
                label={props.label}
                variant="outlined"
                name={props.name}
                pattern={props.pattern || ""}
                value={value}
                required={props.required || false}
                onChange={validateField}
                type={!showPassword ? `text` : 'password'}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {!showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
        </Grid>
    )
};

export default PrimaryPasswordField;
