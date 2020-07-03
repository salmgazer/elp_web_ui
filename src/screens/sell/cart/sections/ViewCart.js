import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from "@material-ui/core/Box/Box";
import AddedProductSingle from "./BoxView/BoxView";
import { withRouter } from "react-router-dom";
import paths from "../../../../utilities/paths";
import CartService from "../../../../services/CartService";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";
import CustomerListDrawer from "../../../../components/Drawer/CustomerListDrawer/CustomerListDrawer";
import CustomerService from "../../../../services/CustomerService";
import LocalInfo from "../../../../services/LocalInfo";
import MainDialog from "../../../../components/Dialog/MainDialog";
import SecondaryButton from "../../../../components/Buttons/SecondaryButton";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import SaleService from "../../../../services/SaleService";
import PrimaryTextField from "../../../../components/Input/TextField";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SettingsIcon from '@material-ui/icons/Settings';
import Switch from '@material-ui/core/Switch';

const PrimarySwitch = withStyles({
    switchBase: {
        color: `#009688 !important`,
        '&$checked': {
            color: `#009688 !important`,
        },
        '&$checked + $track': {
            backgroundColor: `#009688 !important`,
        },
    },
    root: {
        float: `right !important`,
    },
    checked: {},
    track: {},
})(Switch);

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

