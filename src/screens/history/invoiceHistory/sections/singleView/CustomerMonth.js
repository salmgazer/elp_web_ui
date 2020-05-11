import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import format from "date-fns/format";
import BoxDefault from '../../../../../components/Box/BoxDefault';

import SaleService from '../../../../../services/SaleService';


const CustomerMonth = props => {
    /*
    * @todo format receipt number as required...
    * */
   const invoice = props.invoice;
   const prodName = props.prodName;
   const [customer , setCustomer] = useState(false);
   const [total , setTotal] = useState(false);
   const [payment , setPayment] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer || !payment || !total) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const response = await invoice.customer.fetch();
        /*
        * @todo get entries via query on model
        * */
        const saleTotal = await SaleService.getSaleEntryAmountById(invoice.id);
        const paymentStatus = await SaleService.getSalePaymentStatus(invoice.id);
        setCustomer(response);
        setTotal(saleTotal);
        setPayment(paymentStatus);
    };

    return(
        <div>
            {prodName === `${customer.firstName}`
                ?
                <div>
                    <Grid container className={`bordered`}>
                        <Grid item xs={12}>
                            <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{format(new Date(invoice.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(invoice.createdAt) , "h:mm a")}</span>
                        </Grid>
                    </Grid>

                    <Grid container className={`bordered`}>

                        <Grid item xs={1} />

                        <Grid item xs={7} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{`${customer.firstName} ${customer.otherNames}`}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total business: GHC {total}</div>
                            </div>
                        </Grid>

                        <Grid item xs={4} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className="font-weight-light mt-1" style={{ fontSize: '10px', color: 'red'}}> {payment} </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                :
                ''
            }
        </div>
    );
};

export default CustomerMonth;