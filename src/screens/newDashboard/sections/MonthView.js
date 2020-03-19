import React from 'react';
import CardDefault from "../../Components/Cards/CardDefault";
import Typography from "@material-ui/core/Typography/Typography";

import SalesView from './SalesView';

const MonthView = props => {

    const fullYear = { year: 'numeric', month: 'long'};
    
    return(
        <div>
            <CardDefault styles={{width: '95%', marginTop: '5px'}}>
                <Typography
                    component="p"
                    style={{fontSize: '18px'}}
                >
                    Sales for {new Date().toLocaleDateString([], fullYear)}
                    
                </Typography>
            </CardDefault>

            <SalesView totalAmount="1230" profitMade="900" creditSales="60" totalStock="1000" />
        </div>
    )

}

export default MonthView;