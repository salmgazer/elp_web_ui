import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dates from '../../../Components/Date/Date';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import Paper from '@material-ui/core/Paper';
import Switch from '../../../Components/Switch/Switch';
import CardDefault from '../../../Components/Cards/CardDefault';
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center'
    }
}));

const ReconciliationReport = props => {
    const changeView = (event) => {
        props.setView(2);
     };

    const classes = useStyles();

    return (
        <div>
            <SectionNavbar 
                title="Reconciliation Report"
                icons={
                    <MoreVertIcon 
                        style={{fontSize: '2rem'}}
                    />}
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <Grid container spacing={1} style={{marginTop: '50px'}} >
                <Grid item xs={5.5}>
                    <Dates label='Start date' style={{width: '150px', border: '1px solid #DAAB59', marginLeft: '10px'}}/>
                </Grid>

                <Grid item xs={1}>
                    <p  className='text-dark font-weight-bold' style={{marginTop: '35px'}}>to</p>
                </Grid>

                <Grid item xs={5.5}>
                    <Dates label='End date' style={{width: '150px', border: '1px solid #DAAB59'}}/>
                </Grid>
            </Grid>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px' }} >
                Total sales made this period was:
            </Typography>

            <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-1 mb-5`}>
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '8px 0px'}} >
                    <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '13px' }} >
                            The total sales
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '25px' }} >
                            GHC 1000
                        </Typography>
                </Grid>
            </Box>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', marginBottom: '10px'}} >
                Minus
            </Typography>

            
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Switch label='include' style={{fontSize: '10px'}} />
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Total credit
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC 300
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Switch label='include' style={{fontSize: '10px'}} />
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Expenses
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC 400
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Switch label='include' style={{fontSize: '10px'}} />
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Purchases
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC 300
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            <Box >
                <Grid container spacing={1}>
                    <Grid item xs={6} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '15px 0px'}} >
                        <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '13px' }} >
                                Balance
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC {props.balance}
                            </Typography>
                    </Grid>
                
                    <Grid item xs={6} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '15px 0px'}} >
                        <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '13px' }} >
                                Cash you have is
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC {props.cash}
                            </Typography>
                    </Grid>
                </Grid>
            </Box>

            

            { props.cash - props.balance  > "0" ? 
                <CardDefault styles={{width: '90%', marginTop: '5px', backgroundColor: '#9ffca7'}}>
                    <Typography
                        className='text-dark font-weight-bold'
                        style={{fontSize: '18px', padding: '0px', color: 'black'}}
                    >
                        Result: Your cash is GHC {props.cash - props.balance} more

                    </Typography>
                </CardDefault>
                : props.cash - props.balance  < "0" ? 
                    <CardDefault styles={{width: '90%', marginTop: '5px', backgroundColor: '#fc7c66'}}>
                        <Typography
                            className='text-dark font-weight-bold'
                            style={{fontSize: '18px', padding: '0px', color: 'black'}}
                        >
                            Result: Your cash is GHC {props.balance - props.cash} less
                            
                        </Typography>
                    </CardDefault>
                : 
                <CardDefault styles={{width: '90%', marginTop: '5px', backgroundColor: '#5ecbf7'}}>
                    <Typography
                        className='text-dark font-weight-bold'
                        style={{fontSize: '18px', padding: '0px', color: 'black'}}
                    >
                        Result: It is balanced
                        
                    </Typography>
                </CardDefault>
            }

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={changeView.bind(this)}
                >
                    View details
                </Button>
            </Box>

        </div>
    )

}

export default ReconciliationReport;
