import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {makeStyles} from "@material-ui/core";
import SingleProduct from "./singleViews/SingleProduct";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MainDialog from "../../../../components/Dialog/MainDialog";
import SearchInput from "../../../Components/Input/SearchInput";
import PrimaryLoader from "../../../../components/Loader/Loader";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    select: {
        width: '100%',
        display: 'flex',
        padding: '2px 0px',
        alignItems: 'center',
        borderRadius: '2px',
        height: '35px',
        border: '0.5px solid #333333',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        //marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const AuditedProductsView = props => {
    const {history} = props;
    const [type, setType] = useState('all');
    const [mainDialog, setMainDialog] = useState(false);
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const handleTypeChange = event => {
        setType(event.target.value);
        // props.changeProductsType(event.target.value)
    };

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    // const editProductHandler = (pId , event) => {
    //     //props.productEdit(pId , 3);
    // };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchProduct(value);
    };

    const classes = useStyles();

    return(
        <div>
            <SectionNavbars
                title="Stock"
                leftIcon={
                    <div>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftOnClick={() => history.goBack()} 
            />

            {/* <SimpleSnackbar
                openState={successDialog}
                message={`Products successfully added`}
            >
            </SimpleSnackbar>

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar> */}

            <div className="row p-0 pt-0 mx-0 mt-6 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', paddingTop: '5px' , paddingBottom: '5px'}}
                    className={`text-center mx-auto w-100 text-dark font-weight-bold`}
                >
                    {`Added products : (${props.addedProducts.length})` }
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <SearchInput
                            inputName="search"
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>

                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <Paper className={classes.select} >
                            <Select
                                value={type}
                                onChange={handleTypeChange}
                                style={{width: '100%' , backgroundColor: 'rgba(255, 255, 255, 0)' , border: 'none'}}
                            >
                                <MenuItem value="all">All products</MenuItem>
                                <MenuItem value="incomplete">Incomplete products</MenuItem>
                                <MenuItem value="unstocked">Unstocked products</MenuItem>
                                <MenuItem value="stocked">Stocked products</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                </Grid>
            </div>


            <div style={{width: '95%', padding: '0px 2%' , paddingTop: '5px', paddingBottom: '60px'}}>

                <Box style={{marginTop: '2px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {props.addedProducts.map((item) => <SingleProduct key={item.id} item={item}/>)}
                </Box>
            </div>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog}>
                <div className="row p-3 pt-0 mx-auto text-center">

                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontSize: '16px' , margin: '0px 0px', padding: '16px', lineHeight: '1.3'}}
                        className={`text-center mb-2 mx-auto text-dark font-weight-bold`}
                    >
                        You have not stocked up all the products in the list.
                    </Typography>

                    <div className="text-center mx-auto">
                        <label style={{fontWeight: '500'}}>I want to complete stock info.</label>
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 80px'}}
                            onClick={closeDialogHandler.bind(this)}
                            className={`capitalization mt-2`}
                            disabled={props.loading}
                        >
                            Go back
                        </Button>
                    </div>

                    <div className="text-center mx-auto my-4">
                        <label style={{fontWeight: '500'}}>I have finished adding products.</label>
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , border: '1px solid #DAAB59', color: '#000000', padding: '7px 86px'}}
                            onClick={() => props.setView(3)}
                            className={`capitalization mt-2`}
                            disabled={props.loading}
                        >
                            {
                                props.loading ?
                                    <PrimaryLoader
                                        style={{width: '30px' , minHeight: '2.5rem'}}
                                        color="#FFFFFF"
                                        type="Oval"
                                        className={`mt-1`}
                                        width={25}
                                        height={25}
                                    />
                                    :
                                    'Finish'
                            }
                        </Button>
                    </div>
                </div>
            </MainDialog>

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
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', float: 'right', marginRight: '5px'}}
                            onClick={() => history.goBack()} 
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', float: 'left', marginLeft: '5px'}}
                            onClick={openDialogHandler.bind(this)}
                        >
                            Finish
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default withRouter(AuditedProductsView);
