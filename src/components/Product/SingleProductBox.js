import React, {useEffect, useState} from 'react';
import ProductCard from "../Cards/ProductCard";
import Grid from "@material-ui/core/Grid/Grid";
import BranchProductService from "../../services/BranchProductService";

const SingleProductBox = props => {
    const [quantity , setQuantity] = useState('');
    const [costPrice , setCostPrice] = useState('');
    const branchProduct = props.product;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity || !costPrice) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        setQuantity(await productHandler.getProductQuantity());
        setCostPrice(await productHandler.getCostPrice());
    };

    return (
        <Grid item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
            <div onClick={props.addProductHandler}>
                <ProductCard notTruncate={true} product={branchProduct.product.fetch()} branchProduct={branchProduct} quantity={quantity}>
                    {/*GHC {costPrice} | {quantity} left*/}
                    <span style={{
                        fontSize: '15px',
                        color: '#000000',
                        position: 'absolute',
                        top: -10,
                        left: '0%',
                        backgroundColor: '#FFFFFF',
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        fontWeight: '500'
                    }}
                    className={`shadow`}
                    >
                        {quantity}
                    </span>
                </ProductCard>
            </div>
        </Grid>
    );
};

export default SingleProductBox;
