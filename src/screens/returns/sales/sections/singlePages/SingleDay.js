import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const SingleDayView = props => {

    const returns = props.returns;
    
    const openReturnsHandler = (event) => {
        props.setView(5);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}  onClick={openReturnsHandler.bind(this)}>
                    <Card
                        className="shadow1"
                        style={{
                            margin: '10px auto',  
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            width: '50px', 
                            borderRadius: '50%', 
                            height: '50px', 
                            padding: '0px'
                        }}
                    >
                        <AccountCircleIcon style={{position: 'center', marginTop: '8px', fontSize: '2rem'}} />
                    </Card>
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}  onClick={openReturnsHandler.bind(this)}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{returns.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>INV. {returns.receiptNumber.slice(0,8)}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Sales: GHC {returns.sales}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '20px 0px 0px 0px'}}  onClick={openReturnsHandler.bind(this)}>
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{returns.date}</div>
                </Grid>
            </Grid>


        </div>

    );
};

export default SingleDayView;
