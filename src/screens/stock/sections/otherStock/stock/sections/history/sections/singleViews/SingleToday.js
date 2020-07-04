import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import SaleService from "../../../../../../../../../services/SaleService";
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime';
import Button from "@material-ui/core/Button/Button";


const SingleDayView = props => { 
    const [sale , setSale] = useState('');
    const [customerName , setCustomerName] = useState('');
    const [totalPrice , setTotalPrice] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!sale) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const sale = await props.sale;
        console.log(sale)
        setSale(sale);
        const saleCustomer = await sale.customer.fetch();
        setCustomerName(saleCustomer.firstName + ' ' + saleCustomer.otherNames);
        const saleTotal = await SaleService.getSaleEntryAmountById(sale.id);
        setTotalPrice(saleTotal);
        console.log(sale)
    };



    return(
        
            sale.type === 'gift' || sale.type === 'damaged' || sale.type === 'expired' || sale.type === 'family' 
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
                        >
                            View more
                        </Button>
                    </Grid>
                </Grid>
                :
                ''  
        
    );
};

export default SingleDayView;
