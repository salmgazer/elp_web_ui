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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const values = [
    {
      value: '20',
      label: '20 Tots',
    },
    {
      value: '30',
      label: '30 Tots',
    },
    {
      value: '40',
      label: '40 Tots',
    },
    {
      value: '50',
      label: '50 Tots',
    }
  ];


const Step2 = props => {
   
    const [state, setState] = React.useState({
        firstBox: false,
        secondBox: false,
        thirdBox: false,
        forthBox: false,
    });
    const [tots, setTots] = React.useState('20');

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleTotsChange = (event) => {
        setTots(event.target.value);
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
                Now, lets set up your bottles
            </Typography>

            <Box component="div" m={2} style={{marginTop: '1rem'}}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>

            <Paper elevation={3} style={{margin: '0px 10px 4rem 10px', padding: '20px 0px'}}>
                <Typography className="font-weight-light mt-1" style={{ fontSize: '17px', margin: '10px' }} >
                    Select the bottle sizes you use as tots:
                </Typography>

                <Grid container >
                    <Grid item xs={6} > 
                        
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.firstBox}
                                onChange={handleChange}
                                name="firstBox"
                                color="primary"
                            />
                            }
                            label="1 litre bottle"
                        />

                        {state.firstBox === true
                            ?
                            <TextField
                                id="outlined-select-receive-native"
                                select
                                size="small"
                                value={tots}
                                style={{width: '150px', margin: '10px'}}
                                onChange={handleTotsChange}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                >
                                {values.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                            :
                            ''
                        }

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.secondBox}
                                onChange={handleChange}
                                name="secondBox"
                                color="primary"
                            />
                            }
                            label="250 litre bottle"
                        />

                        {state.secondBox === true
                            ?
                            <TextField
                                id="outlined-select-receive-native"
                                select
                                size="small"
                                value={tots}
                                style={{width: '150px', margin: '10px'}}
                                onChange={handleTotsChange}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                >
                                {values.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                            :
                            ''
                        }

                    </Grid>
                    <Grid item xs={6} >
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.thirdBox}
                                onChange={handleChange}
                                name="thirdBox"
                                color="primary"
                            />
                            }
                            label="750 litre bottle"
                        />

                        {state.thirdBox === true
                            ?
                            <TextField
                                id="outlined-select-receive-native"
                                select
                                size="small"
                                value={tots}
                                style={{width: '150px', margin: '10px'}}
                                onChange={handleTotsChange}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                >
                                {values.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                            :
                            ''
                        }

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.forthBox}
                                onChange={handleChange}
                                name="forthBox"
                                color="primary"
                            />
                            }
                            label="180 litre bottle"
                        />

                        {state.forthBox === true
                            ?
                            <TextField
                                id="outlined-select-receive-native"
                                select
                                size="small"
                                value={tots}
                                style={{width: '150px', margin: '10px'}}
                                onChange={handleTotsChange}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                >
                                {values.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                            :
                            ''
                        }
                    </Grid>
                </Grid>
            </Paper>

            {/* <MobileStepper
                variant="dots"
                steps={2}
                position="fixed"
                activeStep={activeStep}
            /> */}
            
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