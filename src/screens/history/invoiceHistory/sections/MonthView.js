import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleMonthView from './singleView/SingleMonthView';
import CustomerMonth from './singleView/CustomerMonth';
import BoxDefault from '../../../../components/Box/BoxDefault';
import CardsSection from '../../../../components/Sections/CardsSection';
import InvoiceService from '../../../../services/InvoiceService';
import SystemDateHandler from "../../../../services/SystemDateHandler";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
}));

const values = new SystemDateHandler().getStoreMonths()

const MonthView = props => {
    const classes = useStyles();
    const [selectedMonth, setSelectedMonth] = React.useState(values[(new Date().getMonth())].value);
    const pageName = props.pageName;
    const [name , setName] = useState('');

    const handleChange = event => {
      setSelectedMonth(event.target.value);
      getInvoiceDetails(event.target.value);
    };

    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
        if (!invoiceDetails) {
            getInvoiceDetails(selectedMonth);
        }
    });

    const getInvoiceDetails = async (date) => {
        console.log(date);
        let response = [];

        if (pageName === true){
            response = await new InvoiceService().getInvoiceDetails('month' , date);

            const branchCustomer= props.customer[0];
            const newCustomer = await branchCustomer.customer.fetch();
            setName(newCustomer.firstName);
        }else{
            response = await new InvoiceService().getInvoiceDetails('month' , date);
        }
        setInvoiceDetails(response);
        setInvoices(response.invoices);
        console.log(response)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        Sold items
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedMonth}
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

            <CardsSection quantity={invoiceDetails.quantity} costPrice={invoiceDetails.costPrice} sellingPrice={invoiceDetails.sellingPrice} profit={invoiceDetails.profit} profitName="Sales profit" />


                {invoices.length === 0
                    ?
                    <BoxDefault
                        bgcolor="background.paper"
                        p={1}
                        className={'boxDefault'}
                        style={{marginTop: '5px' }}
                    >
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
                    </BoxDefault>
                    :
                    pageName === false ?

                    invoices.map((invoice , index) => <SingleMonthView  key={index} invoice={invoice} />)
                    :
                    invoices.map((invoice) => <CustomerMonth  key={invoice.id} invoice={invoice} prodName={name} />)

                }

        </div>
    )
  }

  export default withRouter(MonthView);
