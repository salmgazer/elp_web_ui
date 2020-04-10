import {useEffect, useState} from "react";
import React from "react";

const CustomerOption = props => {
    const branchCustomer = props.customer;
    const [customer , setCustomer] = useState('');

    console.log(branchCustomer)
    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer) {
            getCustomer();
        }
    }, []);

    const getCustomer = async () => {
        const newCustomer = await branchCustomer.customer.fetch();
        setCustomer(newCustomer);
    };

    return (
        <option key={branchCustomer.customerId} value={branchCustomer.customerId}>
            {`${customer.firstName} ${customer.otherNames}`}
        </option>
    )
};

export default CustomerOption;