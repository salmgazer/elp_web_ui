import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import format from "date-fns/format";
import BoxDefault from '../../../../../components/Box/BoxDefault';

// import SaleService from '../../../../../services/SaleService';
import SingleCustomerInvoiceView from "../components/singleCustomerInvoiceView";


const SingleWeekView = props => {
    const invoice = props.invoice;
    const invoices = invoice.invoices;

    return(
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault mb-5'}
                style={{marginTop: '5px' }}
            >
                <Grid container className={`bordered pt-2 pb-2`}>
                    <Grid item xs={7}>
                        <span className='text-dark text-left' style={{ fontSize: '15px'}} >{format(new Date(invoice.day) , "eeee, MMMM do, yyyy")}</span>
                    </Grid>
                    <Grid item xs={5} className={`text-right pr-2`}>
                        <span className='text-dark font-weight-light text-right' style={{ fontSize: '13px'}} >Total : GHC {parseFloat(invoice.total).toFixed(2)}</span>
                    </Grid>
                </Grid>

                {
                    invoices.map((item) =>
                        <SingleCustomerInvoiceView key={item.id} invoice={item}/>
                    )
                }

            </BoxDefault>
        </div>

    );
};

export default SingleWeekView;
