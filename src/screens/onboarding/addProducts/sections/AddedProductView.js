import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography/Typography";

const AddedProductView = props => {
    const quantity = props.pro_quantity;
    return(
        <div style={{paddingTop: '60px'}}>
            <div className="row p-0 pt-0 mx-0 text-center w-100 shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '16px'}}
                    className={`text-center mx-auto w-100 text-dark font-weight-bold`}
                >
                    {`Added products (${quantity})` }
                </Typography>
            </div>
        </div>
    );
};

export default AddedProductView;