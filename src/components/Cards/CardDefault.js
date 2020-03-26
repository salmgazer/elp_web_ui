import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box/Box";
import CardContent from "@material-ui/core/CardContent/CardContent";
import HomeIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
}));


export default function CardDefault(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root + ' ' + 'cardDefault marginCenter'} style={props.styles}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    {props.children}
                </CardContent>
            </div>
        </Card>
    );
}
