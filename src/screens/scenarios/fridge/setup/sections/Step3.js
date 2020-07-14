import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import shopImg from "../../../../../assets/img/question.png";
import Button from "@material-ui/core/Button/Button";
import SectionNavbars from '../../../../../components/Sections/SectionNavbars';
import { Grid } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
                leftOnClick={() => props.step(0)} 
            />

            <Typography style={{ fontSize: '17px', marginTop: '4.5rem' }} >
                A few questions
            </Typography>

            <Box component="div" m={2} style={{marginTop: '1rem'}}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>


            <Typography className="font-weight-light mt-1" style={{ fontSize: '17px', margin: '20px' }} >
                Do you separate the cash from fridge sales from your main shop sales?
            </Typography>

            <Grid container >
                <Grid item xs={6} >
                    
                    <Paper 
                        className={classes.paper}
                        style={{'backgroundColor': '#ffffff' , color: 'red', fontSize:'17px'}}
                    >
                        No
                    </Paper>
                </Grid>
                <Grid item xs={6} >
                    <Paper 
                        className={classes.paper}
                        style={{'backgroundColor': '#ffffff' , color: 'green', fontSize:'17px'}}
                    >
                        Yes
                    </Paper>
                </Grid>
            </Grid>
            
            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={12} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px', textTransform: 'none', fontSize:'17px'}}
                            //onClick={() => props.step(2)}
                        >
                            Start adding stock
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
};

export default withRouter(Step2);