import React, {useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Date from '../../../components/Date/Date';
import Box from "@material-ui/core/Box/Box";
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import {confirmAlert} from "react-confirm-alert";


// import SingleProductView from './auditHistory/SingleProductView';
import AddedProductSingle from "./viewAdded/AddedSingleView";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
      textAlign: 'center'
    },
    search: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '25px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    formControl: {
        minWidth: 100,
    }
}));

const AuditHistory = props => {

    const classes = useStyles();
    const [type, setType] = useState(10);
    const [successDialog, setSuccessDialog] = useState(false);
    const [loading , setLoading] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [error , setError] = useState(false);

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(3);
     };

     const editProductHandler = (pId , event) => {
        //props.productEdit(pId , 3);
    };

    const balanceAll = async (event) => {
        setLoading(true);

        await confirmAlert({
            title: 'Confirm to balance all',
            message: 'Are you sure you want to balance all products.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        if(await props.balanceAllHandler()){
                            setSuccessDialog(true);

                            setTimeout(function(){
                                setSuccessDialog(false);
                                setLoading(false);
                                props.setView(0)
                            }, 2000);
                        }else{
                            setErrorMsg('OOPS. Something went wrong please try again');
                            setError(true);
                            setTimeout(function(){
                                setError(false);
                            }, 3000);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        setLoading(false);
                        return false;
                    }
                }
            ]
        })

       /* await props.balanceAllHandler();

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            setLoading(false);
            props.setView(0)
        }, 2000);*/
        /*if(status){

        }else{
            setErrorMsg('OOPS. Something went wrong please try again');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
        }*/
    };

    return(
        <div>

            <SectionNavbar 
                title="Audit History"
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <SimpleSnackbar
                openState={successDialog}
                message={`Audit successfully completed`}
            >
            </SimpleSnackbar>

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar>

            <Grid container spacing={1} className={classes.root} >
                <Date style={{width: '170px', border: '1px solid #DAAB59'}}/>
            </Grid>

            <div className="row p-0 pt-0 mx-0 mt-6 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', paddingTop: '5px' , paddingBottom: '5px'}}
                    className={`text-center mx-auto w-100 text-dark font-weight-bold`}
                >
                    {`Items added : (${props.auditEntries.length})` }
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <Paper className={classes.root} >
                            <InputBase
                                className={`${classes.input} search-box`}
                                placeholder="Search for a product"
                                inputProps={{ 'aria-label': 'Search for a product' }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>

                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <Paper className={classes.select} >
                            <Select
                                value={type}
                                onChange={handleTypeChange}
                                style={{width: '100%' , backgroundColor: 'rgba(255, 255, 255, 0)' , border: 'none'}}
                            >
                                <MenuItem value={10}>All products</MenuItem>
                                <MenuItem value={30}>Positive difference</MenuItem>
                                <MenuItem value={20}>Negative difference</MenuItem>
                                <MenuItem value={40}>Zero difference</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <div style={{width: '95%', padding: '0px 2%' , paddingTop: '5px', paddingBottom: '60px'}}>

                <Box style={{marginTop: '2px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {props.auditEntries.map((item) => <AddedProductSingle deleteAuditProductEntry={props.deleteProductHandler} editAuditProductEntry={props.productAdd} editStoreProduct={editProductHandler.bind(this)} key={item.id} product={item.product.fetch()} item={item}/>)}
                </Box>
            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                    onClick={backHandler.bind(this)}
                >
                    Back  
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={balanceAll.bind(this)}
                    disabled={loading}
                >
                    Balance
                </Button>
            </Box>

        </div>

    )
}

export default AuditHistory;