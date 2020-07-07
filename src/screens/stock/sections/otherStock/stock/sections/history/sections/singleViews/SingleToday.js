import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import SaleService from "../../../../../../../../../services/SaleService";
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime';
import Button from "@material-ui/core/Button/Button";
import MainDialog from '../../../../../../../../../components/Dialog/ProductDialog';
import SingleProduct from './SingleProduct';
import Box from "@material-ui/core/Box/Box";
import Typography from '@material-ui/core/Typography';
import CardDefault from '../../../../../../../../../components/Cards/CardDefault';
import Dates from '../../../../../../../../../components/Date/Date';


const SingleDayView = props => { 
    const [sale , setSale] = useState('');
    const [saleEntries , setSaleEntries] = useState([]);
    const [customerName , setCustomerName] = useState('');
    const [totalPrice , setTotalPrice] = useState(false);
    const [mainDialog, setMainDialog] = useState(false);
    const [dateDialog, setDateDialog] = useState(false);
    const [selectedDate , setSelectedDate] = useState('');

    const closeDateHandler = (event) => {
        setDateDialog(false);
    };

    const openDateHandler = (event) => {
        setDateDialog(true);
    };

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!sale) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const sale = await props.sale;
        setSale(sale);
        const saleCustomer = await sale.customer.fetch();
        setCustomerName(saleCustomer.firstName + ' ' + saleCustomer.otherNames);
        const saleTotal = await SaleService.getSaleEntryAmountById(sale.id);
        setTotalPrice(saleTotal);
        const entries = await sale.salesEntries(); 
        setSaleEntries(entries);
    };

    const deleteProductHandler = (event) => {
        props.deleteProduct(event);
    };

    const setDate = (value) => {
        setSelectedDate(value)
    };

    const updateDate = () => {
        const response = props.updateDateEntry(sale.id, selectedDate);

        if(response){
            setSelectedDate('');
            setMainDialog(false);
        }
    };

    return(
        <div>    
            {sale.type === 'gift' || sale.type === 'damaged' || sale.type === 'expired' || sale.type === 'family' 
                ?
                <Grid container spacing={1} className={`bordered-sm mb-3`} style={{borderRadius: '4px'}}>
                    <Grid item xs={8} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '16px'}}>{customerName}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>{ format(new Date(fromUnixTime(sale.salesDate)) , "do MMMM, yyyy | h:mm a") } </div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>GHC {totalPrice}</div>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{height: '60px', margin: '10px 0px 0px 0px'}}>
                        <span className='text-dark font-weight-bold' style={{fontSize: '13px', textTransform: 'capitalize'}}>{sale.type}</span> <br />
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 9px', textTransform: 'none', fontSize:'12px'}}
                            onClick={openDialogHandler.bind(this)} 
                        >
                            View more
                        </Button>
                    </Grid>
                </Grid>
                :
                '' 
            }

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    {sale.type === 'gift' || sale.type === 'damaged' || sale.type === 'expired' || sale.type === 'family' 
                        ?
                            <Grid container spacing={1} className={`shadow1 mb-3 `} >

                                <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                        <div className='text-dark font-weight-bold' style={{ fontSize: '16px', marginLeft: '10px'}} >{customerName}</div>
                                        <div className="font-weight-light mt-1" style={{ fontSize: '15px', marginLeft: '10px'}}>{ format(new Date(fromUnixTime(sale.salesDate)) , "do MMMM, yyyy") }</div>
                                        <div className="font-weight-light mt-1" style={{ fontSize: '15px', marginLeft: '10px'}}>{ format(new Date(fromUnixTime(sale.salesDate)) , "h:mm a") }</div>
                                    </div>
                                </Grid>

                                <Grid item xs={5} style={{height: '60px', margin: '10px 0px', textAlign: '-webkit-center'}}>  
                                    <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'right'}}>
                                        <div className="font-weight-bold" style={{ fontSize: '16px', textTransform: 'capitalize'}}>{sale.type}</div> 
                                    </div>                               
                                </Grid>

                            </Grid>
                        :
                        ''
                    }

                    <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                        {saleEntries.map((item) => <SingleProduct  key={item.id} saleEntry={item} deleteStoreProduct={deleteProductHandler.bind(this)} updateSaleEntry={props.updateSaleEntry} updateDateEntry={props.updateDateEntry} />)}
                    </Box>

                    <CardDefault styles={{width: '90%', marginTop: '5px', marginBottom: '10px'}}>
                        <Typography
                            className='text-dark font-weight-bold'
                            style={{fontSize: '18px', padding: '5px', color: 'black'}}
                        >
                            Total cost : GHC {parseFloat(totalPrice).toFixed(2)}

                        </Typography>
                    </CardDefault>

                    <Grid container style={{textAlign: 'center', paddingBottom: '20px'}}>
                        <Grid item xs={4} onClick={openDateHandler.bind(this)} style={{ color: '#DAAB59'}}>
                            Change date
                        </Grid>

                        <Grid item xs={4} />

                        <Grid item xs={4} onClick={closeDialogHandler.bind(this)}  style={{ color: '#DAAB59'}}>
                            Close
                        </Grid>                            
                    </Grid>

                </div>
            </MainDialog>

            <MainDialog handleDialogClose={closeDateHandler.bind(this)} states={dateDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Grid container spacing={1} className={`shadow1 mb-3 `} >
                        <Grid item xs={12} style={{display: 'table', height: '20px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className='text-dark font-weight-bold' style={{ fontSize: '16px', marginLeft: '10px'}} >Change date</div>
                            </div>
                        </Grid>
                    </Grid>

                    <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600', paddingTop: '100px'}}> Pick a new date </label>

                    <Dates style={{margin: '5px 40px 0px 40px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', width: '150px'}} initialDate={fromUnixTime(sale.salesDate)} getValue={setDate.bind(this)} />

                    <Grid container spacing={1} style={{marginTop: '50px'}}>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                onClick={closeDateHandler.bind(this)}
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

                </div>
            </MainDialog>
        </div> 
        
    );
};

export default SingleDayView;
