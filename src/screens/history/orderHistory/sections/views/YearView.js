import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import HistoryDrawer from '../../../../../components/Drawer/HistoryDrawer'; 
import CardsSection from '../../../../../components/Sections/CardsSection';
import { withRouter } from "react-router-dom";

import SingleYearView from './singleView/SingleYearView';

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
    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 50px',
        marginRight: '10px',
        marginTop: '10px',
        textTransform: 'none',
    }
  }));

  const values = [
    {
      value: '2020',
      label: '2020',
    },
    {
      value: '2019',
      label: '2019',
    },
    {
      value: '2018',
      label: '2018',
    },
    {
      value: '2017',
      label: '2017',
    }
  ];

  const YearView = props => {
    
    const classes = useStyles();

    return(
        <div className={classes.root}>

            <HistoryDrawer pageName="Purchased items" user='2020' values={values} />

            <CardsSection quantity='5' costPrice='500' sellingPrice='600' profit='100' profitName="Amount owed" />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={8}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >January 2020</span>
                    </Grid>

                    <Grid item xs={4}>
                        <span className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total : GHC 900</span>
                    </Grid>
                </Grid>
    
                {props.yearItem.map((item) => <SingleYearView  key={item.month_id} yearSuppliers={item}/>)}
                
            </Box>


        </div>
    )

  }

  export default withRouter(YearView);