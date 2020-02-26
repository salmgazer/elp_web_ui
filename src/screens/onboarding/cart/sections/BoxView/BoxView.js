import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const AddedProductSingle = props => {
    const product = props.item;

    const image = `https://elparah.store/admin/upload/${product.image}`;


    const deleteHistoryHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
    };


    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={3}>
                <Card
                    className="shadow1"
                    style={{margin: '5px auto' ,backgroundImage: `url(${image})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '60px' ,borderRadius: '50%', height: '60px', padding: '0px'}}
                />
            </Grid>
            <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold'>{product.pro_name}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>GHC 5.00</div>
                </div>
            </Grid>
            <Grid item xs={4} style={{height: '60px', margin: '13px 0px'}}>
                <div style={{textAlign: 'right' , width:'100%'}}>
                    <input type="number" min="1" style={{width: '50px'}} />
                    <DeleteIcon
                        onClick={deleteHistoryHandler.bind(this , product.pro_id)}
                        style={{fontSize: '30px', color: '#DAAB59'}}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default AddedProductSingle;