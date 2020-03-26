import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from "@material-ui/core/Button/Button";

const SingleDayView = props => {
    const product = props.item;

    const image = `https://elparah.store/admin/upload/${product.image}`;

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}>
                    <Card
                        className="shadow1"
                        style={{
                            margin: '5px auto', 
                            backgroundImage: `url(${image})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            width: '60px', 
                            borderRadius: '50%', 
                            height: '60px', 
                            padding: '0px'
                        }}
                    />
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{product.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {product.quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales: GHC {product.sales}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Profit: GHC {product.profit}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>  
                    <span className='text-dark font-weight-bold' >7:00 pm</span>                     
                    <Button
                        variant="outlined"
                        style={{
                            border: '1px solid #DAAB59', 
                            color: '#DAAB59',   
                            textTransform: 'none', 
                            fontSize:'10px',
                            width: '60%',
                            marginRight: '10px'
                        }}    
                    >
                        Return 
                    </Button>
                </Grid>
            </Grid>

        </div>

    );
};

export default SingleDayView;