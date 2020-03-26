import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BoxDefault from '../../../../Components/Box/BoxDefault';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";

import SingleDayView from './singleViews/SingleDayView';

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

const DayView = props => { 

    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
      };

    const openWeek = (event) => {
        props.setView(2);
    };

    const openMonth = (event) => {
        props.setView(3);
    };

    const openYear = (event) => {
        props.setView(4);
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    return (
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
                styles={{marginTop: '60px'}}
            >
                <Typography component="p" style={{ fontSize: '15px' }} >
                    Select the date the returned item was supplied
                </Typography>
            </BoxDefault>

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
                <Typography style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px', marginLeft: '5px'}} >
                    {props.pageName}
                </Typography>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"
                        className='text-dark font-weight-bold'
                        style={{float: 'right', width: '170px'}}
                        size='small'
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Quantity
                        </Typography>
                        <Typography className={classes.text} >
                            5 items
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Cost price
                        </Typography>
                        <Typography className={classes.text} >
                            GHC 500
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Selling price
                        </Typography>
                        <Typography className={classes.text} >
                            GHC 600
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Expected profit
                        </Typography>
                        <Typography className={classes.text} >
                            GHC 100
                        </Typography>
                    </Paper>
                </Grid>
                
            </Grid>

            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
                
            >
                {props.suppliers.map((item) => <SingleDayView  key={item.supp_id} supp={item} indProducts={props.products} />)}
            </BoxDefault>

            <Box
                    className="shadow1"
                    bgcolor="background.paper"
                    p={1}
                    style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                        onClick={backHandler.bind(this)}
                    >
                        Back  
                    </Button>
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                    >
                        Print
                    </Button>
                </Box>

        </div>
    )

}

export default DayView;