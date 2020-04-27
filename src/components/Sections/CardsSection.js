import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 9,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center', 
    }
  }));

const CardsSection = props => {

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Quantity
                        </Typography>
                        <Typography className={classes.text} >
                            {props.quantity} item(s)
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Cost price
                        </Typography>
                        <Typography className={classes.text} >
                            GHC {props.costPrice}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Selling price
                        </Typography>
                        <Typography className={classes.text} >
                            GHC {props.sellingPrice}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            {props.profitName}
                        </Typography>
                        <Typography className={classes.text} >
                            GHC {props.profit}
                        </Typography>
                    </Paper>
                </Grid>
                
            </Grid>
        </div>
    )

}

export default CardsSection;