import React from 'react';
import CardDefault from "../../Components/Cards/CardDefault";
import Typography from "@material-ui/core/Typography/Typography";

import SalesView from './SalesView';

const WeekView = props => {

    const currDate = new Date();
    const newdate = new Date();
    newdate.setDate(currDate.getDate()-7);
    
    return(
        <div>
            <CardDefault styles={{width: '95%', marginTop: '5px'}}>
                <Typography
                    component="p"
                    style={{fontSize: '17px'}}
                >
                    Sales from {newdate.toDateString()} to {currDate.toDateString()} 
                </Typography>
            </CardDefault>

            <SalesView totalAmount="400" profitMade="100" creditSales="20" totalStock="500" />
        </div>
    )

}

export default WeekView;