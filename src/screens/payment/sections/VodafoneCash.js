import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Mtn from '../../../assets/img/mtn.png';
import Credit from '../../../assets/img/visa.png';
import Vodafone from '../../../assets/img/vodafone.jpeg';
import AirtelTigo from '../../../assets/img/airteltigo.jpg';
import TextField from '@material-ui/core/TextField';
import Checkbox from '../../Components/Checkbox/Checkbox';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import MainDialog from '../../Components/Dialog/MainDialog';
import Wallet from '../../../assets/img/wallet.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    },
    paper: {
        padding: theme.spacing(1),
        height: '60px'
    }
}));

const VodafoneCashPage = props => {

    const classes = useStyles();
    const [mainDialog, setMainDialog] = React.useState(false);

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const openAirtelTigo = (event) => {
        props.setView(3);
    };

    const openMtn = (event) => {
        props.setView(1);
    };

    const openCreditCard = (event) => {
        props.setView(0);
    };



    return(
        <div>
            <SectionNavbar 
                title="Payment"
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <Grid container spacing={1} className={classes.root} onClick={openCreditCard.bind(this)} >
                <Grid item xs={3}>
                    <Paper className={classes.paper} >
                        <img className="img100" src={Credit} alt={'test'} style={{marginTop: '3px'}} />
                    </Paper>
                </Grid>
                
                <Grid item xs={3}>
                    <Paper className={classes.paper} onClick={openMtn.bind(this)}>
                        <img className="img100" src={Mtn} alt={'test'} style={{marginTop: '10px'}}/>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper} style={{backgroundColor: '#DAAB59' }}>
                        <img className="img100" src={Vodafone} alt={'test'} style={{marginTop: '10px'}}/>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper} onClick={openAirtelTigo.bind(this)} >
                        <img className="img100" src={AirtelTigo} alt={'test'} style={{marginTop: '15px'}}/>
                    </Paper>
                </Grid>
                
            </Grid>
            
            <form noValidate autoComplete="off">
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{margin: '20px 0px'}} >
                        <TextField  label="Phone number" required type="number"
                            variant="outlined" />
                    </Grid>

                    <Grid item xs={12} style={{margin: '20px 0px'}} >
                        <TextField  label="Reference" required type="text"
                            variant="outlined" />
                    </Grid>

                    <Grid item xs={12} style={{margin: '20px 0px'}} >
                        <Checkbox label="Save details" style={{marginLeft: '60px'}} />
                    </Grid>
                </Grid>
                
            </form>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 70px', textTransform: 'none', fontSize:'17px'}}
                    onClick={openDialogHandler.bind(this)}
                >
                    Pay
                </Button>
            </Box>


            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row p-3 pt-0 mx-auto text-center w-100" >

                    <Box component="div" m={2}>
                        <img className="img100" src={Wallet} alt={'test'}/>
                     </Box>

                    <div className="text-center mx-auto my-3">
                        <Typography
                            component="p"
                            variant="h6"
                            style={{fontSize: '16px' , margin: '0px 0px', padding: '16px'}}
                            className={`text-center mb-2 mx-auto w-90 text-dark font-weight-bold`}
                        >
                            Hello! It's time for your monthly payment of
                        </Typography>

                        <Typography
                            component="p"
                            variant="h6"
                            style={{fontSize: '22px' , margin: '0px 0px', padding: '16px'}}
                            className={`text-center mb-2 mx-auto w-90 text-dark font-weight-bold`}
                        >
                            GHC 60
                        </Typography>
                    </div>

                    <div className="text-center mx-auto my-3">
                        <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 50px', textTransform: 'none', fontSize:'17px'}}
                            >
                                Pay now
                        </Button>
                    </div>

                </div>
            </MainDialog>

        </div>
    )
}

export default VodafoneCashPage;