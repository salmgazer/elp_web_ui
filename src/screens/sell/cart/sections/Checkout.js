import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import TabPanel from "../../../../components/Tabs/TabPanel";
import AppBar from '@material-ui/core/AppBar';
import Box from "@material-ui/core/Box/Box";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from "react-router-dom";
import ViewCash from './ViewCash';
import MainDialog from "../../../../components/Dialog/MainDialog";
import ErrorImage from '../../../../assets/img/error.png';
import CancelIcon from '@material-ui/icons/Cancel';
import CustomersModal from "../../../../components/Modal/Customer/CustomersModal";
import AddCustomerModal from "../../../../components/Modal/Customer/AddCustomerModal";
import CustomerService from "../../../../services/CustomerService";
import SaleService from "../../../../services/SaleService";
import CartService from "../../../../services/CartService";
import paths from "../../../../utilities/paths";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";

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
    tabs: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#333333',
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

const CheckoutView = props => {
    const [cartData , setCartData] = React.useState('');
    const classes = useStyles();
    const [addDialog, setAddDialog] = React.useState(false);
    const [mainDialog, setMainDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [btnValue , setBtnValue] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('');
    const [customerId , setCustomerId] = React.useState('');
    //console.log(props.currentCustomer)
    //console.log(customerName)

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

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
      }

    const closeDialogHandler = (event) => {
        setMainDialog(false);
        setValue(0);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    /*const openSuccessHandler = () => {
        props.setView(2);
    };*/

    const setCustomerHandler = (customer) => {
        console.log(customer)
        props.setCustomerHandler(customer);
        //console.log(props.currentCustomer)
    };

    const setAddCustomerHandler = async() => {
        const lastCustomer = await new CustomerService().getLastCustomer();
        props.setCustomerHandler(lastCustomer.id);
        setAddDialog(false);
        setMainDialog(false);
    };

    const openAddDialog = () => {
        setAddDialog(true);
    };

    const paymentDetails = (formFields) => {
        console.log(formFields.amountPaid , props.cartTotalAmount)
        if(value === 0 && parseFloat(formFields.amountPaid) >= parseFloat(props.cartTotalAmount)){
            setBtnValue(true);
        }else{
            setErrorMsg(`Amount paid must be greater than ${props.cartTotalAmount}`);
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 1000);
            setBtnValue(false);
        }
        setCartData(formFields)
    };

    const completeSellHandler = async() => {
        //console.log(cartData)
        try {
            await new SaleService().makeSell(cartData , value);
            props.setView(2);
        }catch (e) {

        }
    };


    return(
        <div className={classes.root}>
            <SectionNavbars title="Payment" >
                <ArrowBackIosIcon
                    onClick={backHandler.bind(this)}
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbars>

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '8px 0px'}} >
                    <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '18px' }} >
                            Amount due
                        </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '25px' }} >
                                {`GHC ${props.cartTotalAmount}`}
                        </Typography>
                </Grid>
            </Box>

            <AppBar position="static" color="white">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className={classes.tabs} label="Cash" icon={<LocalAtmIcon style={{color: '#DAAB59'}} />} {...a11yProps(0)} />
                    <Tab onClick={openDialogHandler.bind(this)} className={classes.tabs} label="MoMo" icon={<PhoneAndroidIcon style={{color: '#DAAB59'}} />} {...a11yProps(1)} />
                    <Tab onClick={openDialogHandler.bind(this)} className={classes.tabs} label="Credit" icon={<ScheduleIcon style={{color: '#DAAB59'}} />} {...a11yProps(2)} />
                    <Tab onClick={openDialogHandler.bind(this)} className={classes.tabs} label="Other" icon={<CardGiftcardIcon style={{color: '#DAAB59'}} />} {...a11yProps(3)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} >
                    <ViewCash
                        currentCustomer={customerName}
                        openAddCustomerModal={openAddDialog.bind(this)}
                        cartAmount={props.cartTotalAmount}
                        customerId={props.currentCustomer}
                        getFormFields={paymentDetails.bind(this)}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}  >

                </TabPanel>
                <TabPanel value={value} index={2}  >

                </TabPanel>
                <TabPanel value={value} index={3}  >

                </TabPanel>
            </SwipeableViews>

            <AddCustomerModal
                openCustomerAddState={addDialog}
                setCustomer={setAddCustomerHandler.bind(this)}
                handleClose={() => setAddDialog(false)}
            />

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row p-3 pt-0 mx-auto text-center w-100" >
                    <CancelIcon  style={{position: 'relative', float: 'right', fontSize: '2rem'}}
                        onClick={closeDialogHandler.bind(this)}
                    />

                    <Typography

                        variant="h2"
                        style={{fontSize: '30px' }}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-bold`}
                    >
                        Oops!
                    </Typography>

                    <Box component="div" m={2}>
                        <img className="img100" src={ErrorImage} alt={'test'}/>
                     </Box>

                    <div className="text-center mx-auto my-3">
                        <Typography
                            component="p"
                            variant="h6"
                            style={{fontSize: '16px' , margin: '0px 0px', padding: '16px'}}
                            className={`text-center mb-2 mx-auto w-90 text-dark font-weight-bold`}
                        >
                            Seems like you have discovered a premium feature.
                        </Typography>

                        <Typography
                            component="p"
                            variant="h6"
                            style={{fontSize: '16px' , margin: '0px 0px', padding: '16px'}}
                            className={`text-center mb-2 mx-auto w-90 text-dark font-weight-bold`}
                        >
                            Please upgrade to be able to process other payment methods.
                        </Typography>
                    </div>

                    <div className="text-center mx-auto my-3">
                        <Button
                                variant="outlined"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 58px', textTransform: 'none', fontSize:'17px'}}
                            >
                                Upgrade now
                        </Button>
                    </div>

                </div>
            </MainDialog>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0px", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    onClick={() => props.setView(0)}
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 40px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={completeSellHandler.bind(this)}
                    disabled={!btnValue}
                >
                    Finish
                </Button>
            </Box>

            {/*<Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    className='text-dark font-weight-bold'
                    style={{
                        backgroundColor: '#DAAB59',
                        color: '#333333',
                        padding: '5px 60px',
                        textTransform: 'none',
                        fontSize: '20px',
                    }}
                    onClick={completeSellHandler.bind(this)}
                >
                    Finish
                </Button>
            </Box>*/}

        </div>
    )
}

export default withRouter(CheckoutView);
