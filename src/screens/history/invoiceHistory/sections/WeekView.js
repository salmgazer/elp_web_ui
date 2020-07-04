import React, {useEffect, useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleView/SingleWeekView';
import CustomerWeek from './singleView/CustomerWeek';
import CardsSection from '../../../../components/Sections/CardsSection';
import InvoiceService from '../../../../services/InvoiceService';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import Empty from '../../../../assets/img/empty.png';
import paths from "../../../../utilities/paths";
import startOfWeek from "date-fns/startOfWeek";
import format from "date-fns/format";
import EmptyContainer from "../../../../components/Empty/EmptyContainer";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginBottom: '4rem'
    }
  }));

  const values = new SystemDateHandler().getStoreWeeks();

  const WeekView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [customer , setCustomer] = useState('');
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);

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
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                const newDate = startOfWeek(
                    new Date(activeHistoryIndex) ,
                    { weekStartsOn: 1 }
                );
                setSelectedWeek(format(newDate, 'MM/dd/yyyy'));
                getInvoiceDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getInvoiceDetails(selectedWeek);
            }
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
        setHeaderText('Seems you don\'t have any sales available');
        setEmptyBtnState(true);
        setInvoiceDetails(response);
        setInvoices(response.invoices);
    };

    const getChildrenDetails = (index) => {
        props.getChildrenView(index , 0)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={4} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        Sold items
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
                            <SingleWeekView  key={index} invoice={invoice} />
                        </div>
                    )
                :
                    invoices.map((invoice , index) =>
                        <div key={index} onClick={getChildrenDetails.bind(this, invoice.index)}>
                            <CustomerWeek customer={customer} key={index} invoice={invoice} prodName={name} />
                        </div>
                    )
            }

        </div>
    )

  }

  export default withRouter(WeekView);
