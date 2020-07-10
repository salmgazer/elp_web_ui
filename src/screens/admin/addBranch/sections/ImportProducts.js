import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box/Box";
import SuccessImage from '../../../../assets/img/success2.png';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import paths from '../../../../utilities/paths';
import MainDialog from '../../../../components/Dialog/MainDialog';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const CheckoutView = props => {

    const classes = useStyles();
    const [mainDialog, setMainDialog] = useState(false);
    const {history} = props;
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
    });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    const openDialog = () => {
        setMainDialog(true);
    }

    const handleDialogClose = () => {
        setMainDialog(false);
    }

    return(
        <div className={classes.root} >

            <ArrowBackIcon  style={{position: 'relative', float: 'left', fontSize: '2rem', marginLeft: '10px'}}
                onClick={backHandler.bind(this)}
            />

            <Box component="div" m={2} style={{margin: '16px 0px 30px 0px'}}>
                <img className="img100" src={SuccessImage} alt={'test'}/>
            </Box>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '22px', marginBottom: '10px' }} >
                Branch created successfully
            </Typography>

            <Typography className="font-weight-light mt-1" style={{ fontSize: '20px', margin: '10px', fontStyle: 'italic' }} >
                The next step is to add products to your store. You can also import products from your store.
            </Typography>


            <Button
                variant="contained"
                className='text-dark font-weight-bold'
                style={{
                    backgroundColor: '#DAAB59', 
                    color: '#333333', 
                    padding: '5px 30px', 
                    textTransform: 'none', 
                    fontSize: '18px', 
                    marginTop: '10px'
                }} 
                onClick = {openDialog.bind(this)}     
            >
                    Import from another shop
            </Button>

            <Grid container style={{textAlign: 'center', paddingBottom: '20px', marginTop: '30px'}}>
                <Grid item xs={12} style={{ color: '#DAAB59'}} onClick={() => history.push(paths.category_setup)} >
                    The products in this branch are different
                </Grid>
            </Grid>

            <MainDialog 
                handleDialogClose = {handleDialogClose.bind(this)}
                states = {mainDialog}
                title={
                    <Typography className='text-dark font-weight-bold' style={{ fontSize: '16px', marginBottom: '10px' }} >
                        Select the store(s) you want to import products from
                    </Typography>
                }
                footer = {
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px', textTransform: 'Capitalize', margin: 'auto'}}
                        // onClick={() => props.setView(1)}
                    >
                        Import
                    </Button>
                }
            >
                <div>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                            label="Select all"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                            label="Lapaz branch"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox checked={state.checkedF} onChange={handleChange} name="checkedF" />}
                            label="Adenta branch"
                        />
                    </FormGroup>
                </div>

            </MainDialog>

        </div>
    )

}

  export default withRouter(CheckoutView);