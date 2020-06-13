import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const values = [
    {
      value: 'credit',
      label: 'Credit',
    },
    {
      value: 'mobile money',
      label: 'Mobile Money',
    },
    {
      value: 'cheque',
      label: 'Cheque',
    },
    {
      value: 'debit',
      label: 'Debit/VISA',
    }
  ];

const ViewCash = props => {
    const [formFields , setFormFields] = useState({
        customer: props.customerId,
        type: 'sales',
        amountPaid: ''
    });

    const [selectedPayment, setSelectedPayment] = React.useState(values[0].value);
    const handleChange = event => {
        setSelectedPayment(event.target.value);
    };

    const setInputValue = (event) => {
        event.persist();

        const name = event.target.name;
        const value = event.target.value;
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;

        setFormFields(oldFormFields);
        props.getFormFields(oldFormFields);
    };

    return(
        <div>
            <Paper elevation={3}>
                <form noValidate autoComplete="off">
                    <TextField
                        disabled={true}
                        value={props.currentCustomer}
                        label="Customer"
                        variant="outlined"
                        size="small"
                        style={{margin: '25px 0px 25px 0px'}}
                    />

                    <Tooltip title="Add new" onClick={props.openAddCustomerModal}>
                        <PersonAddIcon style={{fontSize: '30px',  color: '#DAAB59', marginTop: '30px', position: 'absolute', marginLeft: '15px'}}></PersonAddIcon>
                    </Tooltip>

                    <TextField
                        select
                        label="Payment method"
                        size="small"
                        value={selectedPayment}
                        style={{margin: '25px', width: '210px'}}
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

                    <TextField
                        label="Amount Paid"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setInputValue(event)}
                        name={`amountPaid`}
                        value={formFields['amountPaid']}
                        style={{margin: '25px'}}
                    />
                </form>
            </Paper>
        </div>
    );
};

export default ViewCash;
