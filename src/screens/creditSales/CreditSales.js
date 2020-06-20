import React, {useEffect, useState} from "react";
import {withRouter } from "react-router-dom";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { Q } from "@nozbe/watermelondb";
import SectionNavbars from "../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import SearchInput from "../Components/Input/SearchInput";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import SingleCustomer from './SingleCustomer';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BottomDrawer from "../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import ListItemText from '@material-ui/core/ListItemText';
import BranchService from "../../services/BranchService";
import LocalInfo from "../../services/LocalInfo";
import CompanyService from "../../services/CompanyService";

const CreditSales = props => {

    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [companySales , setCompanySales] = useState(false);
    
    const { history, branchCustomers } = props;
    console.log(branchCustomers);

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        const response = await new CompanyService().getSalesDetails('year');
        setCompanySales(response);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchCustomer(value);
    };

    return (
        <div>
            <SectionNavbars
                title="Credit view"
                leftIcon={
                    <div onClick={() => history.goBack()} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
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

            <Paper>
                <Grid container spacing={2} style={{marginTop: '60px', marginBottom: '10px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px 8px 15px 8px'}} className={`mx-auto mt-7`}>
                        <SearchInput
                            inputName="search"
                            styles={{
                                border: '1px solid #e5e5e5',
                                padding: '4px 0px'
                            }}
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Paper style={{marginTop: '13px'}} >
                <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                        <Typography  style={{ fontSize: '15px'}} >
                            Total credit sales: GHC {companySales.credit}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {branchCustomers.length === 0
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
                                    No customer found
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    branchCustomers.map((branchCustomer) =>

                        <SingleCustomer key={branchCustomer.customerId} customer={branchCustomer.customer.fetch()} />
                            
                    )
                }
            </Box>

        </div>
    )
};

const EnhancedCreditSales= withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database }) => ({
        branchCustomers: new BranchService(LocalInfo.branchId).getCustomers(),
    }))(withRouter(CreditSales))
);

export default withRouter(EnhancedCreditSales);