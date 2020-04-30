import React, {useEffect, useState}  from 'react';
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

import SingleDaySupplierView from './singleView/SingleDaySupplier';
import CardsSection from '../../../../../components/Sections/CardsSection';
import OrderService from "../../../../../services/OrderService";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const DayView = props => {
    
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [orderDetails , setOrderDetails] = useState(false);
    const [orders , setOrders] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
        getOrderDetails(date);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
          if (!orderDetails) {
            getOrderDetails(selectedDate);
          }
      });
  
      const getOrderDetails = async (date) => {
          const response = await new OrderService().getOrderDetails('day' , date);
          setOrderDetails(response);
          setOrders(response.invoices);
          console.log(response)
      };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Typography style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}} >
                        {/* {props.pageName} */}Purchased items
                    </Typography>
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
                            style={{float: 'right', width: '170px'}}
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
                
            <CardsSection quantity={orderDetails.quantity} costPrice={orderDetails.costPrice} sellingPrice={orderDetails.sellingPrice} profit={orderDetails.credit} profitName="Amount owed" />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {orders.length === 0
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
                                    No sales made this day
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    // orders.map((order) => <SingleDaySupplierView  key={order.id} order={order} />)
                    props.suppliers.map((item) => <SingleDaySupplierView  key={item.supp_id} supp={item} indProducts={props.products} setView={props.setView}/>)
                }
            </Box>
            {/* <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.suppliers.map((item) => <SingleDaySupplierView  key={item.supp_id} supp={item} indProducts={props.products} setView={props.setView}/>)}
            </Box> */}

        </div>
    )

  }

  export default withRouter(DayView);