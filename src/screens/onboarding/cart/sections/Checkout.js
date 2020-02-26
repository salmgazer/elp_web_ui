import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbars from "../../../Components/Sections/SectionNavbars";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import TabPanel from "../../../Components/Tabs/TabPanel";
import AppBar from '@material-ui/core/AppBar';
import Box from "@material-ui/core/Box/Box";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from "react-router-dom";
import ViewCash from './ViewCash';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '70px',
    },
    title: {
              fontSize: 11,
           },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      
     
    },
    tabs: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#333333',
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
  



const CheckoutView = props => {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
      }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const backHandler = (event) => {
        props.setView(0);
    };


    return(
        <div className={classes.root}>
            <SectionNavbars title="Payment" >
                <ArrowBackIosIcon
                    onClick={backHandler.bind(this)}
                    style={{fontSize: '2.5rem'}}
                />
            </SectionNavbars>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '8px 0px'}} >
                    <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '18px' }} >
                            Amount due
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '25px' }} >
                            GHC 70.00
                        </Typography>
                </Grid>
            </Box>

            <AppBar position="static" color="white">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className={classes.tabs} label="Cash" icon={<LocalAtmIcon style={{color: '#DAAB59'}} />} {...a11yProps(0)} />
                    <Tab className={classes.tabs} label="Mobile Money" icon={<PhoneAndroidIcon style={{color: '#DAAB59'}} />} {...a11yProps(1)} />
                    <Tab className={classes.tabs} label="Credit" icon={<ScheduleIcon style={{color: '#DAAB59'}} />} {...a11yProps(2)} />
                    <Tab className={classes.tabs} label="Other" icon={<CardGiftcardIcon style={{color: '#DAAB59'}} />} {...a11yProps(3)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <ViewCash />
                </TabPanel>
                <TabPanel value={value} index={1} >
                    Item 2
                </TabPanel>
                <TabPanel value={value} index={2} >
                    Item 3
                </TabPanel>
                <TabPanel value={value} index={3} >
                    Item 4
                </TabPanel>
            </SwipeableViews>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    className='text-dark font-weight-bold'
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '8px 70px'}}
                    onClick={backHandler.bind(this)}
                >
                    Finish
                </Button>
            </Box>
           
        </div>
    )
}

export default withRouter(CheckoutView);