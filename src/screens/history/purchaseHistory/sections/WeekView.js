import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleViews/SingleWeekView';
import CardsSection from '../../../../components/Sections/CardsSection';
import DateServiceHandler from "../../../../services/SystemDateHandler";
import PurchaseService from "../../../../services/PurchaseService";
import BranchStockService from "../../../../services/BranchStockService";

const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,
    }
}));

const values = new DateServiceHandler().getStoreWeeks()

const WeekView = props => {
    console.log(new DateServiceHandler().getStoreWeeks());
    
    const classes = useStyles();
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);

    const handleChange = event => {
        setSelectedWeek(event.target.value);
        getPurchaseDetails(event.target.value);
    };

    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);
    const [quantity , setQuantity] = useState(false);
    const [costPrice , setCostPrice] = useState(false);
    const [sellingPrice , setSellingPrice] = useState(false);
    const [expProfit , setExpProfit] = useState(false);

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!purchaseDetails) {
            getPurchaseDetails(selectedWeek);
        }
    });

    const getPurchaseDetails = async (date) => {
        const response = await new PurchaseService().getPurchaseDetails('week', date);
        const q = await new BranchStockService().getCompanyItemsLeft();
        const c = await new BranchStockService().getTotalCostPrice();
        const s = await new BranchStockService().getTotalSellingPrice();
        const e = await new BranchStockService().getTotalExpectedProfit();
        setQuantity(q);
        setCostPrice(c);
        setSellingPrice(s);
        setExpProfit(e);
        setPurchaseDetails(response);
        setPurchases(response.purchases);
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
                        value={selectedWeek}
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

            <CardsSection quantity={quantity} costPrice={costPrice} sellingPrice={sellingPrice} profit={expProfit} profitName="Expected Profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Expected Profit" /> */}


            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
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
                                    No purchases made this week
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    purchases.map((purchase) => <SingleWeekView  key={purchase.id} purchase={purchase} date={selectedWeek} />)
                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.weekItem.map((item) => <SingleWeekView  key={item.day_id} weekItems={item}/>)}
            </Box> */}


        </div>
    )

}

export default withRouter(WeekView);