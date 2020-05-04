import React , { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import ProductServiceHandler from "../../services/ProductServiceHandler";



const ProductCardHorizontal = props => {
    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [productAuditDetials , setProductAuditDetials] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!product) {
            getProduct();
        }
    }, []);

    const getProduct = async () => {
        const newProduct = await props.product;
        setProduct(newProduct);
        setQuantityProduct(await props.storeCounted);
        setProductAuditDetials(await props.appCounted);
        setImage(new ProductServiceHandler(product).getProductImage());
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);
    };

    return(
        <Paper className={`shadow bg-white pro-item-horizontal`} >

            <Grid container style={{paddingTop: "7px"}}>
                <Grid item xs={5} sm spacing={2}>
                    <ButtonBase>
                        <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>
                    </ButtonBase>
                </Grid>

                <Grid item xs={7} sm container className={`py-auto my-auto`}>
                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                        <Grid item xs className={`centered`} >
                            <Typography className={`menu-item block`} style={{fontSize: "0.9rem" , fontWeight: "600"}}>
                                {name}
                            </Typography>
                            <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                                {props.children}
                            </span>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </Paper>
    );
};

export default ProductCardHorizontal;