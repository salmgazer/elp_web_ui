import React, {Component} from 'react';
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../Components/Tabs/TabPanel";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router";

import PurchaseSortDate from './sections/PurchaseSortDate';
import PurchaseSortProduct from './sections/PurchaseSortProduct';

class PurchaseHistory extends Component {

    state={
        value: 0
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
                    title="Purchase history"  
                    icons={
                        <MoreVertIcon 
                            style={{fontSize: '2rem'}}
                        />}
                >
                    <MenuIcon
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
                        <Tab style={{textTransform: 'none'}} label="Sort by date"  {...a11yProps(0)} />
                        <Tab style={{textTransform: 'none'}} label="Sort by product"   {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0} >
                        <PurchaseSortDate />
                    </TabPanel>

                    <TabPanel value={this.state.value} index={1} >
                        <PurchaseSortProduct />
                    </TabPanel>

                </SwipeableViews>

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
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                    >
                        Print
                    </Button>
                </Box>

            </div>
        )
    }

}

export default withRouter(PurchaseHistory);