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

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    },
    paper: {
        padding: theme.spacing(1),
        height: '60px'
    },
    box: {
        margin: theme.spacing(1),
        width: '90%',
        textAlign: 'center',
    }
}));

const CreditCard = props => {

    const classes = useStyles();

    const openMtn = (event) => {
        props.setView(1);
    };

    const openVodafone = (event) => {
        props.setView(2);
    };

    const openAirtelTigo = (event) => {
        props.setView(3);
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

            <Grid container spacing={1} className={classes.root} >
                <Grid item xs={3}>
                    <Paper className={classes.paper} style={{backgroundColor: '#DAAB59' }}>
                        <img className="img100" src={Credit} alt={'test'} style={{marginTop: '3px'}} />
                    </Paper>
                </Grid>
                
                <Grid item xs={3}>
                    <Paper className={classes.paper} onClick={openMtn.bind(this)}>
                        <img className="img100" src={Mtn} alt={'test'} style={{marginTop: '10px'}}/>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper} onClick={openVodafone.bind(this)}>
                        <img className="img100" src={Vodafone} alt={'test'} style={{marginTop: '10px'}}/>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper} onClick={openAirtelTigo.bind(this)}>
                        <img className="img100" src={AirtelTigo} alt={'test'} style={{marginTop: '15px'}}/>
                    </Paper>
                </Grid>
                
            </Grid>

            <form noValidate autoComplete="off">
                <Grid container spacing={1}>
                <Grid item xs={12} style={{margin: '20px 0px'}} >
                    <TextField  label="Card number" required type="number"
                        variant="outlined" />
                </Grid>

                <Grid item xs={2} style={{margin: '20px 0px'}} ></Grid>
                <Grid item xs={4} style={{margin: '20px 0px'}} >
                    <TextField  label="Expiry date" required type="number"
                        variant="outlined"/>
                </Grid>
                <Grid item xs={3} style={{margin: '20px 0px'}} >
                    <TextField  label="CVV" required type="number"
                        variant="outlined"/>
                </Grid>
                <Grid item xs={3} style={{margin: '20px 0px'}} ></Grid>

                <Grid item xs={12} style={{margin: '20px 0px'}} >
                    <TextField  label="Cardholder name" required
                        variant="outlined" />
                </Grid>

                <Grid item xs={12} style={{margin: '20px 0px'}} >
                    <Checkbox label="Save card" style={{marginLeft: '60px'}} />
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
                    
                >
                    Pay
                </Button>
            </Box>

        </div>
    )
}

export default CreditCard;