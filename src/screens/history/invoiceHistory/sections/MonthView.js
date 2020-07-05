import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";

import SingleMonthView from './singleView/SingleMonthView';
import CustomerMonth from './singleView/CustomerMonth';
import CardsSection from '../../../../components/Sections/CardsSection';
import InvoiceService from '../../../../services/InvoiceService';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import Empty from '../../../../assets/img/empty.png';
import paths from "../../../../utilities/paths";
import EmptyContainer from "../../../../components/Empty/EmptyContainer";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginBottom: '4rem'
    }
}));

const values = new SystemDateHandler().getStoreMonths();

const MonthView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedMonth, setSelectedMonth] = React.useState(values[(new Date().getMonth())].value);
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [customer , setCustomer] = useState('');
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);

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
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                setSelectedMonth(activeHistoryIndex);
                getInvoiceDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getInvoiceDetails(selectedMonth);
            }
        }
    });

    const getInvoiceDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchCustomer = props.customer[0];
            const newCustomer = await branchCustomer.customer.fetch();

            response = await new InvoiceService().getInvoiceDetailsbyCustomer('month' , date , newCustomer.id);

            setName(newCustomer.firstName);
            setCustomer(newCustomer);
        }else{
            response = await new InvoiceService().getInvoiceDetails('month' , date);
        }
        setHeaderText('Seems you don\'t have any sales available');
        setEmptyBtnState(true);
        setInvoiceDetails(response);
        setInvoices(response.invoices);
    };

    const getChildrenDetails = (index) => {
        props.getChildrenView(index , 2)
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
                    <EmptyContainer
                        buttonAction={() => history.push(paths.sell)}
                        imageLink={Empty}
                        headerText={headerText}
                        button={emptyBtnState}
                        btnText="Record sales"
                    />
                    :
                    pageName === false ?

                    invoices.map((invoice , index) =>
                    <div key={index} onClick={getChildrenDetails.bind(this, invoice.index)}>
                        <SingleMonthView  key={index} invoice={invoice} />
                    </div>
                    )
                    :
                    invoices.map((invoice , index) =>
                    <div key={index} onClick={getChildrenDetails.bind(this, invoice.index)}>
                        <CustomerMonth customer={customer} key={index} invoice={invoice} prodName={name} />
                    </div>
                    )
                }
        </div>
    )
  };

  export default withRouter(MonthView);
