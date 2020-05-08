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

import SingleDayView from './productViews/SingleDayView';
import SingleProductDay from './productViews/SingleProductDay';
import CardsSection from '../../../../components/Sections/CardsSection';
import SaleService from "../../../../services/SaleService";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const DayView = props => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [saleDetails , setSaleDetails] = useState(false);
    const [sales , setSales] = useState([]);
    const pageName = props.pageName;

    const [name , setName] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
        getSaleDetails(date);
      };

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!saleDetails) {
            getSaleDetails(selectedDate);
        }
    });

    const getSaleDetails = async (date) => {
        const response = await new SaleService().getSalesDetails('day', date);
        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);
        }

        setSaleDetails(response);
        setSales(response.sales);
        console.log(response)
    };

    return(
        <div className={classes.root}>
            {console.log(saleDetails.sales)}

            <Grid container spacing={1}>
                <Grid item xs={6} >

                        {pageName === false
                            ?
                            <Typography
                                style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                                className={`text-center text-dark`}
                            >
                                Sold items
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

            <CardsSection quantity={saleDetails.quantity} costPrice={saleDetails.costPrice} sellingPrice={saleDetails.sellingPrice} profit={saleDetails.profit} profitName="Profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Profit" /> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {sales.length === 0
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

                    // sales.map((sale) => <SingleDayView  key={sale.id} sale={sale} />)
                    pageName === false ?

                    sales.map((sale) => <SingleDayView  key={sale.id} sale={sale} saleEntry={sale} />)
                    :
                    sales.map((sale) => <SingleProductDay  key={sale.id} sale={sale} saleEntry={sale} prodName={name} />)

                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.map((item) => <SingleDayView  key={item.pro_id} item={item}/>)}
            </Box> */}
        </div>
    )
}

export default withRouter(DayView);
