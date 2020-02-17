import React, {Component} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {withRouter} from "react-router";
import TabPanel from "../../Components/Tabs/TabPanel";

class AddProducts extends Component{
    state = {
        isDrawerShow: false,
        value: 0
    };

    a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    useStyles = () => makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },
    }));

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
    };

    handleChangeIndex = index => {
        this.setState({
            value: index
        });
    };

    render(){
        const value = this.state.value;

        return(
            <div>
                <SectionNavbars title="Stock">
                    <MenuIcon
                        onClick={() => this.setState({isDrawerShow: true})}
                        style={{fontSize: '2.5rem'}}
                    />
                </SectionNavbars>

                <p style={{marginTop: '70px', fontSize: '16px', fontWeight: '400', color: '#616161'}}>Select all the products you have in your shop</p>

                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Search mode" {...this.a11yProps(0)} />
                        <Tab label="Barcode mode" {...this.a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        Item Two
                    </TabPanel>
                </SwipeableViews>
            </div>
        );
    }
}

export default withRouter(AddProducts);