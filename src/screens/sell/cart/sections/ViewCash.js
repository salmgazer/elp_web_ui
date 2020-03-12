import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ViewCash = props => {
    return(
        <div>
            <Paper elevation={3}>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Customer" variant="outlined" size="small" style={{margin: '25px 0px 25px 0px'}} />

                    <Tooltip title="Add new">   
                        <PersonAddIcon style={{fontSize: '30px',  color: '#DAAB59', marginTop: '30px', position: 'absolute', marginLeft: '15px'}}></PersonAddIcon> 
                    </Tooltip>  

                    <TextField id="outlined-basic" label="Amount Paid" variant="outlined" size="small" style={{margin: '25px'}} />

                    <TextField id="outlined-basic" label="Change Due" variant="outlined" size="small" style={{margin: '25px 25px 50px 25px'}} />
                </form>
            </Paper>
        </div>
    );
};

export default ViewCash;