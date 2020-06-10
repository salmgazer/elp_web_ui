import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import LocalInfo from "../../services/LocalInfo";
import format from "date-fns/format";
import database from "../../models/database";

 const MaterialUIPickers= (props) => {
     const getDate = props.initialDate ? new Date(props.initialDate) : new Date();
     const [selectedDate, setSelectedDate] = React.useState(getDate);

     const handleDateChange = async date => {
         props.getValue(date);
         setSelectedDate(new Date(date));
     };

     return (
         <div>
             <MuiPickersUtilsProvider utils={DateFnsUtils} style={{
                 padding: '2px 10px',
                 backgroundColor: '#FFFFFF'
             }}>
                 <KeyboardDatePicker
                     disableToolbar
                     label={props.label}
                     variant="outlined"
                     format="dd/MM/yyyy"
                     margin="normal"
                     id="date-picker"
                     disableFuture={true}
                     className='text-dark font-weight-bold my-1'
                     style={{...props.style, padding: '3px 0px', paddingLeft: '5px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', float: 'center',  fontWeight: '400', fontSize: '18px' , lineHeight: '1.6' , marginTop: '2px'}}
                     size='small'
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps={{
                         'aria-label': 'change date',
                     }}
                 />
             </MuiPickersUtilsProvider>
         </div>
     );
}

export default MaterialUIPickers;
