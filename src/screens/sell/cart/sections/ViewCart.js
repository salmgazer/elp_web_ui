import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
import CustomersModal from "../../../../components/Modal/Customer/CustomersModal";
import AddCustomerModal from "../../../../components/Modal/Customer/AddCustomerModal";
import CustomerService from "../../../../services/CustomerService";

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
    const [mainDialog, setMainDialog] = React.useState(false);
    const [addDialog, setAddDialog] = React.useState(false);
    const [checkUser , setCheckUser] = React.useState(false);
    const [user , setUser] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('Assign customer');

    console.log(props.customers);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customerName) {
            getCustomerName();
        }
    }, []);

    const getCustomerName = async () => {
        console.log(props.currentCustomer);

        if(await props.currentCustomer === 0){
            setCustomerName('Assign customer');
            return false;
        }
        const customers = await props.customers;
        const currentCustomer = customers.filter((customer) => customer.customerId === props.currentCustomer)[0];

        const newCustomer = await new CustomerService().getCustomerName(currentCustomer);
        //const newCustomer =
        await setCustomerName(newCustomer);
    };

    //const customerName = props.currentCustomer === 0 ? 'Assign customer' : new CustomerService().getCustomerName((props.customers.filter(customer => customer.customerId === props.currentCustomer))[0]);


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

    const setCustomerHandler = (customer) => {
        props.setCustomerHandler(customer);
    };

    const setAddCustomerHandler = async() => {
        const lastCustomer = await new CustomerService().getLastCustomer();
        props.setCustomerHandler(lastCustomer.id);
        setAddDialog(false);
        setMainDialog(false);
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
                {props.currentCustomer === 0 ? <PersonAddIcon /> : ''}
                {customerName}
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
                setCustomer={setCustomerHandler.bind(this)}
                handleClose={() => setMainDialog(false)}
                openAddCustomerModal={openAddDialog.bind(this)}
            />

            <AddCustomerModal
                openCustomerAddState={addDialog}
                setCustomer={setAddCustomerHandler.bind(this)}
                handleClose={() => setAddDialog(false)}
            />

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
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    onClick={() => props.history.push(paths.sell)}
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