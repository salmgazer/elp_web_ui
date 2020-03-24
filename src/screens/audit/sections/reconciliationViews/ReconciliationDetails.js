import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";

import SingleReconciliationDetail from './singleViews/SingleReconciliationDetail';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center'
    }
}));

const ReconciliationDetails = props => {
    const classes = useStyles();

    const backHandler = (event) => {
        props.setView(0);
     };

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

            <Grid container spacing={1} style={{ marginTop: '70px' }} >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            The total sales
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC {props.sales}
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Total credit
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC {props.credit}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Difference
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC {props.sales - props.credit}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            {props.reconciliationDetail.map((item) => <SingleReconciliationDetail  key={item.id} reportItem={item} />)}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={backHandler.bind(this)}
                >
                    Close
                </Button>
            </Box>

        </div>
    )

}

export default ReconciliationDetails;