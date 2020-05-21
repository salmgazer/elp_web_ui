import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import Grid from '@material-ui/core/Grid';
import paths from "../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Woman from '../../../../assets/img/woman.jpg';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from "@material-ui/core/Button/Button";
import SearchInput from "../../../Components/Input/SearchInput";
import Box from "@material-ui/core/Box/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField/TextField";
import MainDialog from "../../../../components/Dialog/MainDialog";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import PersonIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SingleCustomer from './singleViews/SingleCustomer'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    button: {
        minWidth: '40px !important',
        width: '40px !important',
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
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const ViewCustomers = props => {
    const classes = useStyles();
    const [mainDialog, setMainDialog] = React.useState(false);
    const [addDialog, setAddDialog] = React.useState(false);
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const { history } = props;

    const closeDialogHandler = (event) => {
        setMainDialog(false);
        setAddDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const openAddDialog = (event) => {
        setAddDialog(true);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchProduct(value);
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

                        <SectionNavbars
                            title="Customers"
                            leftIcon={
                                <div onClick={() => history.push(paths.admin)}>
                                    <ArrowBackIcon
                                        style={{fontSize: '2rem'}}
                                    />
                                </div>
                            }
                        />

                        <div style={{ position: "fixed", top:"60px", width:"100%" }}>
                            <Paper>
                                <Grid container spacing={1} style={{padding: '0px 2% 20px', textAlign: 'center'}} >
                                    <Grid item xs={12} style={{marginTop: '15px', padding: '4px 4px'}}>
                                        <SearchInput
                                            inputName="search"
                                            getValue={setInputValue.bind(this)}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* 
                            <Grid container spacing={1} style={{padding: '0px 2% 20px', textAlign: 'center'}}>
                                    <Grid item xs={12} style={{marginTop: '5px', padding: '0px 30px'}}>
                                        <Paper className={classes.root} style={{width: '100%'}}>
                                            <InputBase
                                                className={`${classes.input} search-box`}
                                                placeholder="Search for a customer"
                                                inputProps={{ 'aria-label': 'Search for a customer' }}
                                            />
                                            <IconButton className={classes.iconButton} aria-label="search">
                                               <Search/>
                                            </IconButton>
                                        </Paper>
                                    </Grid>
                                </Grid> */}

                            <Grid container spacing={2}>

                                <Grid item xs={12} sm container style={{paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "10px" , paddingBottom: "0px"}}>

                                    </Grid>

                                </Grid>

                                <SingleCustomer />
                            </Grid>


                            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} style={{padding: "7px"}}>
                                <div style={{width: "290px"}}>
                                    <Paper className={classes.paper}>
                                    <Grid container style={{paddingTop: "15px", textAlign: "center"}}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "center" , marginBottom: "7px"}}>
                                            <Typography style={{fontSize: "1rem" , fontWeight: "600" }}>
                                                Credit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    </Paper>


                                    <Grid container style={{paddingTop: "15px", textAlign: "center"}}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "center" , marginBottom: "5px" , marginTop: "5px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600" , color : "#DAAB59" }}>
                                            GHC <span>500.00</span> owned
                                        </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid container style={{paddingTop: "15px", textAlign: "center"}}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "center" , marginBottom: "7px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600" }}>
                                            Has the amount been paid?
                                        </Typography>
                                        </Grid>

                                    </Grid>

                                    <Grid container style={{paddingTop: "15px" , paddingBottom : "20px"}}>
                                        <Grid item xs={6} sm container style={{padding: "0px 10px"}}>

                                            <Button
                                                variant="contained"
                                                style={{
                                                    width: '100%',
                                                    'backgroundColor': '#ffff',
                                                    borderRadius: '5px',
                                                    color: '#DAAB59',
                                                    border: '1px solid #DAAB59',
                                                    padding: '5px 5px',
                                                    fontSize: '11px',
                                                    fontWeight: '500',
                                                    marginTop: '8px',
                                                }}
                                                className={`capitalization`}
                                            >
                                                Forgive
                                            </Button>

                                        </Grid>
                                        <Grid item xs={6} sm container style={{padding: "0px 10px"}}>

                                            <Button
                                                variant="contained"
                                                style={{
                                                    width: '100%',
                                                    'backgroundColor': '#DAAB59',
                                                    borderRadius: '5px',
                                                    color: '#ffff',
                                                    border: '1px solid #DAAB59',
                                                    padding: '5px 5px',
                                                    fontSize: '11px',
                                                    fontWeight: '500',
                                                    marginTop: '8px',
                                                }}
                                                className={`capitalization`}
                                            >
                                                Yes
                                            </Button>

                                        </Grid>
                                    </Grid>
                                </div>
                            </MainDialog>

                            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={addDialog}>
                                <div className="row p-3 pt-0 mx-auto text-center w-100" >

                                    <Typography
                                        component="h2"
                                        variant="h5"
                                        style={{fontSize: '18px' , paddingBottom: '20px'}}
                                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-bold`}
                                    >
                                        Add new customer
                                    </Typography>

                                    <div className="text-center mx-auto">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Name"
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon style={{color: '#DAAB59'}} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="text-center mx-auto my-3">
                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            id="input-with-icon-textfield"
                                            label="Contact"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CallIcon style={{color: '#DAAB59'}} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="text-center mx-auto my-3">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Location"
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnIcon style={{color: '#DAAB59'}} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="text-center mx-auto my-3">
                                        <Button
                                            variant="outlined"
                                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 58px', textTransform: 'none', fontSize:'17px'}}
                                            onClick={closeDialogHandler.bind(this)}
                                        >
                                            Finish
                                        </Button>
                                    </div>

                                </div>
                            </MainDialog>
                            <Box
                                className="shadow1"
                                bgcolor="background.paper"
                                p={1}
                                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px', textTransform: 'Capitalize'}}
                                    onClick={() => history.push(paths.admin)}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', textTransform: 'Capitalize'}}
                                    onClick={openAddDialog.bind(this)}
                                >
                                    New customer
                                </Button>
                            </Box>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(ViewCustomers);
