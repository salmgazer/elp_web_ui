import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import Popover from '@material-ui/core/Popover';
import Typography from "@material-ui/core/Typography/Typography";
import {
    makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#DAAB59',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typography: {
        padding: theme.spacing(2),
        color: '#333333',
        fontSize: '20px'
    },
}));

const RequestLoader = (props) => {
    const classes = useStyles();
console.log(props.open)
    return(
        <Popover
            id={`requestLoader`}
            open={props.open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            classes={{
                root: classes.root
            }}
        >
            <PulseLoader
                size={15}
                color={"#DAAB59"}
                loading={true}
            />
            <Typography className={classes.typography}>{localStorage.getItem("currentRequestName")}</Typography>
        </Popover>
    );
};

export default RequestLoader;
