import React , { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../services/ProductServiceHandler";
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar/Avatar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '10%',
        display: 'flex',
        padding: '2px 10px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '30px',
        border: '1px solid #ced4da',
        fontSize: '0.7rem',
        lineHeight: '1.5',
        float: 'right',
        textAlign: `center !important`,
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: `center !important`,
    },
    textCenter: {
        textAlign: `center !important`,
    },
    error: {
        border: '1px solid #D34343',
    },
    iconButton: {
        padding: 10,
    }
}));

const ProductCardHorizontal = props => {
    const classes = useStyles();
    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    //const [quantityProduct , setQuantityProduct] = useState(0);
    //const [productAuditDetials , setProductAuditDetials] = useState(false);

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    });

    const getProduct = async () => {
        const newProduct = await props.product;
        setProduct(newProduct);
        //setQuantityProduct(await props.storeCounted);
        //setProductAuditDetials(await props.appCounted);
        setImage(new ProductServiceHandler(newProduct).getProductImage());
        setName(newProduct.name);
    };

    const addProductHandler = () => {
        props.addProductHandler(product.id)
    };

    const setSellingPriceHandler = (event) => {
        const formFields = {
            productId: product.id,
            sellingPrice: parseFloat(event.target.value)
        };

        props.addProductPrice(formFields);
    };

    return(
        <Grid container spacing={1} className={`bordered-sm shadow2 mb-3 borderRadius5`}>
            <Grid item xs={12}>
                <Grid container onClick={props.add ? addProductHandler.bind(this) : ''}>
                    <Grid item xs={3}>
                        <Avatar
                            alt={image}
                            src={image}
                            //className={classes.primaryColor}
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                margin: '10px auto',
                                textAlign: 'center',
                            }}
                        />
                    </Grid>

                    <Grid item xs={9} style={{display: 'table', height: '60px', margin: '4px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <div className='text-dark font-weight-bold'>{name}</div>
                            {/* <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{`Quantity: ${quantity}`}</div> */}
                            <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                                {props.children}
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}}/>
            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={5} style={{float: 'left' , height: '45px'}}>
                    </Grid>

                    <Grid item xs={7} style={{margin: '8px 0px' , float: 'right', display: 'flex'}}>
                        <Typography
                            style={{fontSize: '15px' , margin: '3px 0px', paddingTop: '5px' }}
                        >
                            Enter new price
                        </Typography>
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            classes={{
                                root: classes.root,
                                input: classes.textCenter, // class name, e.g. `classes-nesting-label-x`
                                error: classes.error
                            }}
                            //error={entryTotal / quantity < cartEntry.costPrice}
                            //value={entryTotal || ''}
                            onChange={(event) => setSellingPriceHandler(event)}
                            style={{fontSize: '12px' , textAlign: `center !important`}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductCardHorizontal;
