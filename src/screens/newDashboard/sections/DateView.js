import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';

import SalesView from './SalesView';

const DateView = props => {

    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });

    return(
        <div>
            <Grid container spacing={1}>

                <Grid item xs={2}>
                    <Paper style={{backgroundColor: 'black', color: 'white', height: '50px'}} >Today</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper >{(date.getDate()+1)} {month}</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper >{(date.getDate()+2)} {month}</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper >{(date.getDate()+3)} {month}</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper >{(date.getDate()+4)} {month}</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper >{(date.getDate()+5)} {month}</Paper>
                </Grid>
            </Grid>

            <SalesView totalAmount="200" profitMade="50" creditSales="10" totalStock="300" />
        </div>

    )

}

export default DateView;