import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import MainDialog from '../../../../../components/Dialog/NewDialog';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import SingleDayProduct from './SingleDayProduct';


const SingleDayInvoice = props => {
   
    const invoice = props.item;
    const [mainDialog, setMainDialog] = React.useState(false);

    const preventDefault = event => event.preventDefault();

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>

                <Grid item xs={8} style={{display: 'table', height: '60px', margin: '8px 0px'}} onClick={openDialogHandler.bind(this)} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' >{invoice.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {invoice.date}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>GHC {invoice.worth}</div>
                    </div>
                </Grid>

                <Grid item xs={4} style={{height: '60px', margin: '10px 0px 0px 0px'}} onClick={openDialogHandler.bind(this)} >  
                    <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>INV. {invoice.number}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'red'}}> {invoice.status}</div>
                    </div> 
                </Grid>

            </Grid>

            <MainDialog 
                handleDialogClose={closeDialogHandler.bind(this)} 
                states={mainDialog}
                title={

                    <Grid container spacing={1} >

                        <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >{invoice.name}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>INV. {invoice.number}</div> 
                            </div>
                        </Grid>

                        <Grid item xs={5} style={{height: '60px', margin: '15px 0px'}}>  
                            <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'right'}}>
                                <div className="text-dark font-weight-bold" style={{ fontSize: '13px', color: 'red'}}>GHC {invoice.worth} owed</div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 5px',  textTransform: 'none', fontSize:'10px'}}
                                        // onClick={openPayment.bind(this)}
                                    >
                                        Enter payment  
                                    </Button>
                                </div>
                            </div>  
                        </Grid>
                    </Grid>
                }
                action={ 

                    <Grid container spacing={1} className={`shadow1 mb-3`}>

                        <Grid item xs={12} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'center', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className="text-dark font-weight-bold" style={{ fontSize: '15px'}}>Total cost </div> 
                                <div className="font-weight-light mt-1" style={{ fontSize: '20px'}}>GHC {invoice.worth}.00</div> 
                            </div>
                        </Grid>

                        <Grid>
                            <Typography >
                                <Link href="#" onClick={preventDefault}  style={{ color: '#DAAB59', marginRight: '30px'}}>
                                    Sell again
                                </Link>

                                <Link href="#" onClick={preventDefault}  style={{ color: '#DAAB59', marginRight: '30px'}}>
                                    Change date
                                </Link>
                            
                                <Link href="#/invoice-history" onClick={closeDialogHandler.bind(this)}  style={{textAlign: 'right', color: '#DAAB59'}} >
                                    Close
                                </Link>
                            </Typography>
                        </Grid>

                    </Grid>                    

                }
            
            >
                <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {props.products.map((item) => <SingleDayProduct  key={item.pro_id} prod={item}  />)}
                </Box>

            </MainDialog>

        </div>

    );
};

export default SingleDayInvoice;