const CartView = props => {
    const [customerName, setCustomerName] = React.useState('');
    const [customerId , setCustomerId] = React.useState('');
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const counter = props.cartTotalProducts;
    const [settingsState, setSettingsState] = useState({
        aggregateSales: LocalInfo.aggregateSales,
        checkoutSales: LocalInfo.checkoutSales,
    });
    const [success , setSuccess] = useState(false);
    const [openPaymentState , setOpenPaymentState] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [isShowerCustomerDrawer , setIsShowerCustomerDrawer] = useState(false);
    const [isSaveCart , setIsSaveCart] = useState(false);
    const [openSettingsState , setOpenSettingsState] = useState(false);
    const [formFields , setFormFields] = useState({
        amountPaid: '',
        changeDue: '',
        customer: props.currentCustomer,
        type: 0
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;

        const changeDue = (parseFloat(value) - parseFloat(props.cartAmount)).toFixed(2);
        oldFormFields[name] = value;
        oldFormFields['changeDue'] = changeDue;

        setFormFields(oldFormFields);
    };

    const handleSettingsChange = (event) => {
        event.persist();
        setSettingsState({ ...settingsState, [event.target.name]: event.target.checked });
        LocalInfo.branchSettings(event);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (customerId !== props.currentCustomer) {
            setCustomerId(props.currentCustomer);
            getCustomerName();
        }
    });

    const getCustomerName = async () => {
        setCustomerName(await new CartService().getCartCustomer(props.currentCustomer));
    };

    const classes = useStyles();


    const openDialogHandler = async() => {
        if(props.currentCustomer === (await CustomerService.getCashCustomer())[0].id){
            setIsSaveCart(true);
            setIsShowerCustomerDrawer(true);
        }else{
            const response = await new CartService().suspendCart();

            if (response) {
                setSuccessMsg('Cart saved');
                setSuccess(true);
                setTimeout(function(){
                    props.history.push(paths.sell);
                    setError(false);
                }, 2000);
            }else{
                setErrorMsg('Cart was not saved. Please try again');
                setError(true);
                setTimeout(function(){
                    props.setView(0);
                    setError(false);
                }, 3000);
            }
        }
    };

    const getCustomerDialog = async() => {
        setIsShowerCustomerDrawer(true);
    };

    const openCheckoutHandler = () => {
        if(!LocalInfo.checkoutSales){
            completeSellHandler()
        }else{
            props.setView(1);
        }
    };

    const setCustomerHandler = (customer) => {
        props.setCustomerHandler(customer);
        setIsShowerCustomerDrawer(false);
        if(isSaveCart){
            openDialogHandler();
        }
    };

    const deleteProductHandler = (pId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await new ModelAction('CartEntry').destroy(pId);

                            setSuccessMsg('Cart entry deleted successfully');
                            setSuccess(true);
                            setTimeout(function(){
                                setSuccessMsg('');
                                setSuccess(false);
                            }, 2000);

                            return true;
                        } catch (e) {
                            setErrorMsg('OOPS. Something went wrong. Please try again');
                            setError(true);
                            setTimeout(function(){
                                setErrorMsg('');
                                setError(false);
                            }, 2000);
                            return false;
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };

    const setSearchValue = (value) => {
        props.searchCustomerHandler(value);
    };

    const completeSellHandler = async() => {
        confirmAlert({
            title: 'Confirm to sell',
            message: 'Click yes to sell',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await new SaleService().makeSell({
                                amountPaid: parseFloat(props.cartTotalAmount),
                                changeDue: 0,
                                customer: props.currentCustomer,
                                type: 0
                            } , 0);

                            setSuccessMsg('Sale completed');
                            setSuccess(true);
                            setTimeout(function(){
                                props.history.push(paths.sell);
                                setError(false);
                            }, 2000);
                        }catch (e) {
                            setErrorMsg('Sale was not saved. Please try again');
                            setError(true);
                            setTimeout(function(){
                                props.setView(0);
                                setError(false);
                            }, 3000);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        });

        /*if(oldFormFields.type === 0 && parseFloat(oldFormFields.amountPaid) < parseFloat(props.cartTotalAmount)){
            //alert(`Amount paid must be greater than ${props.cartTotalAmount}`)
            setOpenPaymentState(false);
            confirmAlert({
                title: 'Confirm to sell',
                message: 'Are you sure, you want to pay less than the cart amount?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                await new SaleService().makeSell(formFields , formFields.type);
                                props.history.push(paths.sell);
                            } catch (e) {
                                return false;
                            }
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            setOpenPaymentState(true);

                            alert(`Please make sure amount paid is ${props.cartTotalAmount} or above`)
                        }
                    }
                ]
            });
        } else {
            try {
                await new SaleService().makeSell(formFields , formFields.type);
                props.history.push(paths.sell);
            }catch (e) {
            }
        }*/
    };

    return(
        <div className={classes.root}>
            <SectionNavbars
                title="Cart"
                icons={
                    <AddShoppingCartIcon
                        style={{fontSize: '2rem'}}
                        onClick={openDialogHandler.bind(this)}
                    />
                }
                leftIcon={
                    <div onClick={() => props.history.push(paths.sell)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                rightIcon={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem
                        button
                        key={6}
                        onClick={() => setOpenSettingsState(true)}
                    >
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </BottomDrawer>

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

            <CustomerListDrawer
                handleClose={() => setIsShowerCustomerDrawer(false)}
                setCustomer={setCustomerHandler.bind(this)}
                customers={props.customers}
                isShow={isShowerCustomerDrawer}
                searchCustomerHandler={setSearchValue.bind(this)}
            />

            <Grid container spacing={1} className={`px-4 mt-2`}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            QUANTITY
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`${props.cartTotalProducts} ${props.cartTotalProducts > 1 ? 'items' : 'item'}`}
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

            <MainDialog
                title={`Payment`}
                handleDialogClose={() => setOpenPaymentState(false)}
                states={openPaymentState}
            >
                <Grid container spacing={1} className={`mb-3`}>
                    <Grid item xs={12} className={`px-3`} style={{ margin: '10px 0px 0px 0px'}} >
                        <PrimaryTextField
                            name="amountPaid"
                            label="Total Cash"
                            type="tel"
                            value={formFields.amountPaid}
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>

                <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
                    <div
                        className={`pr-3`}
                        onClick={() => setOpenPaymentState(false)}
                    >
                        <PrimaryButton
                            classes={`capitalization px-4`}
                        >
                            Back
                        </PrimaryButton>
                    </div>
                    <div
                        onClick={completeSellHandler.bind(this)}
                    >
                        <SecondaryButton
                            classes={`capitalization px-4 font-weight-bold text-dark`}
                        >
                            Pay
                        </SecondaryButton>
                    </div>
                </div>


            </MainDialog>

            <MainDialog
                title={`Settings`}
                handleDialogClose={() => setOpenSettingsState(false)}
                states={openSettingsState}
            >
                <Grid container spacing={1} className={`mb-3`}>
                    <Grid item xs={12} className={`bordered px-2`} style={{ margin: '10px 0px 0px 0px'}} >
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    className={`py-2 text-left`}
                                    style={{fontSize: '18px' , margin: '0px 0px' , fontWeight: '600'}}
                                >
                                    Checkout
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <PrimarySwitch
                                    size={`medium`}
                                    checked={settingsState.checkoutSales}
                                    onChange={handleSettingsChange}
                                    name="checkoutSales"
                                />
                            </Grid>
                        </Grid>

                        <Typography
                            component="p"
                            variant="h6"
                            className={`py-2 text-left`}
                            style={{fontSize: '16px' , margin: '0px 0px'}}
                        >
                            Switch on to use the checkout feature or if you record sales individually.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={`bordered px-2`} style={{ margin: '10px 0px 0px 0px'}} >
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    className={`py-2 text-left`}
                                    style={{fontSize: '18px' , margin: '0px 0px' , fontWeight: '600'}}
                                >
                                    Aggregate
                                </Typography>
                            </Grid>
                            <Grid item xs={6} style={{float: 'right'}}>
                                <PrimarySwitch
                                    size={`medium`}
                                    checked={settingsState.aggregateSales}
                                    onChange={handleSettingsChange}
                                    name="aggregateSales"
                                />
                            </Grid>
                        </Grid>

                        <Typography
                            component="p"
                            variant="h6"
                            className={`py-2 text-left`}
                            style={{fontSize: '16px' , margin: '0px 0px'}}
                        >
                            Switch on to record different instances of a product separately in cart.
                        </Typography>
                    </Grid>
                </Grid>

                <div onClick={() => setOpenSettingsState(false)}>
                    <SecondaryButton
                        classes={`capitalization font-weight-bold text-dark`}
                    >
                        Finish
                    </SecondaryButton>
                </div>

            </MainDialog>

            <Button
                variant="outlined"
                style={{fontSize: '16px'}}
                className={classes.button}
                onClick={getCustomerDialog.bind(this)}
            >
                {customerName === 'Cash Customer' ? <PersonAddIcon /> : ''}
                {customerName}
            </Button>

            <Box style={{marginTop: '5px' , margin: '2px 5px', paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
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
                    props.products.map((item) => <AddedProductSingle changeQuantity={props.changeQuantity} changePrice={props.changePrice} deleteStoreProduct={deleteProductHandler.bind(this)} key={item.id} item={item}/>)
                }
            </Box>

            {/*<Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%", display: 'flex', alignContent: 'center' }}
            >
                <div
                    onClick={() => props.history.push(paths.sell)}
                >
                    <PrimaryButton>
                        Add product
                    </PrimaryButton>
                </div>

                <div
                    onClick={openCheckoutHandler.bind(this)}
                >
                    <SecondaryButton>
                        Checkout
                    </SecondaryButton>
                </div>
            </Box>*/}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                style={{ height: '2.5rem', position: "fixed", bottom:"10px", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            onClick={() => props.history.push(paths.sell)}
                            style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px', float: 'right', marginRight: '5px'}}
                        >
                            Sell
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px', textTransform: 'none', fontSize:'17px', float: 'left', marginLeft: '5px'}}
                            onClick={openCheckoutHandler.bind(this)}
                            disabled={!counter}
                        >
                            {!LocalInfo.checkoutSales ? 'Save' : 'Checkout'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default withRouter(CartView);
