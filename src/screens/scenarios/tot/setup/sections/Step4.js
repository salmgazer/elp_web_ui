import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import shopImg from "../../../../../assets/img/question.png";
import Button from "@material-ui/core/Button/Button";
import SectionNavbars from '../../../../../components/Sections/SectionNavbars';
import { Grid } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Step2 = props => {

    const classes = useStyles();
    // const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.step(4);
      };
    
    //   const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //   };

    return(
        <div>

            <SectionNavbars 
                title="Setup Fridge"
                leftIcon={  
                    <div>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftOnClick={() => props.step(2)} 
            />

            <Typography style={{ fontSize: '17px', marginTop: '4.5rem' }} >
                A few questions
            </Typography>

            <Box component="div" m={2} style={{marginTop: '1rem'}}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>


            <Typography className="font-weight-light mt-1" style={{ fontSize: '17px', margin: '20px' }} >
                Will you record every sale as it is made?
            </Typography>

            <Grid container >
                <Grid item xs={6} >
                    
                    <Paper 
                        className={classes.paper}
                        style={{'backgroundColor': '#ffffff' , color: 'red', fontSize:'17px'}}
                        onClick={handleNext}
                    >
                        No
                    </Paper>
                </Grid>
                <Grid item xs={6} >
                    <Paper 
                        className={classes.paper}
                        style={{'backgroundColor': '#ffffff' , color: 'green', fontSize:'17px'}}
                        onClick={handleNext}
                    >
                        Yes
                    </Paper>
                </Grid>
            </Grid>

            {/* <MobileStepper
                variant="dots"
                steps={2}
                position="fixed"
                activeStep={activeStep}
            /> */}
            
            {/* <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={12} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => props.step(2)}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Box> */}

        </div>
    );
};

export default withRouter(Step2);