import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SearchInput from "../../../Components/Input/SearchInput";
import paths from "../../../../utilities/paths";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import SingleCustomer from './singleViews/SingleCustomer';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import AddCustomerModal from "../../../../components/Modal/Customer/AddCustomerModal";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    }
}));

const ViewCustomers = props => {

    const classes = useStyles();
    const { history } = props;
    const branchCustomers = props.branchCustomers;
    const [addDialog, setAddDialog] = React.useState(false);
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const openAddDialog = (event) => {
        setAddDialog(true);
    };

    const viewCustomerDetails = (id) => {
        console.log(id);
        props.customerAdd(id, 1);
    };

    const setAddCustomerHandler = async() => {
        setAddDialog(false);
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
                title="Customers"
                leftIcon={
                    <div onClick={() => history.push(paths.admin)}>
                        <ArrowBackIosIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Grid container spacing={1} className={classes.root} justify="space-around" style={{padding: '0px 2% 20px', textAlign: 'center'}} >
                <Grid item xs={12} style={{marginTop: '15px', padding: '4px 4px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                        styles={{width: '95%'}}
                    />
                </Grid>   
            </Grid>

            {branchCustomers.length === 0
                ?
                <Grid
                    item xs={12}
                    className={`text-left pl-2`}
                >
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontSize: '16px'}}
                            className={`text-center text-dark w-100`}
                        >
                            No customer found
                        </Typography>
                    </div>
                </Grid>
                :
                branchCustomers.map((branchCustomer) =>
                <Grid key={branchCustomer.customerId} item xs={12} >
                <div
                    onClick={viewCustomerDetails.bind(this, branchCustomer.customerId)}
                >
                    <SingleCustomer customer={branchCustomer.customer.fetch()}>
                        
                    </SingleCustomer>
                </div>
                </Grid>
                )
            }

            {/* {props.customersList.map((item) => <SingleCustomer  key={item.id} customers={item} setView={props.setView} />)} */}

            <AddCustomerModal
                openCustomerAddState={addDialog}
                setCustomer={setAddCustomerHandler.bind(this)}
                handleClose={() => setAddDialog(false)}
            />

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px', textTransform: 'Capitalize'}}
                    onClick={() => history.push(paths.admin)}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', textTransform: 'Capitalize'}}
                    onClick={openAddDialog.bind(this)}
                >
                    New customer
                </Button>
            </Box>

        </div>
    )
}

export default withRouter(ViewCustomers);