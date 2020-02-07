import React from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        width: '90%',
        'text-align': 'center',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);

export default function PersonalInformationSection() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <form className={classes.root} noValidate>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="First name"
                        required
                        variant="outlined"
                        defaultValue=""
                        id="firstName"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Other names"
                        required
                        variant="outlined"
                        defaultValue=""
                        id="otherNames"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidationTextField
                        className={classes.margin}
                        label="Phone number"
                        required
                        variant="outlined"
                        defaultValue=""
                        id="contact"
                    />
                </Grid>
            </form>
        </Paper>
    );
}
