import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";

const SingleYearView = props => {
    const supplier = props.yearSuppliers;

    const image = `https://elparah.store/admin/upload/${supplier.image}`;

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={2}>
                <Card
                    className="shadow1"
                    style={{
                        margin: '10px auto', 
                        backgroundImage: `url(${image})`, 
                        backgroundPosition: 'center', 
                        backgroundSize: 'cover', 
                        width: '40px', 
                        borderRadius: '50%', 
                        height: '40px', 
                        padding: '0px'
                    }}
                />
            </Grid>

            <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{supplier.name}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total business: GHC {supplier.worth}</div>
                </div>
            </Grid>


            <Grid item xs={3} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <div className="font-weight-light mt-1" style={{ fontSize: '10px', color: 'red'}}> GHC {supplier.owed}.00 owed</div>
                </div>
            </Grid>
        </Grid>
    );
};

export default SingleYearView;