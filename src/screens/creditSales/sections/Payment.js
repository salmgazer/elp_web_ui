import React, { useState, useEffect } from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box/Box";
import Transfer from '../../../assets/img/transfer.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";
import InvoiceService from "../../../services/InvoiceService";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    }
    
  }));

const Payment = props => {

    const classes = useStyles();
    const customer = props.customer[0];
    const [invoiceDetails , setInvoiceDetails] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!invoiceDetails) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const response = await new InvoiceService().getDetailsbyCustomer(customer.customerId);
        setInvoiceDetails(response);
        console.log(response);
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    return(
        <div className={classes.root} >

            <SectionNavbars
                title="Payment"
                leftIcon={
                    <div onClick={backHandler.bind(this)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />
            {/* <ArrowBackIcon  style={{position: 'relative', float: 'left', fontSize: '2rem', marginLeft: '10px'}}
                onClick={backHandler.bind(this)}

            /> */}

            <Box component="div" m={2} style={{marginTop: '4rem'}}>
                <img className="img100" src={Transfer} alt={'payment'}/>
            </Box>

            <Paper elevation={3}>
                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', marginBottom: '10px', padding: '20px' }} >
                    Amount owed : GHC {invoiceDetails.credit}
                </Typography>
            </Paper>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '17px', marginBottom: '10px', color: '#DAAB59' }} >
                    Total due : GHC {invoiceDetails.credit}
            </Typography>

            <TextField
                label="Enter amount paid"
                variant="outlined"
                size="small"
                type="tel"
                name={`amountPaid`}
                style={{margin: '25px'}}
            />

            <Button
                variant="contained"
                style={{
                    backgroundColor: '#DAAB59', 
                    color: '#333333', 
                    padding: '5px 50px', 
                    textTransform: 'none', 
                    fontSize: '20px', 
                    marginTop: '10px'
                }}       
            >
                    Finish
            </Button>

        </div>
    )

}

  export default withRouter(Payment);