import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleMonthView from './singleViews/SingleMonthView';
import CardsSection from '../../../../components/Sections/CardsSection';
import DateServiceHandler from "../../../../services/SystemDateHandler";
import PurchaseService from "../../../../services/PurchaseService";

const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,
    }
}));

const values = new DateServiceHandler().getStoreYears()

const WeekView = props => {
    console.log(new DateServiceHandler().getStoreYears());
    
    const classes = useStyles();
    const [selectedYear, setSelectedYear] = React.useState(values[0].value);

    const handleChange = event => {
        setSelectedYear(event.target.value);
        getPurchaseDetails(event.target.value);
    };

    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!purchaseDetails) {
            getPurchaseDetails(selectedYear);
        }
    });

    const getPurchaseDetails = async (date) => {
        const response = await new PurchaseService().getPurchaseDetails('year', date);
        setPurchaseDetails(response);
        setPurchases(response.sales);
        console.log(response)
    };


    return(
        <div className={classes.root}>


            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography style={{fontSize: '14px', paddingTop: '20px'}} >
                        {props.pageName}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedYear}
                        style={{width: '150px',  margin: '10px 0px', fontSize: '7px'}}
                        onChange={handleChange}
                        color="#DAAB59"
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        >
                        {values.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            {/* <CardsSection quantity={purchaseDetails.quantity} costPrice={purchaseDetails.costPrice} sellingPrice={purchaseDetails.sellingPrice} profit={purchaseDetails.profit} profitName="Expected Profit" /> */}
            <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Expected Profit" />


            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {purchases.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No purchases made this day
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    purchases.map((purchase) => <SingleYearView  key={purchase.id} purchase={purchase} date={selectedYear} />)
                }
            </Box> */}

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.weekItem.map((item) => <SingleYearView  key={item.day_id} weekItems={item}/>)}
            </Box> */}


        </div>
    )

}

export default withRouter(WeekView);