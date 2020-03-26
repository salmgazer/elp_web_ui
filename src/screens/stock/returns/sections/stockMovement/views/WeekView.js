import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleView/SingleWeekView';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    },
    title: {
        fontSize: 8,
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

  const values = [
    {
      value: 'Week 1',
      label: 'Week 1: 1/01/2020 - 7/01/2020',
    },
    {
      value: 'Week 2',
      label: 'Week 2: 8/01/2020 - 14/01/2020',
    },
    {
      value: 'Week 3',
      label: 'Week 3: 15/01/2020 - 21/01/2020',
    },
    {
      value: 'Week 4',
      label: 'Week 4: 22/01/2020 - 28/01/2020',
    }
  ];

  const WeekView = props => {
    
    const classes = useStyles();
    const [user, setUser] = React.useState('2020');

    const handleChange = event => {
        setUser(event.target.value);
    };


    const openDay = (event) => {
        props.setView(0);
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
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'10px'}}
                        onClick={openDay.bind(this)}
                    >
                        Day
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: 'white', padding: '5px 10px', textTransform: 'none', fontSize:'10px'}}
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
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={user}
                        style={{width: '190px', float: 'right', margin: '10px 0px', fontSize: '7px'}}
                        onChange={handleChange}
                        color="#DAAB59"
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        >
                        {values.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
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
                {props.weekItem.map((item) => <SingleWeekView  key={item.day_id} weekItems={item}/>)}
            </Box>


        </div>
    )

  }

  export default withRouter(WeekView);