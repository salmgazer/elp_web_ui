import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box/Box";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(0),
    },

    header: {
        'background-color': '#DAAB59 !important',
        color: '#343a40 !important'
    }
}));


export default function BoxDefault(props) {
    const classes = useStyles();

    return (
        <Box
            bgcolor="background.paper"
            p={1}
            className={'boxDefault'}
            style={props.styles}
        >
            {props.children}
        </Box>
    );
}
