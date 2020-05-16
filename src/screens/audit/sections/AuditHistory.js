import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import Grid from '@material-ui/core/Grid';
//import Date from '../../../components/Date/Date';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

import SingleAuditView from './auditHistory/SingleAuditView';
import AuditService from '../../../services/AuditService';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
    }
}));

const AuditHistory = props => {

    const classes = useStyles();
    const auditEntries = props.auditEntries;
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [auditList , setAuditList] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
        getAuditDetails(date);
    };

    useEffect(() => {
        if (!auditList) {
            getAuditDetails(selectedDate);
        }
    });

    const getAuditDetails = async (date) => {
        const response = await new AuditService().getAuditDetails(date);
        setAuditList(response.audits);
        console.log(response)
        console.log(response.audits)
    };

    const setView = (view) => {
        props.setView(view);
    };

    const auditProducts = (id) => {
        console.log(id);
        props.auditProducts(id);
    };


    return(
        <div>

            <SectionNavbar 
                title="Audit History"
                leftIcon={
                    <div onClick={setView.bind(this , 0)}>
                        <ArrowBackIosIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />
                
            <Grid container spacing={1} className={classes.root} justify="space-around" >
                
                {/* <Date style={{width: '150px', border: '1px solid #DAAB59'}}/> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"
                        className='text-dark font-weight-bold'
                        style={{float: 'right', width: '150px',  border: '1px solid #010202', backgroundColor: '#FFFFFF'}}
                        size='small'
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
               
            </Grid>

            <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {/* {props.auditDates.map((item) => <SingleAuditView  key={item.date_id} dateAudited={item}  setView={props.setView}/>)} */}

                {auditList.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No audits
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    auditList.map((audit) => <SingleAuditView  key={audit.id} dateAudited={audit} setView={props.setView} auditProducts={auditProducts.bind(this, audit.id)} />)  

                }

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
                    onClick={setView.bind(this , 0)}
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

export default withRouter(AuditHistory);