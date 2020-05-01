import React, {useEffect, useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box/Box";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleView/SingleWeekView';
import BoxDefault from '../../../../components/Box/BoxDefault';
import CardsSection from '../../../../components/Sections/CardsSection';
import InvoiceService from '../../../../services/InvoiceService';
import SystemDateHandler from "../../../../services/SystemDateHandler";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 9,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 50px',
        marginRight: '10px',
        marginTop: '10px',
        textTransform: 'none',
    }
  }));

  const values = new SystemDateHandler().getStoreWeeks()

  const WeekView = props => {
    console.log(new SystemDateHandler().getStoreWeeks());

    const classes = useStyles();
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);

    const handleChange = event => {
        setSelectedWeek(event.target.value);
        getInvoiceDetails(event.target.value);
    };

    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
        if (!invoiceDetails) {
            getInvoiceDetails(selectedWeek);
        }
    });

    const getInvoiceDetails = async (date) => {
        console.log(date);
        const response = await new InvoiceService().getInvoiceDetails('week' , date);

        setInvoiceDetails(response);
        setInvoices(response.invoices);
        console.log(response)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}} >
                        Purchased items
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
                                    No sales made this week
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    <BoxDefault
                        bgcolor="background.paper"
                        p={1}
                        className={'boxDefault'}
                        style={{marginTop: '5px' }}
                    >
                        {/* <Grid container className={`bordered`}>
                            <Grid item xs={8}>
                                <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >Week 1: 01/03/20 - 07/03/20</span>
                            </Grid>

                            <Grid item xs={4}>
                                <span className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total : GHC 100</span>
                            </Grid>
                        </Grid> */}

                        { invoices.map((invoice) => <SingleWeekView  key={invoice.id} invoice={invoice} />)}

                    </BoxDefault>
                }


            </Box>

        </div>
    )

  }

  export default withRouter(WeekView);
