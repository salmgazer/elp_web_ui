import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleMonthView from './productViews/SingleMonthView';
import ProductMonth from './productViews/ProductMonth';
import CardsSection from '../../../../components/Sections/CardsSection';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import SaleService from "../../../../services/SaleService";
import Empty from '../../../../assets/img/empty.png';
import paths from "../../../../utilities/paths";
import EmptyContainer from "../../../../components/Empty/EmptyContainer";

const useStyles = makeStyles(({
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
    const [saleDetails , setSaleDetails] = useState(false);
    const [sales , setSales] = useState([]);
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);

    const handleChange = event => {
        setSelectedMonth(event.target.value);
        getSaleDetails(event.target.value);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
          if (!saleDetails) {
              let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';
              //console.log(activeHistoryIndex)

              if(activeHistoryIndex){
                setSelectedMonth(activeHistoryIndex);
                getSaleDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
              }else{
                getSaleDetails(selectedMonth);
              }
          }
      });

    const getSaleDetails = async (date) => {
        let response = [];
        //let activeHistoryIndex = '';

        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);

            response = await new SaleService().getProductSalesDetails('month', date , branchProduct.id);
        }else{
            response = await new SaleService().getSalesDetails('month', date);
        }
        setHeaderText('Seems you don\'t have any sales available');
        setEmptyBtnState(true);
        setSaleDetails(response);
        setSales(response.sales);
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

            <CardsSection quantity={saleDetails.quantity} costPrice={saleDetails.costPrice} sellingPrice={saleDetails.sellingPrice} profit={saleDetails.profit} profitName="Sales profit" />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {sales.length === 0
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

                    sales.map((sale , index) =>
                        <div key={index} onClick={getChildrenDetails.bind(this, sale.index)}>
                            <SingleMonthView  key={index} sale={sale} />
                        </div>
                    )
                    :
                    sales.map((sale , index) =>
                        <div key={index} onClick={getChildrenDetails.bind(this, sale.index)}>
                            <ProductMonth  key={index} sale={sale} prodName={name} />
                        </div>
                    )
                }
            </Box>
            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.monthItem.map((item) => <SingleMonthView  key={item.day_id} monthItems={item}/>)}
            </Box> */}
        </div>
    )
};

export default withRouter(MonthView);
