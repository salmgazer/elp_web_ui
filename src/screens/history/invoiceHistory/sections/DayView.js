import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleDayInvoice from './singleView/SingleDayInvoice';
import InvoiceService from "../../../../services/InvoiceService";
import CardsSection from '../../../../components/Sections/CardsSection';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    search: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '25px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
  }));

  const DayView = props => {
    
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const pageName = props.pageName;
    const [name , setName] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
        getInvoiceDetails(date);
    };

    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
        if (!invoiceDetails) {
            getInvoiceDetails(selectedDate);
        }
    });

    const getInvoiceDetails = async (date) => {
        const response = await new InvoiceService().getInvoiceDetails('day' , date);
        if (pageName === true){
            const branchCustomer= props.customer[0];
            const newCustomer = await branchCustomer.customer.fetch();
            setName(newCustomer.firstName);
        }
        setInvoiceDetails(response);
        setInvoices(response.invoices);
        console.log(response)
    };

    return(
        <div className={classes.root}>
            {console.log(invoiceDetails.invoices)}

            <Grid container spacing={1}>
            
                <Grid item xs={6} style={{padding: '2px 4px', marginTop: '10px'}}>
                    <Paper className={classes.search} >
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            style={{fontSize: '11px'}}
                            className={`${classes.input} search-box`}
                            placeholder="Search for an invoice"
                            inputProps={{ 'aria-label': 'Search for an invoice' }}
                        />
                    </Paper>
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
                            style={{float: 'right', width: '150px'}}
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

            <CardsSection quantity={invoiceDetails.quantity} costPrice={invoiceDetails.costPrice} sellingPrice={invoiceDetails.sellingPrice} profit={invoiceDetails.credit} profitName="Amount owed" />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {invoices.length === 0
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
                                    No sales made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    pageName === false ?

                    invoices.map((invoice) => <SingleDayInvoice  key={invoice.id} invoice={invoice} />)
                    :
                    invoices.map((invoice) => <SingleDayInvoice  key={invoice.id} invoice={invoice} prodName={name} />)

                }
            </Box>
        </div>
    )

  }

  export default withRouter(DayView);