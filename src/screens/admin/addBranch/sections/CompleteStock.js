import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box/Box";
import CongratsImage from '../../../../assets/img/congrats.png';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";
import paths from '../../../../utilities/paths';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

const CheckoutView = props => {

    const classes = useStyles();
    const {history} = props;

    const backHandler = (event) => {
        props.setView(0);
    };

    return(
        <div className={classes.root} >

            <Box component="div" m={2} style={{margin: '16px 0px 30px 0px'}}>
                <img className="img100" src={CongratsImage} alt={'test'}/>
            </Box>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '22px', marginBottom: '10px' }} >
                Congratulations...
            </Typography>

            <Typography className="text-dark" style={{ fontSize: '17px', marginBottom: '10px' }} >
                Your shop is all stocked up!
            </Typography>

            <Button
                variant="contained"
                className='text-dark font-weight-bold'
                style={{
                    backgroundColor: '#DAAB59', 
                    color: '#333333', 
                    padding: '5px 50px', 
                    textTransform: 'none', 
                    fontSize: '18px', 
                    margin: '10px 0px',
                }} 
                onClick={() => history.push(paths.sell)}
            >
                    Start selling
            </Button>

            <Typography className="text-dark" style={{ fontSize: '17px', margin: '10px' }} >
                You can add another shop location, warehouse and attendants in settings
            </Typography>

            <Button
                variant="outlined"
                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', textTransform: 'Capitalize'}}
                //onClick={() => history.goBack()}
            >
                Go to settings
            </Button>

        </div>
    )

}

  export default withRouter(CheckoutView);