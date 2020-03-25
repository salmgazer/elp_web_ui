import React , { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SimpleSnackbar(props) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        setOpen(props.openState);
        console.log(props.openState);
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={props.type} style={{minWidth: '300px'}}>
                    {props.message}
                    {props.children}
                </Alert>
            </Snackbar>
        </div>
    );
}
