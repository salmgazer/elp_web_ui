import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";

import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles, withStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import BoxDefault from "../../../components/Box/BoxDefault";
import ButtonBase from '@material-ui/core/ButtonBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import LocalInfo from '../../../services/LocalInfo';
import Container from "@material-ui/core/Container/Container";
// import ViewWelcome from "../../getStarted/sections/ViewWelcome";
// import ViewStore from "../../getStarted/sections/ViewStore";
import Box from "@material-ui/core/Box/Box";
import warehouseImg from "../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from '@material-ui/core/TextField';
// import Modal from '@material-ui/core/Modal';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
// import PersonalInformationSection from "../../register/Sections/PersonalInformationSection";
// import ShopInformationSection from "../../register/Sections/ShopInformationSection";
// import AccountInformationSection from "../../register/Sections/AccountInformationSection";
import Auth0Service from "../../../services/AuthService";
import Api from "../../../services/Api";
import Select from "@material-ui/core/Select/Select";
import Woman from "../../../assets/img/woman.jpg";
import Styles from "../Admin.module.scss";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {green} from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from "@material-ui/core/SvgIcon/SvgIcon";
import clsx from 'clsx';
import Input from '@material-ui/core/Input';

const GreenCheckbox = withStyles({
    root: {
        color: '#333',
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
    shadow2: {
        'box-shadow': '0 0 1rem 2px #dcc7a4',
    },
    margin1: {
        margin: '20px auto',
    },
    padding1: {
        'padding-bottom': '20px',
    },
    boxRadius: {
        'border-radius': '10px !important',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper2: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
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

const apiUrl = "";

async function getUserStoreFromLocal(database, user, store) {
    return database.collections
        .get("users_stores")
        .query(Q.where("user_id", user.id), Q.where("store_id", store.id))
        .fetch();
}

async function getUserFromLocal(database, usernameOrPhone, password) {
    return database.collections
        .get("users")
        .query(
            Q.where("username", usernameOrPhone),
            Q.or(Q.where("phone", usernameOrPhone)),
            Q.where("password", password)
        )
        .fetch();
}

async function getStore(database) {
    return database.collections
        .get("stores")
        .query()
        .fetch();
}

async function getUsersFromLocal(database) {
    return database.collections
        .get("users")
        .query()
        .fetch();
}

const AccountInformation = props => {

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;
    const database = useDatabase();

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    const [isStore , setIsStore] = React.useState(false);

    const [user , setUser] = useState(0);
    const [company , setCompany] = useState(0);
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [data , setData] = useState({
        firstName: '',
        otherNames: '',
        phone: '',
        companyName: '',
        location: '',
        storeCategory: '',
        username: '',
        password: '',
        passwordRepeat: '',
        isValid: true,
    });

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*@todo
    * change state for password and confirm password...
    * */

    const formDataHandler = event => {
        const { ...formData }  = data;

        formData[event.target.name] = event.target.value;
        /*if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }*/
        setData(formData);
    };

    const formValidHandler = result => {
        const { ...formData }  = data;

        formData['isValid'] = !result;
        /*if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }*/

        setData(formData);
    };

    const userFields = props.formData;
    const [categories , setCategories] = useState([]);


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

    /*
    const handleChange = event => {
        setValue(event.target.value);
    };*/

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleChangeHandler = (event) => {
       props.collectData(event);
    };

    const handleFormValidation = (result) => {
        props.isValid(result);
    };

    const formRef = React.createRef('form');

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleFinish = async() => {
        //console.log(data);
        /*
        * Handle registration here...
        * */

        let req = await new Auth0Service().register(data);

        if(!req.error){
            /*
            * @todo
            * push user details to watermelon...
            * */
            localStorage.setItem('userContact' , req.user.phone);
            localStorage.setItem('userOTP' , req.user.otp);
            localStorage.setItem('userFirstName' , req.user.firstName);
            console.log(req);
        }else{
            console.log(req.error);
        }

        history.push(paths.verify_sms);
    };



    return (
        <div style={{height: '100vh'}}>
            <Component
                initialState={{
                    isDrawerShow: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />


                        <SectionNavbars title={`Account information`}>
                            <ArrowBackIcon
                                onClick={() => history.push(paths.admin)}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />


                        <div>
                            <Paper style={{padding: "0px 30px 0px 30px"}}>
                                <br /><br /><br /><br />
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="complex" src={Woman} style={{width: "80px" , height: "80px" , borderRadius: "50%"}}></img>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={8} sm container>
                                       {/* <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Pearl Gemegah
                                                </Typography>
                                                <Typography  style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    God's Grace Store
                                                </Typography>
                                            </Grid>
                                        </Grid>*/}

                                        <form className={classes.root} noValidate autoComplete="off">
                                            <TextField id="standard-basic" label="" value="Pearl" style={{borderBottom: "1px solid #c3c3c3" , marginBottom: "10px" , padding: "2px 5px"}}/>
                                            <TextField id="standard-basic" label="" value="Makafui Gemegah" style={{borderBottom: "1px solid #c3c3c3" , padding: "2px 5px"}}/>
                                        </form>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} style={{marginTop: "15px"}}>
                                    <FormControlLabel
                                        control={
                                            <GreenCheckbox
                                                style={{paddingLeft: '0px'}}
                                                value="checkedB"
                                                color="success"
                                                name="checkedB"
                                            />
                                        }
                                        label="Use phone number to login"
                                    />
                                </Grid>

                                <Grid container style={{paddingTop: "25px" , fontSize:"18px"}}>
                                    <Grid item xs={6} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize:"18px" , fontWeight: "400"}}>
                                                    Change number
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "right" , paddingBottom: "2px"}}>
                                            <Grid item xs>
                                                {/*<TextField id="standard-basic" label="" value="0547845784" />*/}
                                                0545454544
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                <Grid item xs={1} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                    <div className={Styles.centered}>
                                        <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.verify_phone)}/>

                                    </div>
                                </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "25px" , fontSize:"18px"}}>
                                    <Grid item xs={7} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontWeight: "400" , fontSize:"18px"}}>
                                                    Change username
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "right" , paddingBottom: "2px"}}>
                                            <Grid item xs>
                                                {/*<TextField id="standard-basic" label="" value="0547845784" />*/}
                                                pearlgee
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>

                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid container style={{paddingTop: "25px" , fontSize:"18px"}}>
                                    <Grid item xs={7} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontWeight: "400" , fontSize:"18px"}}>
                                                    Change password
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "right" , paddingBottom: "2px"}}>
                                            <Grid item xs={12}>
                                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                                    <InputLabel htmlFor="standard-adornment-password"></InputLabel>
                                                    <Input
                                                        style={{width: "135px"}}
                                                        id="standard-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        value={values.password ? 'text' : 'yourpasswordgoeshere'}
                                                        onChange={handleChange('password')}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>


                                <Grid container style={{paddingTop: "25px" , fontSize:"18px" , marginBottom: "125px"}}>
                                    <Grid item xs={12} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "center" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontWeight: "400" , fontSize:"18px"}}>
                                                    Log out
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>   .



                            </Paper>
                        </div>
                        <div>
                            <Box
                                boxShadow={1}
                                bgcolor="background.paper"
                                p={1}
                                style={{position: "fixed", bottom:"0", width:"100%" }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px'}}
                                    className={classes.button}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                    className={classes.button}
                                >
                                    Save
                                </Button>
                            </Box>
                        </div>


                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(AccountInformation);
