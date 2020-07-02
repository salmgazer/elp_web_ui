import React, {useEffect, useState} from "react";
import {withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import SearchInput from "../../../../../../../Components/Input/SearchInput";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import SingleToday from './singleViews/SingleToday';
import SaleService from "../../../../../../../../services/SaleService";
import Empty from '../../../../../../../../assets/img/empty.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../../../../../utilities/paths";

const MainPage = props => {
    // const allSales = props.sales;
    const { history } = props;
    const [sales, setSales] = useState([]);
    const [companySales , setCompanySales] = useState(false);
    //const { history } = props;
    const [searchValue , setSearchValue] = useState({
        search: ''
    });
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    console.log(yesterday)

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        const response = await new SaleService().getAllSalesToday('day', yesterday);
        setCompanySales(response);
        setSales(response.sales);
        console.log(response);
    };

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        const searchResults = await new SaleService().searchSalesBranchCustomer(value);

        setSales(searchResults);
    };

    return (
        <div>
            
            <Paper>
                <Grid container spacing={2} style={{ marginBottom: '10px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px 8px 15px 8px'}} className={`mx-auto mt-7`}>
                        <SearchInput
                            inputName="search"
                            styles={{
                                border: '1px solid #e5e5e5',
                                padding: '4px 0px'
                            }}
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {sales.length === 0
                    ?
                    <div>
                        <Box component="div" m={2} style={{marginTop: '-1rem'}} >
                            <img className="img100" src={Empty} alt={'payment'}/>
                        </Box>

                        
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px', padding: '0px 0px 10px 0px' }} >
                            Seems you have not sold any product
                        </Typography>
                        

                        <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginBottom: '20px' }} >
                                Click others to be able to view Other Sales history
                        </Typography>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => history.push(paths.other_stock)}
                        >
                            Record other stock
                        </Button>
                    </div>
                    :

                    sales.map((sale) => <SingleToday key={sale.id} sale={sale} /> )

                }
            </Box>

        </div>
    )
};


export default withRouter(MainPage);