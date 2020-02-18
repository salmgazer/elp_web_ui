import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import DeleteIcon from '@material-ui/icons/Delete';


const ProductHistory = props => {
    const deleteHistoryHandler = (historyId , event) => {
        props.deleteHistory(historyId , event);
    };

    const product = props.item;
    return(
        <div className={`rounded mx-1 my-2 p-2 bordered`}>
            <Grid container spacing={1} className={`mb-2`}>
                <Grid
                    item xs={9}
                    className={`text-left pl-2`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '18px'}}
                        className={`text-left text-dark font-weight-bold`}
                    >
                        {`${product.st_quantity} packs added`}
                    </Typography>
                    <div>Tuesday, February 18th, 2020</div>
                    <div>5 : 15pm</div>
                </Grid>

                <Grid
                    item xs={3}
                    className={`pl-2 pt-3 mx-auto`}
                >
                    <div className={`deleteIcon`}>
                        <DeleteIcon onClick={deleteHistoryHandler.bind(this , product.st_id)}
                            style={{fontSize: '30px', color: '#DAAB59'}}
                        /><br/>
                        Delete
                    </div>

                </Grid>
            </Grid>
        </div>
    )
};

export default ProductHistory;