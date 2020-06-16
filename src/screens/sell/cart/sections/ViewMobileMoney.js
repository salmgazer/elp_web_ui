import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const ViewCash = props => {
    const [value, setValue] = React.useState(2);

    const [formFields , setFormFields] = useState({
        customer: props.customerId,
        type: value,
        amountPaid: '',
        changeDue: 0,
        /*amountGiven: '',*/
    });

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        const {...oldFormFields} = formFields;
        oldFormFields['type'] = event.target.value;
        props.getFormFields(oldFormFields);
    };

    const setInputValue = (event) => {
        event.persist();

        const name = event.target.name;
        const value = event.target.value;
        const {...oldFormFields} = formFields;

        /*if(name === 'amountGiven'){
            changeDue = (parseFloat(value) - (parseFloat(formFields.amountPaid) || 0)).toFixed(2) || 0;
        }else{
            changeDue = (parseFloat(formFields.amountGiven) - (parseFloat(value) || 0)).toFixed(2) || 0;
        }*/
        const changeDue = (parseFloat(value) - parseFloat(props.cartAmount)).toFixed(2);
        oldFormFields[name] = value;

        if(changeDue > 0){
            oldFormFields['changeDue'] = changeDue;
        }

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

                    {/* <TextField
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
                    </TextField> */}

                    <Grid container  style={{textAlign: 'left', marginLeft: '5px'}}  >
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{marginLeft: '30px'}}>Payment method</FormLabel>

                            <RadioGroup aria-label="payment" name="payment" value={value} onChange={handleRadioChange}>
                                <Grid item xs={6}>
                                    <FormControlLabel value={2} control={<GreenRadio />} label="Credit" style={{marginLeft: '20px'}}/>
                                    <FormControlLabel value={3} control={<GreenRadio />} label="Cheque" style={{marginLeft: '20px'}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel value={1} control={<GreenRadio />} label="Mobile money" />
                                    <FormControlLabel value={4}  control={<GreenRadio />} label="Debit/VISA card" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/*<TextField
                        label="Amount Given"
                        variant="outlined"
                        size="small"
                        name={`amountGiven`}
                        onChange={(event) => setInputValue(event)}
                        value={formFields['amountGiven']}
                        style={{margin: '25px 25px 10px'}}
                    />*/}

                    <TextField
                        label="Amount Paid"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setInputValue(event)}
                        name={`amountPaid`}
                        value={formFields['amountPaid']}
                        style={{margin: '25px 25px'}}
                    />
                </form>
            </Paper>
        </div>
    );
};

export default ViewCash;
