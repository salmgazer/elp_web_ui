import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";

import SingleMonthView from './singleView/SingleMonthView';
import BoxDefault from '../../../../../components/Box/BoxDefault';
import HistoryDrawer from '../../../../../components/Drawer/HistoryDrawer'; 
import CardsSection from '../../../../../components/Sections/CardsSection';

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
      value: 'January',
      label: 'January',
    },
    {
      value: 'February',
      label: 'February',
    },
    {
      value: 'March',
      label: 'March',
    },
    {
      value: 'April',
      label: 'April',
    },
    {
      value: 'May',
      label: 'May',
    },
    {
      value: 'June',
      label: 'June',
    },
    {
      value: 'July',
      label: 'July',
    },
    {
      value: 'August',
      label: 'August',
    },
    {
      value: 'September',
      label: 'September',
    },
    {
      value: 'October',
      label: 'October',
    },
    {
      value: 'November',
      label: 'November',
    },
    {
      value: 'December',
      label: 'December',
    }

  ];

  const MonthView = props => {
    
    const classes = useStyles();

    return(
        <div className={classes.root}>

            <HistoryDrawer pageName="Purchased items" user='April' values={values} />

            <CardsSection quantity='5' costPrice='500' sellingPrice='600' profit='100' profitName="Amount owed" />

            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
                style={{marginTop: '5px' }}
            >
                <Grid container className={`bordered`}>
                    <Grid item xs={8}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >Week 1: 01/03/20 - 07/03/20</span>
                    </Grid>

                    <Grid item xs={4}>
                        <span className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total : GHC 100</span>
                    </Grid>
                </Grid>
    
                {props.monthItem.map((item) => <SingleMonthView  key={item.week_id} monthSuppliers={item}/>)}

              </BoxDefault>
                
         
            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={8}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >Week 2: 08/03/20 - 14/03/20</span>
                    </Grid>

                    <Grid item xs={4}>
                        <span className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total : GHC 200</span>
                    </Grid>
                </Grid>
    
                {props.monthItem.map((item) => <SingleMonthView  key={item.week_id} monthSuppliers={item}/>)}
                
            </Box>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={8}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >Week 3: 15/03/20 - 21/03/20</span>
                    </Grid>

                    <Grid item xs={4}>
                        <span className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total : GHC 30</span>
                    </Grid>
                </Grid>
    
                {props.monthItem.map((item) => <SingleMonthView  key={item.week_id} monthSuppliers={item}/>)}
                
            </Box> */}


        </div>
    )

  }

  export default withRouter(MonthView);