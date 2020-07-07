import React, {useEffect, useState} from "react";
import {withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import SearchInput from "../../../../../../../Components/Input/SearchInput";
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import SingleToday from './singleViews/SingleToday';
import SaleService from "../../../../../../../../services/SaleService";
import Empty from '../../../../../../../../assets/img/empty.png';
import paths from "../../../../../../../../utilities/paths";
import EmptyContainer from "../../../../../../../../components/Empty/EmptyContainer";
import ModelAction from "../../../../../../../../services/ModelAction";
import getUnixTime from "date-fns/getUnixTime";
import SimpleSnackbar from "../../../../../../../../components/Snackbar/SimpleSnackbar";

const Today = props => {
    // const allSales = props.sales;
    const { history } = props;
    const [sales, setSales] = useState([]);
    const [companySales , setCompanySales] = useState(false);
    //const { history } = props;
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);
    const [searchValue , setSearchValue] = useState({
        search: '',
        state: 'inactive'
    });

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        const response = await new SaleService().getAllSalesToday('day', new Date());
        setHeaderText('Seems you have not sold any product');
        setEmptyBtnState(true);
        setCompanySales(response);
        setSales(response.sales);
    };

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;
        if(value.length > 0){
            oldFormFields['state'] = 'active';
            setHeaderText('Search did not find any entry');
            setEmptyBtnState(true);
        }else{
            oldFormFields['state'] = 'inactive';
            setHeaderText('Seems you have not sold any product');
            setEmptyBtnState(true);
        }

        setSearchValue(oldFormFields);

        const searchResults = await new SaleService().searchSalesBranchCustomer(value);

        setSales(searchResults);
    };

    const updateSaleEntry = async (pId, formFields) => {

        try {
            await new ModelAction('SaleEntry').update(pId, formFields);

            setSuccessMsg('Quantity successfully changed');
            setSuccess(true);
            getCompanyDetails();
            setTimeout(function () {
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);
            return true;
        }catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }
        
    };

    const updateDateEntry = async (entryId, date) => {
        const data = {
            salesDate: getUnixTime(date)
        };

        try {
            await new ModelAction('Sales').update(entryId, data);

            setSuccessMsg('Date successfully changed');
            setSuccess(true);
            getCompanyDetails();
            setTimeout(function () {
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);

            return true;
        } catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }
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

            <SimpleSnackbar
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {sales.length === 0
                    ?
                    <EmptyContainer
                        buttonAction={() => history.push(paths.other_stock)}
                        imageLink={Empty}
                        headerText={headerText}
                        button={emptyBtnState}
                        btnText="Record other stock"
                    />
                    :

                    sales.map((sale) => <SingleToday key={sale.id} sale={sale} updateSaleEntry={updateSaleEntry.bind(this)} updateDateEntry={updateDateEntry.bind(this)} /> )

                }
            </Box>

        </div>
    )
};


export default withRouter(Today);