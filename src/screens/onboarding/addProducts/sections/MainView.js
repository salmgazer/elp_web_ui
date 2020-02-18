import React, {useState} from 'react';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../../Components/Tabs/TabPanel";
import SearchMode from "./SearchMode";
import BarcodeMode from "./BarcodeMode";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import {makeStyles} from "@material-ui/core";

const MainView = props => {
    const [value , setValue] = useState(0);
    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    const addProduct = (pId , event) => {
        props.productAdd(pId);
    };

    const useStyles = () => makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return(
        <div>
            <p style={{marginTop: '70px', fontSize: '16px', fontWeight: '400', color: '#616161'}}>Select all the products you have in your shop</p>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Search mode" {...a11yProps(0)} />
                    <Tab label="Barcode mode" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <SearchMode products={props.products} productAdd={addProduct.bind(this)}/>
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <BarcodeMode/>
                </TabPanel>
            </SwipeableViews>
            <Box
                className={`shadow1 bg-white`}
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', fontSize: '14px'}}
                    onClick=""
                    className={`capitalization font-weight-bold text-dark`}
                >
                    View added products
                    <span className={`btnPCount`}>
                        {props.spCount}
                    </span>
                </Button>
            </Box>
        </div>
    )
};

export default MainView;