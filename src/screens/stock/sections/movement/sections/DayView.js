import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import StockMovementSection from '../../../../../components/Sections/StockMovementSection';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleDayView from './singleView/SingleDayView';
import SaleService from "../../../../../services/SaleService";
import StockMovementService from "../../../../../services/StockMovementService";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    }
  }));

const DayView = props => {
    const classes = useStyles();
    const pageName = props.pageName;

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [getDetails , setGetDetails] = useState(false);
    const [name , setName] = useState('');
    const [entries , setEntries] = useState([]);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!getDetails) {
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                setSelectedDate(activeHistoryIndex)
                getMovementDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getMovementDetails(selectedDate);
            }
        }
    });

    const getMovementDetails = async (date) => {
        console.log(date);
        let response = [];

        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);

            //response = await new SaleService().getProductSalesDetails('day', date , branchProduct.id);
        }else{
            response = await StockMovementService.getStockMovementListByDate('day', date);
        }

        setGetDetails(response);
        setEntries(response.entries);
        console.log(response)
    };

    const handleDateChange = date => {
        setSelectedDate(date);
        getMovementDetails(date)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    {/* <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        Sold items
                    </Typography> */}
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
                            style={{float: 'right', width: '140px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
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

            <StockMovementSection openingBalance='4' purchase='0' sales='50' closingBalance='30' difference='20' />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {entries.map((item , index) => <SingleDayView key={index} item={item}/>)}
            </Box>
        </div>
    )

  }

  export default withRouter(DayView);
