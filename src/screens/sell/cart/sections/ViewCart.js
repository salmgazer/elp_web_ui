import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from "@material-ui/core/Box/Box";
import AddedProductSingle from "./BoxView/BoxView";
import MainDialog from "../../../../components/Dialog/MainDialog";
import { withRouter } from "react-router-dom";
import paths from "../../../../utilities/paths";
import RoomIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CustomersModal from "../../../../components/Modal/Customer/CustomersModal";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '70px',
    },
    title: {
              fontSize: 11,
           },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      
     
    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 50px',
        marginRight: '10px',
        marginTop: '10px',
        textTransform: 'none',
    }
  }));

  const users = [
    {
      value: 'USD',
      label: 'Chris Asante',
    },
    {
      value: 'EUR',
      label: 'Pearl Gemegah',
    },
    {
      value: 'BTC',
      label: 'Joshua Odoi',
    },
    {
      value: 'JPY',
      label: 'Fred Yeboah',
    },
  ];

const CartView = props => {
    const [mainDialog, setMainDialog] = React.useState(false);
    const [addDialog, setAddDialog] = React.useState(false);
    const [checkUser , setCheckUser] = React.useState(false);
    const [user, setUser] = React.useState('Chris Asante');

    //console.log(props.products);
    //console.log(props.entries);
    const handleChange = event => {
        setUser(event.target.value);
    };

    const classes = useStyles();

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

    const deleteProductHandler = (event) => {
        props.deleteProduct(event);
    };

    const openCheckoutHandler = (event) => {
        props.setView(1);
    };

    return(
        <div className={classes.root}>
            <SectionNavbars 
                title="Cart"  
                icons={
                    <AddShoppingCartIcon 
                        style={{fontSize: '2rem'}}
                        onClick={openDialogHandler.bind(this)}
                    />}
            >
                <div
                    onClick={() => props.history.push(paths.sell)}
                >
                    <ArrowBackIosIcon
                        style={{fontSize: '2rem'}}
                    />
                </div>

            </SectionNavbars>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            QUANTITY
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`${props.cartTotalProducts} ${props.cart > 1 ? 'items' : 'item'}`}
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            TOTAL
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`GHC ${props.cartTotalAmount}`}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            

            <Button
                variant="outlined"
                style={{fontSize: '16px'}}
                className={classes.button}
                onClick={openDialogHandler.bind(this)}
            >
                <PersonAddIcon />
                &nbsp; Assign customer
            </Button>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No item in cart
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    props.products.map((item) => <AddedProductSingle changeQuantity={props.changeQuantity} deleteStoreProduct={deleteProductHandler.bind(this)} key={item.id} item={item}/>)
                }
            </Box>

            <CustomersModal
                customers={props.customers}
                openState={mainDialog}
                handleClose={setMainDialog(false)}
            />
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
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 30px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                >
                    Add product   
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={openCheckoutHandler.bind(this)}
                >
                    Checkout
                </Button>
            </Box>
           
        </div>
    )
}

export default withRouter(CartView);