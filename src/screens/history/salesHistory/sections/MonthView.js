import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleMonthView from './productViews/SingleMonthView';
import CardsSection from '../../../../components/Sections/CardsSection';
import DateServiceHandler from "../../../../services/DateServiceHandler";
import BranchService from "../../../../services/BranchService";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const values = new DateServiceHandler().getStoreMonths()

  const MonthView = props => {
    console.log(new DateServiceHandler().getStoreMonths());
    
    const classes = useStyles();
    const [selectedMonth, setSelectedMonth] = React.useState(values[0].value);
    const [saleDetails , setSaleDetails] = useState(false);
    const [sales , setSales] = useState([]);

    const handleChange = event => {
        setSelectedMonth(event.target.value);
        getSaleDetails(event.target.value);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
          if (!saleDetails) {
              getSaleDetails(selectedMonth);
          }
      });
  
      const getSaleDetails = async (date) => {
          console.log(date);
          const response = await new BranchService().getSalesDetails('month', date);
  
          setSaleDetails(response);
          setSales(response.sales);
          console.log(response)
      };

    return(
        <div className={classes.root}>
            

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography style={{fontSize: '14px', paddingTop: '20px'}} >
                        {props.pageName}
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
                                    No sales made this month
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    sales.map((sale) => <SingleMonthView  key={sale.id} sale={sale} />)
                }
            </Box>
            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.monthItem.map((item) => <SingleMonthView  key={item.day_id} monthItems={item}/>)}
            </Box> */}


        </div>
    )

  }

  export default withRouter(MonthView);