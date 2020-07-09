import React, {useEffect, useState} from "react";
import {withRouter } from "react-router-dom";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import DateToggle from '../../../../components/DateToggle/DateToggle';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import CardsSection from '../../../../components/Sections/CardsSection';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import InvoiceService from '../../../../services/InvoiceService';
import CustomerWeek from '../../../history/invoiceHistory/sections/singleView/CustomerWeek';

const WeekView = props => {

    const values = new SystemDateHandler().getStoreWeeks();
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [customer , setCustomer] = useState('');
    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);

    const handleChange = event => {
        setSelectedWeek(event.target.value);
        getInvoiceDetails(event.target.value);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
          if (!invoiceDetails) {
              getInvoiceDetails(selectedWeek);
          }
      });

      const getInvoiceDetails = async (date) => {
          let response = [];

          if (pageName === true){
              const branchCustomer = props.customer[0];
              const newCustomer = await branchCustomer.customer.fetch();

              response = await new InvoiceService().getInvoiceDetailsbyCustomer('week' , date , newCustomer.id);

              setName(newCustomer.firstName);
              setCustomer(newCustomer);
          }else{
              response = await new InvoiceService().getInvoiceDetails('week' , date);
          }
          setInvoiceDetails(response);
          setInvoices(response.invoices);
      };

    const setView = (step) => {
        props.setView(step);
    };

    return (
        <div>

            <SectionNavbars
                title="Sales returns"
                leftIcon={
                    <div onClick={() => setView(1)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftOnClick={() => setView(1)}
            />

            <Grid container spacing={2} style={{marginTop: '60px'}} className={`pt-2`}>
                <Grid item xs={12} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                    <Typography  style={{ fontSize: '15px', marginBottom: '10px'}} >
                        Select the date the returned item was purchased
                    </Typography>
                </Grid>
            </Grid>

            <DateToggle setView={props.setStepContentView} />

            <Grid container spacing={1} style={{marginTop: '5px', borderTop: "1px solid #d8d2d2"}}>
                <Grid item xs={4} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                         {name}
                    </Typography>
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedWeek}
                        style={{width: '220px',  margin: '10px 0px', fontSize: '5px'}}
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
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Profit" /> */}

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

                    invoices.map((invoice , index) => <CustomerWeek customer={customer} key={index} invoice={invoice} prodName={name} />)

                }
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                    onClick={() => setView(1)}
                >
                    Back
                </Button>
            </Box>

        </div>
    )
}

export default withRouter(WeekView);
