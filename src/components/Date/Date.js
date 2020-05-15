import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

 const MaterialUIPickers= (props) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(props.selectedDate);

  const handleDateChange = date => {
    setSelectedDate(date);
    props.getValue(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
            <KeyboardDatePicker
                disableToolbar
                variant="outlined"
                label={props.label}
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker"
                name={props.inputName}
                className='text-dark font-weight-bold'
                style={props.style}
                size='small'
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers;
