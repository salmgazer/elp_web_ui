import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EventIcon from '@material-ui/icons/Event';

const SingleYearView = props => {
    const product = props.yearItems;

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={3}>
                <Card
                    className="shadow1"
                    style={{
                        margin: '5px auto',  
                        backgroundPosition: 'center', 
                        backgroundSize: 'cover', 
                        width: '60px', 
                        borderRadius: '50%', 
                        height: '60px', 
                        padding: '0px'
                    }}
                >
                    <EventIcon style={{position: 'center', marginTop: '20px'}} />
                </Card>
            </Grid>
            <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' >{product.month}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales made : GHC {product.sales}</div>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Profit made : GHC {product.profit}</div>
                </div>
            </Grid>
        </Grid>
    );
};

export default SingleYearView;