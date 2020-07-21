import React, {useState, useRef, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid/Grid";
import ValidationService from "../../../services/ValidationService";
import WarningIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core";
import phoneFormat from "../../../services/phoneFormatter";
import Api from "../../../services/Api";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {confirmAlert} from "react-confirm-alert";
import paths from "../../../utilities/paths";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    success: {
        '& input:valid + fieldset': {
            borderColor: `green !important`,
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: `green !important`,
            borderWidth: 2,
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
    successLabel: {
        color: `green !important`,
    },
    error: {
        '& input:invalid + fieldset': {
            borderColor: `red !important`,
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: `red !important`,
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
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

const PrimaryValidationField = (props) => {
    let history = useHistory();

    const [value , setValue] = useState("");
    const [error , setError] = useState(false);
    const [valid , setValid] = useState(false);
    const [rightIcon , setRightIcon] = useState(props.fetch || false);
    const [errorMsg , setErrorMsg] = useState("");
    const inputRef = useRef();
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(timer);
    timerRef.current = timer;

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);

            if(props.value){
                if(props.name === 'phone'){
                    const event = {
                        target: {
                            name: "phone",
                            value: props.value,
                        }
                    };

                    checkUserPhone(event);
                }else if(props.name === 'username'){
                    const event = {
                        target: {
                            name: "username",
                            value: props.value,
                        }
                    };

                    checkUserName(event);
                }else {
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
            }
        }
    });

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

    const checkUserPhone = async (event) => {
        //event.persist();
        const re = /[\d -]+/g;

        const value = event.target.value;
        const name = event.target.name;

        if (!(value === "" || re.test(value))) {
            return false;
        }

        if (value.length <= 12) {
            const phoneNumber = phoneFormat(value);
            setValue(phoneNumber);

            if(value.length === 12){
                if(props.checkUserPhone){
                    try {
                        let response = await new Api('others').index(
                            {},
                            {},
                            `https://${Api.apiDomain()}/v1/client/users/exists?phone=${phoneNumber}`,
                            {},
                        );

                        if(response.data.valid === true){
                            setError(false);
                            setValid(true);
                            setErrorMsg('');
                            props.setValue(name , phoneNumber);
                            props.setValid(name , true);

                            return true;
                        }else{
                            props.setValid(name , false);
                            props.setValue(name , phoneNumber);

                            setError(true);
                            setValid(false);
                            setErrorMsg('Number exists in database. Use another number');
                        }
                    } catch (error) {
                        setError(true);
                        setErrorMsg('Could not check phone number. Please enter again!');
                        setValid(false);
                        props.setValid(name , false);
                        props.setValue(name , phoneNumber);

                        console.log('Could not check phone number. Please enter again!');
                    }
                }else{
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
                }
            }else {
                props.setValid(name , false);
                props.setValue(name , phoneNumber);

                setError(true);
                setValid(false);
                setErrorMsg('Number must be 10 digits');
            }
        }

        return false;
    };

    const checkUserName = async (event) => {
        //event.persist();

        const value = (event.target.value).trim() || "";
        const name = event.target.name;
        await props.setValue(name , value);
        console.log(timer)
        console.log('^^^^^^^^^^^^')
        console.log(timerRef.current)
        clearTimeout(timer);

        if (value === "" || value === undefined) {
            props.setValid(name , false);
            //props.setValue(name , value);

            setError(true);
            setValid(false);
            setErrorMsg('Username is a required field');
        }

        if (value.length >= 3) {
            setError(false);
            setValid(true);
            setErrorMsg('');

            setTimer(setTimeout(() => {
                setTimer(timerRef.current);
                //clearTimeout(countRef.current)
                console.log(value)
                /*try {
                    let response = await new Api('others').index(
                        {},
                        {},
                        `https://${Api.apiDomain()}/v1/client/users/exists?username=${value}`,
                        {},
                    );

                    if(response.data.valid === true){
                        setError(false);
                        setValid(true);
                        setErrorMsg('');
                        await props.setValid(name , true);

                        return true;
                    }else{
                        await props.setValid(name , false);

                        setError(true);
                        setValid(false);
                        setErrorMsg('Username exists in database. Use another username');
                        confirmAlert({
                            title: 'Account',
                            message: 'Do you already have an account?',
                            buttons: [
                                {
                                    label: 'Yes',
                                    onClick: () => {
                                        history.push(paths.login)
                                    }
                                },
                                {
                                    label: 'No',
                                    onClick: () => {
                                        return false;
                                    }
                                }
                            ]
                        });
                    }
                } catch (error) {
                    setError(true);
                    setErrorMsg('Could not check username. Please enter again!');
                    setValid(false);
                    await props.setValid(name , false);

                    console.log('Could not check username. Please enter again!');
                }*/
            },2000));
        }else {
            await props.setValid(name , false);
            //await props.setValue(name , value);

            setError(true);
            setValid(false);
            setErrorMsg('The minimum length for username is 3');
        }

        return false;
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

    const doRightClick = () => {
        if(props.rightIconFnc){
            props.rightIconFnc();
        }
    };

    const classes = useStyles();

    return (
        <Grid className={`mt-2`} item xs={12}>
            <TextField
                classes={{
                    root: valid ? classes.success : classes.root
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
                onChange={props.name === 'phone' ? checkUserPhone : props.checkUsername ? checkUserName : validateField}
                type={props.type || `text`}
                InputProps={{
                    endAdornment: rightIcon ?
                        <InputAdornment position="end">
                            <IconButton
                                onClick={doRightClick}
                                edge="end"
                            >
                                {rightIcon}
                            </IconButton>
                        </InputAdornment>: ''
                }}
            />
        </Grid>
    )
};

export default PrimaryValidationField;
