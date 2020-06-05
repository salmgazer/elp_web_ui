import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import SingleConfirm from "./singlePages/SingleConfirm";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '70px',
    },
    title: {
        fontSize: 11,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 50px',
        marginRight: '10px',
        marginTop: '10px',
        textTransform: 'none',
    }
  }));


const CartView = props => {

    const classes = useStyles();

    const deleteProductHandler = (event) => {
        props.deleteReturn(event);
    };

    const setView = (step) => {
        props.setView(step);
    };

    return(
        <div className={classes.root}>
            <SectionNavbars
                title="Return Purchases"
                leftIcon={
                    <div onClick={() => setView(5)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            QUANTITY
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            12
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            TOTAL
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            GHC 70.00
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            

            <Button
                variant="outlined"
                style={{fontSize: '16px'}}
                className={classes.button}
            >
                Kasapreko Limited
            </Button>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No return items
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    props.products.map((item) => <SingleConfirm deleteReturnEntry={deleteProductHandler.bind(this)} key={item.id} item={item}/>)
                }
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                >
                    Confirm
                </Button>
            </Box>
           
        </div>
    )
}

export default withRouter(CartView);