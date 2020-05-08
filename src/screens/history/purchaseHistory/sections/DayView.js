import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleDayView from './singleViews/SingleDayView';
import ProductDay from './singleViews/ProductDay';
import CardsSection from '../../../../components/Sections/CardsSection';
import PurchaseService from "../../../../services/PurchaseService";
import BranchStockService from "../../../../services/BranchStockService";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const DayView = props => {
    
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);
    const pageName = props.pageName;
    const [name , setName] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
        getPurchaseDetails(date);
      };

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!purchaseDetails) {
            getPurchaseDetails(selectedDate);
        }
    });

    const getPurchaseDetails = async (date) => {
        const response = await new PurchaseService().getPurchaseDetails('day', date);
        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);
        }
        setPurchaseDetails(response);
        setPurchases(response.purchases);
        console.log(response)
    };

    return(
        <div className={classes.root}>
            {/* {console.log(purchaseDetails.purchases)} */}

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    {pageName === false
                        ?
                        <Typography
                            style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                            className={`text-center text-dark`}
                        >
                            Purchased items
                        </Typography>
                        :
                        <Typography

                            style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                            className={`text-center text-dark`}
                        >
                        {name}
                        </Typography>

                    } 
                </Grid>

                <Grid item xs={6} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker"
                            className='text-dark font-weight-bold'
                            style={{float: 'right', width: '170px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
                            size='small'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>

            <CardsSection quantity={purchaseDetails.quantity} costPrice={purchaseDetails.costPrice} sellingPrice={purchaseDetails.sellingPrice} profit={purchaseDetails.profit} profitName="Expected Profit" />
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
                                    No purchases made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    pageName === false ?

                    purchases.map((purchase) => <SingleDayView  key={purchase.id} purchase={purchase} purchaseEntry={purchase} />)
                    :
                    purchases.map((purchase) => <ProductDay  key={purchase.id} purchase={purchase} purchaseEntry={purchase} prodName={name} />)

                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.map((item) => <SingleDayView  key={item.pro_id} item={item}/>)}
            </Box> */}
        </div>
    )
}

export default withRouter(DayView);