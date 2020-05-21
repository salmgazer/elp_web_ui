import React, {useState , Fragment} from "react";
import { withRouter } from "react-router-dom";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Grid from '@material-ui/core/Grid';
import paths from "../../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Woman from '../../../../../assets/img/woman.jpg';
import Typography from "@material-ui/core/Typography/Typography";

import LocalInfo from '../../../../../services/LocalInfo';
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Box from "@material-ui/core/Box/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import MainDialog from "../../../../../components/Dialog/MainDialog";
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import MoreVertIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import SearchInput from "../../../../Components/Input/SearchInput";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';


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
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
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

const MainSuppliersView = props => {
    const classes = useStyles();
    const [mainDialog, setMainDialog] = React.useState(false);
    const [addDialog, setAddDialog] = React.useState(false);
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

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

    const closeDialogHandler = (event) => {
        setMainDialog(false);
        setAddDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        try {
            /*const products = await new BranchService().searchBranchProduct(value);

            await getBranchProductsRendered(products);
            setBranchProducts(products);*/
        }catch (e) {
            return false
        }
    };

    const image = `https://elparah.store/admin/upload/ Sangria Don Simon Red Wine 1L Tetrapak.jpg`;

    return (
        <div >
            <Fragment style={{height: '100vh' , backgroundColor: 'rgba(229, 229, 229, 0.16)'}}>
                <CssBaseline />

                <SectionNavbars
                    title="Suppliers"
                    icons={
                        <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                            <MoreVertIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                    leftIcon={
                        <div onClick={() => history.push(paths.suppliers)}>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

                <div style={{ position: "fixed", top:"50px", width:"100%" , zIndex: '1000' , paddingBottom: '10px'}}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                            <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto mt-7`}>
                                <SearchInput
                                    inputName="Search a supplier"
                                    styles={{
                                        border: '1px solid #e5e5e5',
                                        padding: '10px 0px'
                                    }}
                                    getValue={setInputValue.bind(this)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>

                <SimpleSnackbar
                    type="success"
                    openState={success}
                    message={successMsg}
                />

                <SimpleSnackbar
                    type="warning"
                    openState={error}
                    message={errorMsg}
                />

                <Box
                    container
                    component="span" m={1}
                    style={{
                        width: '95%',
                        display: 'flex',
                        margin: '10px auto',
                        marginTop: '120px',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Container
                        maxWidth="sm"
                        style={{
                            width: '100%',
                            display: 'flex',
                            padding: '5px',
                            marginTop: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt="Ali Connors"
                            src={Woman}
                            className={classes.primaryColor}
                            style={{
                                flex: 1,
                                justifyContent: "space-between"
                            }}
                        >
                        </Avatar>

                        <Button
                            edge="end"
                            variant="contained"
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                backgroundColor: '#ffff',
                                borderRadius: '5px',
                                color: '#ff5722',
                                border: 'none',
                                padding: '5px 5px',
                                fontSize: '11px',
                                fontWeight: '500',
                                marginTop: '8px',
                            }}
                            className={`capitalization`}
                            onClick={openDialogHandler.bind(this)}
                        >
                            You owe <br />
                            GHc 500
                        </Button>
                    </Container>
                    {/*<ListItem key={1}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.primaryColor}
                            >
                                <Typography
                                    component="p"
                                    variant="h6"
                                    style={{fontWeight: '700', fontSize: '1.00rem'}}
                                >
                                    B
                                </Typography>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <Typography
                                component="span"
                                variant="body2"
                                //className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <Button
                                edge="end"
                                variant="contained"
                                style={{
                                    //width: '80%',
                                    'backgroundColor': '#ffff',
                                    borderRadius: '5px',
                                    color: '#ff5722',
                                    border: 'none',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginTop: '8px',
                                }}
                                className={`capitalization`}
                                onClick={openDialogHandler.bind(this)}
                            >
                                You owe <br />
                                GHc 500
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>*/}
                </Box>

                <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} style={{padding: "7px"}}>
                    <div style={{width: "290px"}}>
                        <Paper className={classes.paper}>
                            <Grid container style={{paddingTop: "7px"}}>

                                <Grid item xs={7} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" , paddingLeft: "5px" }} onClick={() => history.push(paths.supplier_detail)}>
                                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                        <Grid item xs>
                                            <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                Niko's Enterprise
                                            </Typography>
                                            <Typography  style={{fontSize: "0.9rem"}}>
                                                Thur, 27th Dec 2019
                                            </Typography>
                                            <Typography style={{fontSize: "0.8rem"}}>
                                                7:00pm
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                    <div>
                                        <Typography style={{fontSize: "0.8rem" , color: '#ff5722'}}>
                                            Ghc 500 owned
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            style={{
                                                width: '80%',
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
                                            onClick={() => history.push(paths.pay_supplier)}
                                        >
                                            Enter payment
                                        </Button>

                                    </div>
                                </Grid>

                            </Grid>
                        </Paper>

                        <Grid container style={{paddingTop: "7px"}}>
                            <Grid item xs={3} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={image} style={{width: "60px" , height: "60px" , borderRadius: "50%"}}></img>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={7} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                    <Grid item xs>
                                        <Typography style={{fontSize: "0.9rem"}}>
                                            Don Simon
                                        </Typography>
                                        <Typography  style={{fontSize: "0.8rem"}}>
                                            Quantity : 50
                                        </Typography>
                                        <Typography style={{fontSize: "0.7rem"}}>
                                            Cost : Ghc 90
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                <div>
                                    <Typography style={{fontSize: "0.8rem" , color: '#ff5722'}}>
                                        Edit
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '40px',
                                            backgroundColor: '#ffff',
                                            borderRadius: '5px',
                                            color: '#daab59',
                                            border: '1px solid #daab59',
                                            padding: '5px 5px',
                                            fontSize: '11px',
                                            fontWeight: '500',
                                            marginTop: '8px',
                                        }}
                                        className={classes.button}
                                    >
                                        <EditIcon/>
                                    </Button>

                                </div>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm style={{marginTop: '5px'}}>
                            <div>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '80%',
                                        'backgroundColor': '#ffff',
                                        borderRadius: '5px',
                                        border: 'none',
                                        padding: '5px 5px',
                                        fontSize: '11px',
                                        fontWeight: '500',
                                        marginTop: '8px',
                                    }}
                                    className={`capitalization`}
                                >
                                    Total Cost : Ghc 500
                                </Button>

                            </div>
                        </Grid>
                        <Grid container style={{paddingTop: "15px" , paddingBottom : "20px"}}>
                            <Grid item xs={6} sm container style={{padding: "0px 38px" , textDecoration: "underline"}}>

                                <Typography style={{fontSize: "0.8rem" , color: '#daab59' , textAlign : "center"}}>
                                    Order again
                                </Typography>

                            </Grid>
                            <Grid item xs={6} sm container style={{padding: "0px 50px" , textDecoration: "underline"}}>

                                <Typography style={{fontSize: "0.8rem" , color: '#daab59' , textAlign : "center"}}
                                            onClick={closeDialogHandler.bind(this)}
                                >
                                    Close
                                </Typography>

                            </Grid>
                        </Grid>
                    </div>
                </MainDialog>

                <div >

                    {/*<Grid container spacing={2}>
                        <Grid item xs={12} sm container style={{paddingBottom: "0px"}}>
                            <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "10px" , paddingBottom: "0px"}}>

                            </Grid>

                        </Grid>
                        <Grid container style={{paddingTop: "10px"}}>
                            <Grid item xs={3} sm>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="supplier photo" src={Woman} style={{width: "60px" , height: "60px" , borderRadius: "50%"}}></img>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={5} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                    <Grid item xs>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Esi Mensah
                                        </Typography>
                                        <Typography  style={{fontSize: "0.9rem"}}>
                                            Niko's Enterprise
                                        </Typography>
                                        <Typography style={{fontSize: "0.8rem"}}>
                                            05481452770
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '80%',
                                            'backgroundColor': '#ffff',
                                            borderRadius: '5px',
                                            color: '#ff5722',
                                            border: 'none',
                                            padding: '5px 5px',
                                            fontSize: '11px',
                                            fontWeight: '500',
                                            marginTop: '8px',
                                        }}
                                        className={`capitalization`}
                                        onClick={openDialogHandler.bind(this)}
                                    >
                                        You owe <br />
                                        GHc 500
                                    </Button>

                                </div>
                            </Grid>

                        </Grid>
                    </Grid>*/}

                    <Box
                        className="shadow1"
                        bgcolor="background.paper"
                        p={1}
                        style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
                    >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                            onClick={() => history.push(paths.suppliers)}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                            onClick={() => history.push(paths.add_supplier)}
                        >
                            Add new
                        </Button>
                    </Box>
                </div>
            </Fragment>
        </div>
    );
};

export default withRouter(MainSuppliersView);
