import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleDayView from './singleView/SingleDayView';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    },
    title: {
        fontSize: 8,
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center', 
    }
  }));

  const DayView = props => {
    
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
      };

    const openWeek = (event) => {
        props.setView(1);
    };

    const openMonth = (event) => {
        props.setView(2);
    };

    const openYear = (event) => {
        props.setView(3);
    };

    return(
        <div className={classes.root}>
            <Grid container spacing={1}>

                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: 'white', padding: '5px 10px', textTransform: 'none', fontSize:'10px'}}
                    >
                        Day
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'10px'}}
                        onClick={openWeek.bind(this)}
                    >
                        Week  
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'10px'}}
                        onClick={openMonth.bind(this)}
                    >
                        Month  
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'10px'}}
                        onClick={openYear.bind(this)}
                    >
                        Year  
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={1}>

                <Grid item xs={6}>
                    <Typography style={{fontSize: '14px', paddingTop: '20px'}} >
                        {props.pageName}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker"
                            className='text-dark font-weight-bold'
                            style={{float: 'right', width: '170px', border: '1px solid #DAAB59' }}
                            size='small'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Opening balance
                        </Typography>
                        <Typography className={classes.text} >
                            3.5
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Purchased
                        </Typography>
                        <Typography className={classes.text} >
                            0
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Sold
                        </Typography>
                        <Typography className={classes.text} >
                            55
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Closing balance
                        </Typography>
                        <Typography className={classes.text} >
                            66.5
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Difference
                        </Typography>
                        <Typography className={classes.text} >
                            63
                        </Typography>
                    </Paper>
                </Grid>
                
            </Grid>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.map((item) => <SingleDayView  key={item.pro_id} item={item}/>)}
            </Box>



        </div>
    )

  }

  export default withRouter(DayView);