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
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Button from "@material-ui/core/Button/Button";
import QuantityInput from "../../../../Components/Input/QuantityInput";
import UnitCost from '../../../../Components/Input/UnitCost';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import format from "date-fns/format";


const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    },
    tabs: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#333333',
    }
  }));

const SingleDayView = props => {
    const classes = useStyles();
    const sale = props.sale;
    const [mainDialog, setMainDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [product, setProduct] = useState(false);
    const [name , setName] = useState(false);
    const [image , setImage] = useState(false);
    const [quantity , setQuantity] = useState(false);
    const [totalPrice , setTotalPrice] = useState(false);
    // const [saleEntries , setSaleEntries] = useState([]);

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity) {
            getProduct();
        }
    });

    const getProduct = async () => {
        //const newProduct = await sale.product.fetch();
        const newProduct = await props.saleEntry.product.fetch();
        setProduct(newProduct);
        setImage(new ProductServiceHandler(product).getProductImage());

        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);

        setTotalPrice(sale.sellingPrice * sale.quantity);
        setQuantity(sale.quantity);
    };

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

    const setInputValue = (name , value) => {
        setTotalPrice((value * sale.sellingPrice).toFixed(2));
        setQuantity(value);
    };

    const setPriceValue = (event) => {
        event.persist();

        setTotalPrice(event.target.value);
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
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' >{name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales: GHC {totalPrice}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Profit: GHC {(totalPrice) - (sale.costPrice * quantity)}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>
                    <span className='text-dark font-weight-bold' >{format(new Date(sale.createdAt) , "h:mm a")}</span>
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
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales: GHC {totalPrice}</div>
                            </div>
                        </Grid>

                        <Grid item xs={3} style={{marginTop: '30px'}}>
                            <DeleteIcon
                                onClick={deleteHistoryHandler.bind(this , sale.id)}
                                style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                            />
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
                            <Tab className={classes.tabs} label="Change price"  {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>

                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} >

                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600', paddingTop: '100px'}}> Pick new date </label>

                            <Dates style={{margin: '5px 40px 0px 40px', border: '1px solid #DAAB59', backgroundColor: '#FFFFFF', width: '150px'}} />

                        </TabPanel>

                        <TabPanel value={value} index={1}  >

                            <QuantityInput style={{width: '100%', margin: '50px', paddingBottom: '30px'}} label={`Quantity`} inputName="quantity" getValue={setInputValue.bind(this)} startValue={sale.quantity}/>

                        </TabPanel>

                        <TabPanel value={value} index={2}  >

                            {/* <UnitCost style={{margin: '50px'}} id="price_input" label={`Selling price`} inputName="costPrice" initialValue={totalPrice} getValue={setPriceValue.bind(this)} >
                                <FontAwesomeIcon  icon={faCalculator} fixedWidth />
                            </UnitCost> */}
                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> New selling price </label>

                            <Paper className={classes.root} id="selling_price" >
                                <InputBase
                                    className={`${classes.input} search-box text-center`}
                                    type="tel"

                                    value={totalPrice}
                                    name='sellingPrice'
                                    onChange={(event) => setPriceValue(event)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <FontAwesomeIcon  icon={faCalculator} fixedWidth />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Paper>
                          
                        </TabPanel>

                    </SwipeableViews>

                    <Grid container spacing={1} style={{marginTop: '50px'}}>
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

                </div>
            </MainDialog>

        </div>

    );
};

export default SingleDayView;
