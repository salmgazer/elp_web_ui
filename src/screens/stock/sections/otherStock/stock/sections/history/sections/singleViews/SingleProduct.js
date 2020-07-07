import React, {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EditIcon from '@material-ui/icons/Edit';
import MainDialog from '../../../../../../../../../components/Dialog/ProductDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from '../../../../../../../../../components/Tabs/TabPanel';
import Dates from '../../../../../../../../../components/Date/Date';
import Button from "@material-ui/core/Button/Button";
import ProductServiceHandler from "../../../../../../../../../services/ProductServiceHandler";
import SaleService from "../../../../../../../../../services/SaleService";
import format from "date-fns/format";
import QuantityInput from "../../../../../../../../Components/Input/QuantityInput";
import Avatar from "@material-ui/core/Avatar/Avatar";
import fromUnixTime from "date-fns/fromUnixTime";

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
    },
    tabPrimaryColor: {
        backgroundColor: `#daab59 !important`,
        color: `#daab59 !important`,
    },
  }));

const SingleDayProduct = props => {
    const saleEntry = props.saleEntry;
    const classes = useStyles();
    const [mainDialog, setMainDialog] = useState(false);
    const [value, setValue] = useState(0);
    const [product, setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [totalPrice , setTotalPrice] = useState('');
    const [quantity , setQuantity] = useState(false);
    const [selectedDate , setSelectedDate] = useState('');

    const [formFields , setFormFields] = useState({
        quantity: 1,
    });

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!product) {
            getProduct();
        }
    });

    const getProduct = async () => {
        const newProduct = await props.saleEntry.product.fetch();
        setProduct(newProduct);
        setImage(new ProductServiceHandler(product).getProductImage());
        setTotalPrice(new SaleService().getSaleEntrySellingPrice(props.saleEntry));
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);
        setQuantity(saleEntry.quantity);
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
        const {...oldFormFields} = formFields;

         if(name === 'quantity'){
            setTotalPrice((value * saleEntry.sellingPrice).toFixed(2));
            setQuantity(value);
            oldFormFields[name] = value;
            setFormFields(oldFormFields);
        }

    };

    const setDate = (value) => {
        setSelectedDate(value)
    };

    const deleteHistoryHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
        setMainDialog(false);
    };

    const updateSaleEntry = () => {
        props.updateSaleEntry(saleEntry.id, formFields);
        setMainDialog(false);
    };

    const updateDate = () => {
        const response = props.updateDateEntry(saleEntry.id, selectedDate);

        if(response){
            setSelectedDate('');
            setMainDialog(false);
        }
    };

    return(
        <div className="row pt-0 mx-auto text-center w-100" >
            <Grid container spacing={1} className={`bordered-sm rounded mb-3 pt-1 pb-1`}>
                <Grid item xs={3}>
                    <Avatar
                        alt={image}
                        src={image}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            margin: '10px auto',
                            textAlign: 'center',
                        }}
                    />
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className='text-dark font-weight-bold' style={{ fontSize: '14px', marginBottom: '5px'}} >{name}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginBottom: '5px'}}>Quantity: {quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'red', marginBottom: '5px'}}>Total Price: GHC {totalPrice}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>
                    <div className='text-dark font-weight-bold' style={{ fontSize: '13px', marginBottom: '10px'}} >{format(new Date(saleEntry.createdAt) , "h:mm a")}</div>
                    <EditIcon
                        onClick={openDialogHandler.bind(this)}
                        style={{fontSize: '20px', color: '#DAAB59', textAlign: 'right'}}
                    />
                </Grid>
            </Grid>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                        <Grid item xs={3}>
                            <Avatar
                                alt={image}
                                src={image}
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    margin: '10px auto',
                                    textAlign: 'center',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' >{product.name}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales: GHC {totalPrice}</div>
                            </div>
                        </Grid>

                        <Grid item xs={3} style={{marginTop: '30px'}}>
                            <DeleteIcon
                                onClick={deleteHistoryHandler.bind(this , saleEntry.id)}
                                style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                            />
                        </Grid>
                    </Grid>

                    <AppBar position="static" color={`default`}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            classes= {{
                                indicator: classes.tabPrimaryColor
                            }}
                        >
                            <Tab className={classes.tabs} label="Change date"  {...a11yProps(0)} />
                            <Tab className={classes.tabs} label="Change quantity"  {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>

                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} >

                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600', paddingTop: '100px'}}> Pick new date </label>

                            <Dates style={{margin: '5px 40px 0px 40px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', width: '150px'}} initialDate={fromUnixTime(saleEntry.entryDate)} getValue={setDate.bind(this)} />

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
                                        onClick={updateDate.bind(this)}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>

                        </TabPanel>

                        <TabPanel value={value} index={1}  >

                            <QuantityInput style={{width: '100%', margin: '50px', paddingBottom: '30px'}} label={`Quantity`} inputName="quantity" getValue={setInputValue.bind(this)} startValue={saleEntry.quantity}/>

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
                                        onClick={updateSaleEntry.bind(this)}
                                    >
                                        Save changes
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

export default SingleDayProduct;
