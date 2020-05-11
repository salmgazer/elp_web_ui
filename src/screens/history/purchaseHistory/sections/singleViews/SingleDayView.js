import React, {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EditIcon from '@material-ui/icons/Edit';
import MainDialog from '../../../../../components/Dialog/MainDialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from '../../../../../components/Tabs/TabPanel';
import Dates from '../../../../../components/Date/Date';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import QuantityInput from "../../../../Components/Input/QuantityInput";

import format from "date-fns/format";
import BranchStockService from '../../../../../services/BranchStockService';
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";


const useStyles = makeStyles(theme => ({
    tabs: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#333333',
    }
  }));

const SingleDayView = props => {
    const classes = useStyles();
    const [mainDialog, setMainDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const purchase = props.purchase;
    const [quantity , setQuantity] = useState(false);
    const [costPrice , setCostPrice] = useState(false);
    const [name , setName] = useState(false);
    const [image , setImage] = useState(false);
    const [product, setProduct] = useState(false);

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    // const image = `https://elparah.store/admin/upload/${product.image}`;

    const closeDialogHandler = (event) => {
        setMainDialog(false);
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

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity) {
            getProduct();
        }
    });

    const getProduct = async () => {
        //const newProduct = await purchase.product.fetch();
        /*
        * @todo get entries via query on model
        * */
        const newProduct = await props.purchaseEntry.product.fetch();
        setProduct(newProduct);
        setImage(new ProductServiceHandler(product).getProductImage());
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);


        const costP = await BranchStockService.getStockEntryCostPriceById(purchase.id);
        const quant = await BranchStockService.getStockProductQuantity(purchase.id);
        // setProduct(newProduct);
        // setName(new ProductServiceHandler(product).getProductName());
        // setImage(new ProductServiceHandler(product).getProductImage());
        setCostPrice(costP);
        setQuantity(quant);

    };

    const setInputValue = (name , value) => {
        setQuantity(value);
    };

    const deleteHistoryHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
        setMainDialog(false);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}>
                    <Card
                        className="shadow1"
                        style={{
                            margin: '5px auto', 
                            backgroundImage: `url(${image})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            width: '60px', 
                            borderRadius: '50%', 
                            height: '60px', 
                            padding: '0px'
                        }}
                    />
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost: GHC {costPrice}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>  
                    <span className='text-dark font-weight-bold' >{format(new Date(purchase.createdAt) , "h:mm a")}</span>                     
                    <EditIcon
                        onClick={openDialogHandler.bind(this)}
                        style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                    /> 
                </Grid>
            </Grid>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                        <Grid item xs={3}>
                            <Card
                                className="shadow1"
                                style={{
                                    margin: '15px auto', 
                                    backgroundImage: `url(${image})`, 
                                    backgroundPosition: 'center', 
                                    backgroundSize: 'cover', 
                                    width: '60px', 
                                    borderRadius: '50%', 
                                    height: '60px', 
                                    padding: '0px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' >{name}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost: GHC {costPrice}</div>
                            </div>
                        </Grid>

                    </Grid>
                    
                    <AppBar position="static" color="white">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab className={classes.tabs} label="Change date"  {...a11yProps(0)} />
                            <Tab className={classes.tabs} label="Change quantity"  {...a11yProps(1)} />
                            <Tab className={classes.tabs} label="Delete purchase"  {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>

                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} >

                            <Dates label="Pick new date" style={{margin: '40px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF'}} />

                            <Grid container spacing={1} >
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </TabPanel>

                        <TabPanel value={value} index={1}  >

                            <QuantityInput style={{width: '100%', margin: '50px'}} label={`Quantity`} inputName="quantity" getValue={setInputValue.bind(this)} startValue={quantity}/>

                            <Grid container spacing={1} style={{marginTop: '50px'}} >
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>

                        </TabPanel>

                        <TabPanel value={value} index={2}  >
                            <Typography
                                component="h1"
                                variant="h2"
                                style={{fontSize: '25px',  margin: '50px 0px'}}
                                className={`text-center font-weight-bold`}
                            >
                                Are you sure you want to delete this purchase?
                            </Typography>
                        
                            <Grid container spacing={1} >
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={deleteHistoryHandler.bind(this , purchase.id)}
                                    >
                                        Yes, delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabPanel>

                    </SwipeableViews>   
                    
                </div>
            </MainDialog>

        </div>

    );
};

export default SingleDayView;