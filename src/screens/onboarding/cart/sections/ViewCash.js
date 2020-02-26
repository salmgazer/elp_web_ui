import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ViewCash = props => {
    return(
        <div>
            <Paper elevation={3}>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Customer" variant="outlined" size="small" style={{margin: '25px 0px 25px 25px'}} />
                        
                        <PersonAddIcon style={{fontSize: '30px',  color: '#DAAB59', marginTop: '25px'}}></PersonAddIcon> 
                       {/* <span className="label_aj ml-1" style={{fontSize: '12px', position: 'relative', height: '0px',  paddingLeft: '15px'}}>Add</span> */}
                    <TextField id="outlined-basic" label="Amount Paid" variant="outlined" size="small" style={{margin: '25px'}} />

                    <TextField id="outlined-basic" label="Change Due" variant="outlined" size="small" style={{margin: '25px'}} />
                </form>
            </Paper>
        </div>
    );
};

export default ViewCash;