import React from 'react';
import SectionNavbar from '../../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from "@material-ui/core/Box/Box";
import Wallet from '../../../../assets/img/wallet.png';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dates from '../../../Components/Date/Date';
import Button from "@material-ui/core/Button/Button";

const MainView = props => {
    const changeView = (event) => {
        props.setView(1);
     };

    const viewHistory = (event) => {
    props.setView(3);
    };

    return (
        <div>
            <SectionNavbar 
                title="Reconciliation"
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <Box component="div" m={2} style={{marginTop: '100px'}}>
                <img className="img100" src={Wallet} alt={'test'}/>
            </Box>

            <Paper variant="outlined" >
                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', margin: '20px 0px' }} >
                    Generate reconciliation report
                </Typography>

                <Grid container spacing={1}  >
                    <Grid item xs={5.5}>
                         <Dates label='Start date' style={{width: '150px', border: '1px solid #DAAB59', marginLeft: '7px'}}/>
                    </Grid>

                    <Grid item xs={1}>
                        <p  className='text-dark font-weight-bold' style={{marginTop: '35px'}}>to</p>
                    </Grid>

                    <Grid item xs={5.5}>
                        <Dates label='End date' style={{width: '150px', border: '1px solid #DAAB59'}}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} style={{justifyContent: 'center'}}>
                    <Button
                        variant="contained"
                        style={{
                            'backgroundColor': '#DAAB59' , 
                            color: '#333333', 
                            padding: '5px 40px', 
                            textTransform: 'none', 
                            fontSize:'17px', 
                            margin: '40px'
                        }}
                        onClick={changeView.bind(this)}
                    >
                        Generate report
                    </Button>
                </Grid>

                <Button
                    variant="outlined"
                    style={{
                        border: '1px solid #DAAB59', 
                        color: '#DAAB59', 
                        padding: '5px 20px', 
                        textTransform: 'none', 
                        fontSize:'13px', 
                        justifyContent: 'center',
                        marginBottom: '10px'
                    }}
                    onClick={viewHistory.bind(this)}
                >
                    View history  
                </Button>

            </Paper>

        </div>
    )
}

export default MainView;