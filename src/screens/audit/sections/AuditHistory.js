import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Date from '../../Components/Date/Date';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";

import SingleAuditView from './singleView/SingleAuditView';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
    }
}));

const AuditHistory = props => {

    const classes = useStyles();

    return(
        <div>

            <SectionNavbar 
                title="Audit History"
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <Grid container spacing={1} className={classes.root} >
                
                    <Date label='Date picker' style={{width: '170px', border: '1px solid #DAAB59'}}/>
               
            </Grid>

            <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.auditDates.map((item) => <SingleAuditView  key={item.date_id} dateAudited={item}  setView={props.setView}/>)}
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                >
                    Back  
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', textTransform: 'none', fontSize:'17px'}}
                >
                    Balance all
                </Button>
            </Box>

        </div>

    )
}

export default AuditHistory;