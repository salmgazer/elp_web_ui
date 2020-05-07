import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

import CustomerCard from "../../../../components/Cards/CustomerCard";
import SearchInput from "../../../Components/Input/SearchInput";

const CustomerView = props => {

    const addCustomerHandler = (id) => {
        console.log(id);
        props.customerAdd(id, 0);
    };

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const branchCustomers = props.branchCustomers;


    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchCustomer(value);
    };

    return(
        <div>
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', margin: '5px 0px' }} >
                Search for a customer to view history
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={12} style={{marginTop: '5px', padding: '4px 4px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                        styles={{width: '95%'}}
                    />
                </Grid>
            </Grid>
                
            <Grid
                container
                spacing={1}
                className={`shadow1 boxMain mx-auto rounded mt-2`}
                style={{width: '100%', padding: '10px 2% 20px' , marginBottom: '60px'}}
            >
                {branchCustomers.length === 0
                    ?
                    <Grid
                        item xs={12}
                        className={`text-left pl-2`}
                    >
                        <div className={`rounded mx-1 my-2 p-2 bordered`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontSize: '16px'}}
                                className={`text-center text-dark w-100`}
                            >
                                No customer found
                            </Typography>
                        </div>
                    </Grid>
                    :
                    branchCustomers.map((branchCustomer) =>
                    <Grid key={branchCustomer.customerId} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                    <div
                        onClick={addCustomerHandler.bind(this, branchCustomer.customerId)}
                    >
                        <CustomerCard customer={branchCustomer.customer.fetch()}>
                            
                        </CustomerCard>
                    </div>
                    </Grid>
                    )
                }

            </Grid>

                <Button
                    variant="outlined"
                    style={{
                        border: '1px solid #DAAB59', 
                        color: '#DAAB59', 
                        padding: '5px 30px', 
                        textTransform: 'none', 
                        fontSize:'17px',
                        marginTop: '100px', 
                        textAlign: 'center'
                    }}
                >
                    Scan Barcode   
                </Button>

        </div>
    );
};

export default CustomerView;