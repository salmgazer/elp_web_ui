import React, {useEffect , useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EventIcon from '@material-ui/icons/Event';

import format from "date-fns/format";
import SaleService from '../../../../../services/SaleService';

const SingleWeekView = props => {
    const sale = props.sale;
    const [total , setTotal] = useState(false);
    const [profit , setProfit] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if ( !profit || !total) {
            getProfit();
        }
    });

    const getProfit = async () => {
        const total = await SaleService.getSaleEntryAmountById(sale.id);
        const profit = await SaleService.getSaleEntryProfitById(sale.id);

        setTotal(total);
        setProfit(profit);
    };

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={3}>
                <Card
                    className="shadow1"
                    style={{
                        margin: '5px auto',  
                        backgroundPosition: 'center', 
                        backgroundSize: 'cover', 
                        width: '60px', 
                        borderRadius: '50%', 
                        height: '60px', 
                        padding: '0px'
                    }}
                >
                    <EventIcon style={{position: 'center', marginTop: '20px'}} />
                </Card>
            </Grid>
            <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' > {format(new Date(sale.createdAt) , "eeee, MMMM do, yyyy")}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales made : GHC {total}</div>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Profit made : GHC {profit}</div>
                </div>
            </Grid>
        </Grid>
    );
};

export default SingleWeekView;