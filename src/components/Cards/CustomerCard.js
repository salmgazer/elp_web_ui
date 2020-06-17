import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import BoxDefault from '../../components/Box/BoxDefault';

const CustomerCard = (props) => {
    const [customer , setCustomer] = useState('');
    const [name , setName] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const newCustomer = await props.customer;
        setCustomer(newCustomer);
        setName(newCustomer.firstName + ' ' + newCustomer.otherNames);
    };

    return(
        <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >
                <Grid container spacing={1} >
                    
                    <Grid item xs={12} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' >{name}</span>
                        </div>
                    </Grid>
                    
                </Grid>
            </BoxDefault>
    );
};

export default CustomerCard;
