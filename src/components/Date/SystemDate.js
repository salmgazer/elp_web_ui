import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import LocalInfo from "../../services/LocalInfo";

const SystemDate = props => {
    const getDate = new Date(LocalInfo.workingDate);
    const [selectedDate, setSelectedDate] = React.useState(getDate);

    const handleDateChange = date => {
        LocalInfo.setWorkingDate(format(new Date(), 'MM/dd/yyyy'));
        setSelectedDate(new Date(date));
    };

    return (
        <div>
            {/*<Typography
                component="h6"
                variant="h6"
                style={{fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
                className={`mx-auto text-dark my-1`}
            >
                {date.toDateString()}
            </Typography>*/}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="outlined"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker"
                    disableFuture={true}
                    className='text-dark font-weight-bold my-1'
                    style={{float: 'center', width: '150px', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6' , marginTop: '2px'}}
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
};

export default SystemDate;
