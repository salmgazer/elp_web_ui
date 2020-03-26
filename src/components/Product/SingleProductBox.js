import React from 'react';
import ProductCard from "../Cards/ProductCard";
import ProductServiceHandler from "../../services/ProductServiceHandler";
import Grid from "@material-ui/core/Grid/Grid";

const SingleProductBox = props => {
    const product = props.product;

    const productHandler = new ProductServiceHandler(product);
    const costPrice = productHandler.getCostPrice();
    const quantity = productHandler.getProductQuantity();

    return (
        <Grid item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
            <div onClick={props.addProductHandler}>
                <ProductCard product={product}>
                    GHC {costPrice} | {quantity} left
                </ProductCard>
            </div>
        </Grid>
    );
};

export default SingleProductBox;