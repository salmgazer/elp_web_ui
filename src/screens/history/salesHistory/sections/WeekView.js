import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleWeekView from './productViews/SingleWeekView';
import ProductWeek from './productViews/ProductWeek';
import CardsSection from '../../../../components/Sections/CardsSection';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import SaleService from "../../../../services/SaleService";
import startOfWeek from 'date-fns/startOfWeek';
import format from "date-fns/format";
import Empty from '../../../../assets/img/empty.png';
import paths from "../../../../utilities/paths";
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
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);

    const handleChange = event => {
        setSelectedWeek(event.target.value);
        getSaleDetails(event.target.value);
    };

    const [saleDetails , setSaleDetails] = useState(false);
    const [sales , setSales] = useState([]);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
        if (!saleDetails) {
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                const newDate = startOfWeek(
                    new Date(activeHistoryIndex) ,
                    { weekStartsOn: 1 }
                );
                setSelectedWeek(format(newDate, 'MM/dd/yyyy'));
                getSaleDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getSaleDetails(selectedWeek);
            }
        }
    });

    const getSaleDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);

            response = await new SaleService().getProductSalesDetails('week', date , branchProduct.id);
        }else{
            response = await new SaleService().getSalesDetails('week', date);
        }
        setHeaderText('Seems you don\'t have any sales available');
        setEmptyBtnState(true);
        setSaleDetails(response);
        setSales(response.sales);
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
                            <SingleWeekView key={index} sale={sale} />
                        </div>
                    )
                    :
                    sales.map((sale , index) =>
                        <div key={index} onClick={getChildrenDetails.bind(this, sale.index)}>
                            <ProductWeek key={index} sale={sale} prodName={name} />
                        </div>
                    )
                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.weekItem.map((item) => <SingleWeekView  key={item.day_id} weekItems={item}/>)}
            </Box> */}
        </div>
    )
};

export default withRouter(WeekView);
