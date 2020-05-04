import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";

import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles, withStyles} from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
// import BoxDefault from "../../Components/Box/BoxDefault";
// import ButtonBase from '@material-ui/core/ButtonBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import LocalInfo from '../../../services/LocalInfo';
// import Container from "@material-ui/core/Container/Container";
// import ViewWelcome from "../../getStarted/sections/ViewWelcome";
// import ViewStore from "../../getStarted/sections/ViewStore";
import Box from "@material-ui/core/Box/Box";
// import warehouseImg from "../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
// import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import PersonalInformationSection from "../../register/Sections/PersonalInformationSection";
// import ShopInformationSection from "../../register/Sections/ShopInformationSection";
// import AccountInformationSection from "../../register/Sections/AccountInformationSection";
import Auth0Service from "../../../services/AuthService";
import Api from "../../../services/Api";
import Select from "@material-ui/core/Select/Select";


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

const ChangeStoreInformation = props => {

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

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const [value, setValue] = React.useState('wholesale');
/*
    const handleChange = event => {
        setValue(event.target.value);
    };*/

    const handleChange = event => {
        setValue(event.target.value);
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


                        <SectionNavbars title={`Admin`}>
                            <ArrowBackIcon
                                onClick={() => history.push(paths.admin)}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />

                        <div style={{ position: "fixed", top:"60px", width:"100%" }}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1.4rem" , fontWeight: "600"}}>
                                                    Select a field to edit
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Paper>

                        </div>
                        <div>
                            <div style={{minHeight: "100px"}}>
                                _
                            </div>
                            <Paper style={{padding: "0px 30px 0px 30px"}}>
                                <ValidatorForm
                                    ref={formRef}
                                    onError={handleFormValidation}
                                    className={classes.root}
                                    instantValidate
                                >
                                    <Grid item xs={12} style={{paddingTop: '20px' , textAlign: "left"}}>
                                        <Typography style={{fontSize: "1.3rem" , fontWeight: "500" , paddingBottom: "5px"}}>
                                            Shop name
                                        </Typography>
                                        <ValidationTextField
                                            label="Shop name"
                                            required
                                            variant="outlined"
                                            name="companyName"
                                            id="storeName"
                                            validators={['required', 'minStringLength:3']}
                                            errorMessages={['Company name is a required field', 'Company name should be more than 3']}
                                            helperText=""
                                            validatorListener={handleFormValidation}
                                            style={{width: "100%"}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{paddingTop: '10px' , paddingBottom: '15px' , textAlign: "left"}}>
                                        <Typography style={{fontSize: "1.3rem" , fontWeight: "500" , paddingBottom: "5px"}}>
                                            Location
                                        </Typography>
                                        <ValidationTextField
                                            className={classes.margin}
                                            label="Location"
                                            required
                                            variant="outlined"
                                            name="location"
                                            id="storeName"
                                            validators={['required', 'minStringLength:3']}
                                            errorMessages={['Company name is a required field', 'Company name should be more than 3']}
                                            helperText=""
                                            validatorListener={handleFormValidation}
                                            style={{width: "100%"}}
                                        />
                                    </Grid>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px 50px'}}
                                        className={classes.button}
                                        type="button" onClick={handleOpen}
                                    >
                                        Use current location
                                    </Button>
                                    <br /><hr style={{marginTop: "30px" , border: "0.7px solid #efebeb"}}/>

                                    <Grid item xs={12} className={classes.margin} style={{paddingBottom: '1px' , textAlign: "left" , marginTop: "10px"}}>
                                        <FormControl variant="outlined" className={classes.formControl} style={{width: "100%"}}>
                                            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">

                                            </InputLabel>
                                            <Typography style={{fontSize: "1.3rem" , fontWeight: "500" , paddingBottom: "5px"}}>
                                                My shop is a
                                            </Typography>
                                            <ValidationSelectField
                                                native
                                                labelWidth={labelWidth}
                                                inputProps={{
                                                    name: 'storeCategory',
                                                    id: 'storeCategory',
                                                }}
                                                className={classes.select}
                                                style={{width: "100%" , height: "40px"}}
                                            >
                                                <option value={0}> </option>
                                                {categories.map((category) =>
                                                    <option value={category.id}>{category.name}</option>
                                                )}
                                            </ValidationSelectField>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} className={classes.margin} style={{textAlign: "left" , marginTop: "15px"}}>
                                        <FormControl component="fieldset">
                                            <Typography style={{fontSize: "1.3rem" , fontWeight: "500" , paddingBottom: "5px"}}>
                                               We deal in:
                                            </Typography>
                                            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                                                <FormControlLabel
                                                    value="wholesale"
                                                    control={<Radio color="#daab59" />}
                                                    label="Wholesale"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="Retail"
                                                    control={<Radio color="#daab59" />}
                                                    label="Retail"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="Both"
                                                    control={<Radio color="#daab59" />}
                                                    label="Both"
                                                    labelPlacement="end"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </ValidatorForm>
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
                                    onClick={() => history.push(paths.admin)}
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
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <Paper style={{padding: "10px 0px 0px 0px" , width: "90%"}}>
                                <div>
                                    <div style={{textAlign: "center", padding: "10px"}}>
                                    <LocationOnIcon style={{fontSize: '3.2rem' , color: "#DAAB59"}}/>

                                    <h2 id="transition-modal-title">Your current location is</h2>
                                    </div>
                                    <div className="shadow1" style={{borderRadius: "20px 20px 0px 0px" , padding: "10px" , textAlign: "center"}}>
                                        <div style={{paddingTop: "15px" ,paddingBottom: "3px"}}>
                                            <span>_______________________________</span>
                                            <br />

                                        </div>
                                        <Grid container style={{paddingTop: "12px" ,paddingBottom: "3px"}}>
                                        <Grid item xs={6} style={{textAlign: "center"}}>
                                            <Button
                                                variant="outlined"
                                                style={{border: '1px solid #DAAB59', color: '#DAAB59', fontSize : "13px" ,padding: '7px 5px' , width: "90%"}}
                                                className={classes.button}
                                                onClick={handleClose}
                                            >
                                                No, Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign: "center"}}>

                                            <Button
                                                variant="outlined"
                                                style={{'backgroundColor': '#DAAB59' , fontSize : "13px", color: '#333333', border: '1px solid #DAAB59', padding: '7px 5px' , width: "100%"}}
                                                className={classes.button}
                                            >
                                               Yes, it is correct
                                            </Button>
                                        </Grid>
                                        </Grid>

                                    </div>
                                </div>
                                </Paper>
                            </Fade>
                        </Modal>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(ChangeStoreInformation);
