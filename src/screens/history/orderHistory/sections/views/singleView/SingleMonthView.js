import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";

const SingleMonthView = props => {
    const supplier = props.monthSuppliers;

    return(
        <div>
            <Grid container className={`bordered`} >
                <Grid item xs={1}/>

                <Grid item xs={7} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{supplier.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total business: GHC {supplier.worth}</div>
                    </div>
                </Grid>

                <Grid item xs={4} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className="font-weight-light mt-1" style={{ fontSize: '12px', color: 'red'}}> GHC {supplier.owed}.00 owed</div>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
};

export default SingleMonthView;