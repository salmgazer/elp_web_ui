import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleYearView from './productViews/SingleYearView';
import ProductYear from './productViews/ProductYear';
import CardsSection from '../../../../components/Sections/CardsSection';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import SaleService from "../../../../services/SaleService";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const values = new SystemDateHandler().getStoreYears()

  const YearView = props => {
    console.log(new SystemDateHandler().getStoreYears());


    const classes = useStyles();
    const [selectedYear, setSelectedYear] = React.useState(values[0].value);
    const [saleDetails , setSaleDetails] = useState(false);
    const [sales , setSales] = useState([]);
    const pageName = props.pageName;
    const [name , setName] = useState('');

    const handleChange = event => {
        setSelectedYear(event.target.value);
        getSaleDetails(event.target.value);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
          if (!saleDetails) {
              getSaleDetails(selectedYear);
          }
      });

    const getSaleDetails = async (date) => {
        console.log(date);
        const response = await new SaleService().getSalesDetails('year', date);
        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);
        }
        setSaleDetails(response);
        setSales(response.sales);
        console.log(response)
    };


    return(
        <div className={classes.root}>


            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {pageName === false
                        ?
                        <Typography
                            style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                            className={`text-center text-dark`}
                        >
                            Sold items
                        </Typography>
                        :
                        <Typography

                            style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                            className={`text-center text-dark`}
                        >
                        {name}
                        </Typography>

                    }
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedYear}
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

            <CardsSection quantity={saleDetails.quantity} costPrice={saleDetails.costPrice} sellingPrice={saleDetails.sellingPrice} profit={saleDetails.profit} profitName="Profit" />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {sales.length === 0
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
                                    No sales made this year
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    pageName === false ?

                    sales.map((sale) => <SingleYearView  key={sale.id} sale={sale} />)
                    :
                    sales.map((sale) => <ProductYear  key={sale.id} sale={sale} saleEntry={sale} prodName={name} />)
                    
                }
            </Box>


            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.yearItem.map((item) => <SingleYearView  key={item.day_id} yearItems={item}/>)}
            </Box> */}


        </div>
    )

  }

  export default withRouter(YearView);
