import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleMonthView from './singleViews/SingleMonthView';
import ProductMonth from './singleViews/ProductMonth';
import CardsSection from '../../../../components/Sections/CardsSection';
import DateServiceHandler from "../../../../services/SystemDateHandler";
import PurchaseService from "../../../../services/PurchaseService";
import Empty from '../../../../assets/img/empty.png';
import paths from "../../../../utilities/paths";
import EmptyContainer from "../../../../components/Empty/EmptyContainer";

const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,
    marginBottom: '4rem'
    }
}));

const values = new DateServiceHandler().getStoreMonths();

const MonthView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedMonth, setSelectedMonth] = React.useState(values[(new Date().getMonth())].value);
    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);

    const handleChange = event => {
        setSelectedMonth(event.target.value);
        getPurchaseDetails(event.target.value);
    };

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!purchaseDetails) {
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                setSelectedMonth(activeHistoryIndex);
                getPurchaseDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getPurchaseDetails(selectedMonth);
            }

            setPurchaseDetails(true)
        }
    });

    const getPurchaseDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);
            response = await new PurchaseService().getProductPurchaseDetails('month', date, newProduct.id);
        }else {
            response = await new PurchaseService().getPurchaseDetails('month', date);
        }
        setHeaderText('Seems you have not bought any product');
        setEmptyBtnState(true);
        setPurchaseDetails(response);
        setPurchases(response.purchases);
    };

    const getChildrenDetails = (index) => {
        props.getChildrenView(index , 2)
    };


    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                        className={`text-center text-dark`}
                    >
                        Purchased items
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

            <CardsSection quantity={purchaseDetails.quantity} costPrice={purchaseDetails.costPrice} sellingPrice={purchaseDetails.sellingPrice} profit={purchaseDetails.profit} profitName="Expected profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Expected Profit" /> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {purchases.length === 0
                    ?
                    <EmptyContainer
                        buttonAction={() => history.push(paths.stock)}
                        imageLink={Empty}
                        headerText={headerText}
                        button={emptyBtnState}
                        btnText="Add stock"
                    />
                    :
                    pageName === false ?

                    purchases.map((purchase , index) =>
                    <div key={index} onClick={getChildrenDetails.bind(this, purchase.index)}>
                        <SingleMonthView  key={index} purchase={purchase} />
                    </div>
                    )
                    :
                    purchases.map((purchase, index) =>
                    <div key={index} onClick={getChildrenDetails.bind(this, purchase.index)}>
                        <ProductMonth  key={purchase.id} purchase={purchase} purchaseEntry={purchase} prodName={name} />
                    </div>
                    )
                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.weekItem.map((item) => <SingleMonthView  key={item.day_id} weekItems={item}/>)}
            </Box> */}


        </div>
    )

}

export default withRouter(MonthView);
