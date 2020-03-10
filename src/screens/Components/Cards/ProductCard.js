import React from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";


const ProductCard = props => {
    const product = props.product;
    const image = `https://elparah.store/admin/upload/${product.image}`;

    return(
        <Paper className={`shadow mb-2 bg-white pro-item`} >
            <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${product.pro_name}`}/>

            <Typography
                component="p"
                variant="h6"
                className={`pb-1 px-1 mt-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
            >
                {product.pro_name}
            </Typography>

            <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                {props.children}
            </span>
        </Paper>
    );
};

export default ProductCard;