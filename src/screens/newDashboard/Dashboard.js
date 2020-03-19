import React, {Component} from 'react';
import SectionNavbars from "../Components/Sections/SectionNavbars";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../Components/Tabs/TabPanel";
import BoxDefault from "../Components/Box/BoxDefault";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import CardDefault from "../Components/Cards/CardDefault";

import {withRouter} from "react-router";

import DateView from './sections/DateView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';

import DashboardCard from '../Components/Cards/DashboardCard';

class Dashboard extends Component {

    state={
        value: 0,
        productList: [
            {
                'pro_id': '1',
                'pro_name': 'Lipton Tea',
                'image': 'no_image.png',
                'price': '5',
                'amt_left': '250'
            },
            {
                'pro_id': '2',
                'pro_name': 'Milo Sachet',
                'image': 'no_image.png',
                'price': '2',
                'amt_left': '300'
            },
            {
                'pro_id': '3',
                'pro_name': 'Don Simon 60ml',
                'image': 'no_image.png',
                'price': '10',
                'amt_left': '100'
            },
            {
                'pro_id': '4',
                'pro_name': 'Strawberry Jam',
                'image': 'no_image.png',
                'price': '15',
                'amt_left': '50'
            },
            {
                'pro_id': '5',
                'pro_name': 'Ideal Milk',
                'image': 'no_image.png',
                'price': '3.50',
                'amt_left': '200'
            },
            {
                'pro_id': '6',
                'pro_name': 'Voltic Water',
                'image': 'no_image.png',
                'price': '4',
                'amt_left': '70'
            }
        ]
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
      };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {

        const a11yProps = (index) => {
            return {
                id: `full-width-tab-${index}`,
                'aria-controls': `full-width-tabpanel-${index}`,
            };
        };

        return(
            <div>

                <SectionNavbars 
                    title="Dashboard"  
                    icons={
                        <MoreVertIcon 
                            style={{fontSize: '2rem'}}
                        />}
                >
                    <ArrowBackIosIcon
                        style={{fontSize: '2rem'}}
                    />
                    
                </SectionNavbars>

                <AppBar position="static" color="white">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        style={{marginTop: '60px'}}
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab style={{textTransform: 'none'}} label="Date"  {...a11yProps(0)} />
                        <Tab style={{textTransform: 'none'}} label="This week"   {...a11yProps(1)} />
                        <Tab style={{textTransform: 'none'}} label="This month"   {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0} >
                        <DateView />
                    </TabPanel>

                    <TabPanel value={this.state.value} index={1} >
                        <WeekView />
                    </TabPanel>

                    <TabPanel value={this.state.value} index={2} >
                        <MonthView />
                    </TabPanel>

                </SwipeableViews>

                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                >

                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontWeight: '700', fontSize: '1.20rem'}}
                    >
                        Top selling products
                    </Typography>

                    <Grid container spacing={1} className='mt-3'>
                        {this.state.productList.map((item) =>
                            <DashboardCard key={item.pro_id} product={item}  />
                        )}
                    </Grid>

                </BoxDefault>

            </div>
        )
    }

}

export default withRouter(Dashboard);