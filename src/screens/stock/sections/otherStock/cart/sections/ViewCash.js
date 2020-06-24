import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const ViewCash = props => {
    const [formFields , setFormFields] = useState({
        amountPaid: '',
        changeDue: '',
        customer: props.customerId,
        type: 0
    });
    const [value, setValue] = React.useState('gift');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // const setInputValue = (event) => {
    //     event.persist();

    //     const name = event.target.name;
    //     const value = event.target.value;
    //     const {...oldFormFields} = formFields;

    //     const changeDue = (parseFloat(value) - parseFloat(props.cartAmount)).toFixed(2);
    //     oldFormFields[name] = value;
    //     oldFormFields['changeDue'] = changeDue;

    //     setFormFields(oldFormFields);
    //     props.getFormFields(oldFormFields);
    // };

    return(
        <div>
            <Paper elevation={3}>
                {/* <form noValidate autoComplete="off">
                    <TextField
                        disabled={true}
                        value={props.currentCustomer}
                        label="Customer"
                        variant="outlined"
                        size="small"
                        style={{margin: '25px 0px 25px 0px'}}
                        onClick={props.openAddCustomerModal}
                    />

                    <Tooltip title="Add new" onClick={props.openAddCustomerModal}>
                        <PersonAddIcon style={{fontSize: '30px',  color: '#DAAB59', marginTop: '30px', position: 'absolute', marginLeft: '15px'}}/>
                    </Tooltip>

                    <TextField
                        label="Amount Paid"
                        variant="outlined"
                        size="small"
                        type="tel"
                        onChange={(event) => setInputValue(event)}
                        name={`amountPaid`}
                        value={formFields['amountPaid']}
                        style={{margin: '25px'}}
                    />

                    <TextField
                        label="Change Due"
                        variant="outlined"
                        size="small"
                        disabled={true}
                        name={`changeDue`}
                        value={formFields['changeDue']}
                        style={{margin: '25px 25px 50px 25px'}}
                    />
                </form> */}

                <Typography className='text-dark font-weight-bold' style={{ margin: '20px 0px 0px 0px', fontSize: '18px' }} >
                    What will the stock be used as?
                </Typography>

                <form noValidate autoComplete="off">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <Grid container >
                    
                    <Grid item xs={12} >
                        <FormControlLabel value="gift" control={<Radio />} label="Gift" style={{display: 'block', marginBottom: '10px'}}/>
                        </Grid>
                        
                        <Grid item xs={12} >
                        <FormControlLabel value="family" control={<Radio />} label="Family" style={{display: 'block', marginBottom: '10px'}}/>
                        </Grid>

                        <Grid item xs={12} >
                        <FormControlLabel value="damaged" control={<Radio />} label="Damaged" style={{display: 'block', marginBottom: '10px'}}/>
                        </Grid>

                        <Grid item xs={12} >
                        <FormControlLabel value="expired" control={<Radio />} label="Expired" style={{display: 'block', marginBottom: '10px'}}/>
                        </Grid>
                        </Grid>
                    </RadioGroup>
                </form>


            </Paper>
        </div>
    );
};

export default ViewCash;
