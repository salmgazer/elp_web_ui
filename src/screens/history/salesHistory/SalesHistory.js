import React, {useState} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../../components/Tabs/TabPanel";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import BottomDrawer from "../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import ListItemText from '@material-ui/core/ListItemText';
import {withRouter} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SortDate from './sections/SortDate';
import SortProduct from './sections/SortProduct';
import { Grid } from '@material-ui/core';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(({
    tabPrimaryColor: {
        backgroundColor: `#daab59 !important`,
        color: `#daab59 !important`,
    },
}));

const SalesHistory = props => {
    const [value , setValue] = useState(0);
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const styles = useStyles();
    const { history } = props;

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return(
        <div>
            <SectionNavbars
                title="Sales history"
                leftIcon={
                    <div>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftOnClick={() => history.goBack()} 
                // icons={
                //     <div onClick={() => setIsShowDrawer(true)}>
                //         <MoreVertIcon
                //             style={{fontSize: '2rem'}}
                //         />
                //     </div>
                // }
            />

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem button key={11}>
                        <ListItemIcon><ShareIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Share" />
                    </ListItem>
                    <ListItem button key={12}>
                        <ListItemIcon><CloudUploadIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Upload" />
                    </ListItem>
                    <ListItem button key={13}>
                        <ListItemIcon><FileCopyIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Copy" />
                    </ListItem>
                    <ListItem button key={14}>
                        <ListItemIcon><PrintIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Print this page" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    style={{marginTop: '60px'}}
                    textColor="primary"
                    variant="fullWidth"
                    selectionfollowsfocus="true"
                    aria-label="full width tabs example"
                    classes= {{
                        indicator: styles.tabPrimaryColor
                    }}
                >
                    <Tab style={{textTransform: 'none'}} label="Sort by date"  {...a11yProps(0)} />
                    <Tab style={{textTransform: 'none'}} label="Sort by product"   {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} >
                    <SortDate />
                </TabPanel>

                <TabPanel value={value} index={1} >
                    <SortProduct start={value} />
                </TabPanel>

            </SwipeableViews>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px', float: 'right', marginRight: '5px'}}
                            onClick={() => history.goBack()}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px', float: 'left', marginLeft: '5px'}}
                        >
                            Print
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
};

export default withRouter(SalesHistory);
