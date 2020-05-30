import React from 'react';
import SectionNavbar from '../../../../components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from "@material-ui/core/Box/Box";
import Wallet from '../../../../assets/img/wallet.png';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dates from '../../../../components/Date/Date';
import Button from "@material-ui/core/Button/Button";

const MainPage = props => {
    const changeView = (event) => {
        props.setView(6);
     };

    const viewHistory = (event) => {
    props.setView(7);
    };

    return (
        <div>
            <SectionNavbar 
                title="Reconciliation"
                leftIcon={
                    <div>
                        <ArrowBackIosIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Box component="div" m={2} style={{marginTop: '100px'}}>
                <img className="img100" src={Wallet} alt={'test'}/>
            </Box>

            <Paper variant="outlined" >
                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', margin: '20px 0px' }} >
                    Generate reconciliation report
                </Typography>

                <Grid container spacing={1}  >
                    <Grid item xs={5.5}>
                        <label className={`text-center`} style={{fontSize: '15px', marginBottom: '10px'}}>Start date</label>

                        <Dates style={{padding: '3px 0px', marginLeft: '5px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', float: 'center', width: '150px', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6' , marginTop: '2px'}} />
                    </Grid>

                    <Grid item xs={1}>
                        <p  className='text-dark font-weight-bold' style={{marginTop: '30px'}}>to</p>
                    </Grid>

                    <Grid item xs={5.5}>
                        <label className={`text-center`} style={{fontSize: '15px', marginBottom: '10px'}}>End date</label>

                        <Dates style={{padding: '3px 0px', marginLeft: '5px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', float: 'center', width: '150px', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6' , marginTop: '2px'}} />                    </Grid>
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
                            margin: '30px'
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

export default MainPage;