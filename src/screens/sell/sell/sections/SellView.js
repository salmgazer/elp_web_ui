import React, {useState} from 'react';
import SystemDate from "../../../../components/Date/SystemDate";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AppBar from "@material-ui/core/AppBar/AppBar";
import TabPanel from "../../../../components/Tabs/TabPanel";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box/Box";
import {withRouter} from 'react-router-dom';
import paths from "../../../../utilities/paths";
import SellSearchMode from "./SearchMode/SellSearchMode";
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import BarcodeMode from "./BarcodeMode/BarcodeMode";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SecondaryButton from "../../../../components/Buttons/SecondaryButton";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Divider from '@material-ui/core/Divider';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Drawer from "../../../../components/Drawer/Drawer";
import CardDefault from "../../../../components/Cards/CardDefault";
import Typography from "@material-ui/core/Typography/Typography";

const SellView = props => {
    const { history } = props;

    const branchProducts = props.branchProducts;
    const salesMade = (parseFloat(props.salesTodayDetails.total)).toFixed(2);
    const profitMade = (parseFloat(props.salesTodayDetails.profit)).toFixed(2);
    const spCount = props.spCount;
    const [value , setValue] = useState(0);
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.searchHandler(' ');
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div
        >
            <SectionNavbars
                title={`Sales`}
                icons={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftIcon={
                    <div onClick={() => setIsDrawerShow(true)}>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem
                        button
                        key={7}
                        onClick={() => history.push(paths.sales_returns)}
                    >
                        <ListItemIcon><RemoveShoppingCartOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Sales returns" />
                    </ListItem>
                    <ListItem
                        button
                        key={8}
                        onClick={() => history.push(paths.sales_history)}
                    >
                        <ListItemIcon><HistoryOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Sales history" />
                    </ListItem>
                    <ListItem
                        button
                        key={9}
                        onClick={() => history.push(paths.invoice_history)}
                    >
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText primary="Invoices" />
                    </ListItem>
                    <Divider/>
                    <ListItem
                        button
                        key={10}
                        onClick={() => setIsShowDrawer(false)}
                    >
                        <ListItemIcon><CloseOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <div
                className={`mb-7 mx-0 mt-6`}
            >
                <SystemDate/>

                <div
                    style={{
                        display: 'flex',
                        width: '85%',
                        alignItems: 'center',
                        margin: 'auto',
                        marginBottom: '10px' ,
                    }}
                >
                    <div
                        style={{
                            marginTop: '0px' ,
                            flex: 1,
                            marginRight: '10px',
                            borderRadius: '15px',
                        }}
                        onClick={() => history.push(paths.sales_history)}>
                        <CardDefault>
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '0.9rem'}}
                                className="italize"
                            >
                                Sales
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.0rem'}}
                            >
                                GHC {salesMade}
                            </Typography>

                        </CardDefault>
                    </div>

                    <div
                        style={{
                            marginTop: '0px' ,
                            flex: 1,
                            marginLeft: '10px',
                            borderRadius: '15px',
                        }}
                        onClick={() => history.push(paths.sales_history)}>
                        <CardDefault>
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '0.9rem'}}
                                className="italize"
                            >
                                Profit
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.0rem'}}
                            >
                                GHC {profitMade}
                            </Typography>
                        </CardDefault>
                    </div>
                </div>

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
                style={{backgroundColor: '#F3F3F3'}}
            >
                <TabPanel value={value} index={0}>
                    <SellSearchMode addToCart={props.addToCart} undoProductAdd={props.undoProductAdd} savedCartCount={props.savedCartCount} branchProducts={branchProducts} setView={props.setView} searchHandler={props.searchHandler} productAdd={props.productAdd} products={props.products}/>
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <BarcodeMode product={props.product} setView={props.setView} searchBarcode={props.searchBarcode}/>
                </TabPanel>
            </SwipeableViews>

            </div>

            <Box
                className={`shadow1 bg-white`}
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div
                    onClick={() => history.push(paths.cart)}
                >
                    <SecondaryButton
                        classes={`capitalization font-weight-bold text-dark`}
                    >
                        View cart
                        <ShoppingCartOutlinedIcon
                            style={{paddingLeft: '10px' , fontSize: '16px'}}
                        />
                        <span style={{
                            fontSize: '12px',
                            color: '#000000',
                            position: 'absolute',
                            top: -10,
                            right: '5%',
                            backgroundColor: '#FFFFFF',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            fontWeight: '500'
                        }}
                        >
                            {spCount}
                        </span>
                    </SecondaryButton>
                </div>
            </Box>
        </div>
    )
};

export default withRouter(SellView);
