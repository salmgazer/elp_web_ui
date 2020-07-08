import React , { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../services/ProductServiceHandler";
import BranchProductService from "../../services/BranchProductService";

const ProductCard = (props) => {
    let branchProduct = '';
    if(props.isSell){
        branchProduct = props.branchProduct;
    }
    const [isSellable , setIsSellable] = useState(false);
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [quantity , setQuantity] = useState('');
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [productAuditDetials , setProductAuditDetials] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        getProduct();
    });

    

    const getProduct = async () => {
        if(props.isSell){
            setIsSellable(await new BranchProductService(branchProduct).isProductSellable());
            const productHandler = await new BranchProductService(branchProduct);
            setQuantity(await productHandler.getProductQuantity());
        }

        // if (props.quantity){
        //     console.log('stock')
        // } else {
        //     const productHandler = await new BranchProductService(branchProduct);
        //     setQuantity(await productHandler.getProductQuantity());
        //     console.log('sell')
        // }

        const newProduct = await props.product;
        setQuantityProduct(await props.storeCounted);
        setProductAuditDetials(await props.appCounted);
        setImage(new ProductServiceHandler(newProduct).getProductImage());
        if(props.notTruncate){
            setName(newProduct.name);
        }else{
            setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 26) + '...' : newProduct.name);
        }
    };

    const addProductHandler = () => {
        props.addProductHandler(branchProduct.productId);
    };

    const removeProductHandler = () => {
        props.removeProductHandler(name , branchProduct);
    };

    const addDefaultSrc = (event) => {
        event.target.src = "https://elparah.store/admin/upload/no_image.png";
    };

    return(
            props.isSell ?
                <Paper onClick={props.isSell && isSellable ? addProductHandler.bind(this) : removeProductHandler.bind(this)} className={`shadow mb-2 bg-white pro-item`} >
                    <span style={{
                        fontSize: '15px',
                        color: '#000000',
                        position: 'absolute',
                        top: -10,
                        right: '5%',
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
                    <img onError={addDefaultSrc.bind(this)} className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>

                    <Typography
                        component="p"
                        variant="h6"
                        className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
                    >
                        {name}
                    </Typography>

                    {props.audit ?
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        App: {quantityProduct ? `${quantityProduct}` : 0} | Count: {productAuditDetials ? `${productAuditDetials.quantityCounted}` : 0}
                    </span> :
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        {props.children}
                    </span>
                    }

                </Paper>
            :
                <Paper className={`shadow mb-2 bg-white pro-item`} >
                    
                    <img onError={addDefaultSrc.bind(this)} className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>

                    <Typography
                        component="p"
                        variant="h6"
                        className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
                    >
                        {name}
                    </Typography>

                    {props.audit ?
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        App: {quantityProduct ? `${quantityProduct}` : 0} | Count: {productAuditDetials ? `${productAuditDetials.quantityCounted}` : 0}
                    </span> :
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        {props.children}
                    </span>
                    }

                </Paper>

        /*<Paper onClick={props.isSell && isSellable ? addProductHandler.bind(this) : ''} className={`shadow mb-2 bg-white pro-item`} >
            <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>

            <Typography
                component="p"
                variant="h6"
                className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
            >
                {name}
            </Typography>

            {props.audit ?
                <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                    App: {quantityProduct ? `${quantityProduct}` : 0} | Count: {productAuditDetials ? `${productAuditDetials.quantityCounted}` : 0}
                </span> :
                <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                    {props.children}
                </span>
            }

        </Paper>*/
    );
};

export default ProductCard;
