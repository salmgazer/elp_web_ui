import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SectionNavbars from '../Components/Sections/SectionNavbars';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


import confirmImg from '../../assets/img/confirm.jfif';
import Button from "@material-ui/core/Button/Button";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
}));

const VerifySMS = props => {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <SectionNavbars>
                <CloseIcon/>
            </SectionNavbars>
            <React.Fragment>
                <CssBaseline />

                <Container maxWidth="sm">
                    <Box component="div" m={2} style={{paddingTop: '30px'}}>
                        <img className="img-responsive" src={confirmImg} alt={'test'}/>
                    </Box>
                    <Typography variant="h6" component="h6">
                        Verify phone number
                    </Typography>

                    <Typography
                        variant="h6"
                        component="p"
                        style={{fontSize: '14px' , color: '#e5e5e5', textAlign: 'center', width: '60%', margin: '0 auto' }}
                    >
                        Please enter the four digit pin sent to your phone
                    </Typography>
                    <TextField
                        style={{ margin: '10px 5px'}}
                        id="outlined-size-small"
                        size="small"
                        variant="outlined"
                    />


                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', fontSize: '12px', fontWeight: '700'}}
                        className={classes.button}
                    >
                        Finish
                    </Button>

                    <Grid
                        item xs={12}
                        style={{position: 'fixed', bottom: '40px', margin: '0 auto'}}
                    >
                        <Typography
                            component="span"

                        >
                            Didn't receive code?
                        </Typography>

                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', textAlign: 'center', color: '#DAAB59', padding: '5px 15px', fontSize: '12px', marginLeft: '10px'}}
                            className={classes.button + ' ' + classes.shadow1}
                        >
                            Resend code
                        </Button>
                    </Grid>
                </Container>
            </React.Fragment>
        </div>
    );
};

export default withRouter(VerifySMS);
