import React , { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../services/ProductServiceHandler";

const CustomerCard = (props) => {
    const [customer , setCustomer] = useState('');
    const [name , setName] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer) {
            getCustomer();
        }
    }, []);

    const getCustomer = async () => {
        const newCustomer = await props.customer;
        setCustomer(newCustomer);
        setName((newCustomer.firstName).length > 20 ? (newCustomer.firstName).slice(0 , 20) + '...' : newCustomer.firstName);
    };

    return(
        <Paper className={`shadow mb-2 bg-white `} >

            <Typography
                component="p"
                variant="h6"
                className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
                 style={{padding: '10px 0px'}}
            >
                {name}
            </Typography>            

        </Paper>
    );
};

export default CustomerCard;
