import React, {useState} from 'react';
import SystemDate from "../../../Components/Date/SystemDate";
import Grid from "@material-ui/core/Grid";
import CardGridComponent from "../../../dashboard/Sections/CardGridComponent";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AppBar from "@material-ui/core/AppBar/AppBar";
import TabPanel from "../../../../components/Tabs/TabPanel";
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import {withRouter} from 'react-router-dom';
import paths from "../../../../utilities/paths";
import SellSearchMode from "./SearchMode/SellSearchMode";
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import BarcodeMode from "./BarcodeMode/BarcodeMode";

const SellView = props => {
    const { history } = props;

    const salesMade = props.salesMade;
    const profitMade = props.profitMade;
    const spCount = props.spCount;
    const [value , setValue] = useState(0);

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

    return (
        <div >
            <SectionNavbars title={`Sales`}>
                <MenuIcon
                    onClick={() => this.setState({
                        isDrawerShow: true,
                    })}
                    style={{fontSize: '2.5rem'}}
                />
            </SectionNavbars>

            <div className={`mb-7 mx-0 mt-7`}>
                <SystemDate/>

                <div className={`px-5 mb-3`}>
                    <Grid container spacing={1}>

                        <CardGridComponent
                            title="Sales"
                            amount={salesMade}
                        />
                        <CardGridComponent
                            title="Profit"
                            amount={profitMade}
                        />

                    </Grid>
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
                        <SellSearchMode productAdd={props.productAdd} products={props.products}/>
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
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', fontSize: '14px'}}
                    onClick={() => history.push(paths.cart)}
                    className={`capitalization font-weight-bold text-dark`}
                >
                    View cart
                    <span className={`btnPCount`}>
                        {spCount}
                    </span>
                </Button>
            </Box>
        </div>
    )
};

export default withRouter(SellView);