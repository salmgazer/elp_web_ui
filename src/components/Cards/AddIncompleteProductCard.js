import React , { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../services/ProductServiceHandler";
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar/Avatar";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import UnitCost from '../../screens/Components/Input/UnitCost';
import LocalInfo from "../../services/LocalInfo";

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
    const productDetails = new ProductServiceHandler(props.product);
    const quantity = productDetails.getProductQuantity();

    //const productHistory = productDetails.getProductHistory();
    const [formFields , setFormFields] = useState({
        quantity: "",
        sellingPrice: "",
        costPrice: "",
        productId: "",
        branchId: LocalInfo.branchId,
    });

    //console.log(formFields.costPrice)
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
        const productHandler = new ProductServiceHandler(newProduct);
        //const cp = await productHandler.getCostPrice();
        //setCostSingleValue('costPrice' , cp);

        setImage(productHandler.getProductImage());
        setName(newProduct.name);
        const oldFormFields = {
            quantity: productHandler.getProductQuantity(),
            sellingPrice: newProduct.sellingPrice ? parseFloat(newProduct.sellingPrice).toFixed(2) : '',
            costPrice: newProduct.owned && Array.isArray(newProduct.stock) && newProduct.stock.length > 0 ? parseFloat(newProduct.stock[newProduct.stock.length - 1].costPrice).toFixed(2) : '',
            productId: newProduct.id,
            branchId: LocalInfo.branchId,
        };

        setFormFields(oldFormFields);
    };

    const addProductHandler = () => {
        props.addProductHandler(product.id)
    };

    /*const setSellingPriceHandler = (event) => {
        const formFields = {
            productId: product.id,
            sellingPrice: parseFloat(event.target.value)
        };

        //props.addProductPrice(formFields);
    };*/

    const setInputValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;
        setFormFields(oldFormFields);

        props.addStock(oldFormFields);
    };

    const setCostSingleValue = (name , value) => {
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;
        setFormFields(oldFormFields);
        props.addStock(oldFormFields);
    };

    const setCostValue = (value) => {
        const {...oldFormFields} = formFields;

        if(Array.isArray(value)){
            for (let i = 0; i < value.length; i++){
                const itemKey = Object.keys(value[i]);
                oldFormFields[itemKey] = value[i][itemKey];
            }
        }else{

        }

        setFormFields(oldFormFields);
        props.addStock(oldFormFields);
    };

    const doNothing = () => {
        return false;
    };

    return(
        <Grid container spacing={1} className={`bordered-sm shadow2 mb-3 borderRadius5`}>
            <Grid item xs={12}>
                <Grid container onClick={props.add ? addProductHandler.bind(this) : doNothing.bind(this)}>
                    <Grid item xs={3}>
                        <Avatar
                            alt={image}
                            src={image}
                            //className={classes.primaryColor}
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                margin: '4px auto',
                                textAlign: 'center',
                            }}
                        />
                    </Grid>

                    <Grid item xs={9} style={{display: 'table', height: '40px', marginTop: '10px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <div className='text-dark font-weight-bold'>{name}</div>
                            <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                                {`Quantity added: ${quantity}`}
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}}/>
            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={4} style={{display: 'block'}}>
                        <Typography
                            style={{fontSize: '12px' }}
                        >
                            QUANTITY
                        </Typography>
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            classes={{
                                root: classes.root,
                                input: classes.textCenter, // class name, e.g. `classes-nesting-label-x`
                                error: classes.error
                            }}
                            name="quantity"
                            //error={entryTotal / quantity < cartEntry.costPrice}
                            value={formFields.quantity}
                            onChange={setInputValue.bind(this)}
                            style={{fontSize: '12px' , textAlign: `center !important`, width: 'auto'}}
                        />
                    </Grid>

                    <Grid item xs={4} style={{display: 'block'}}>
                        <Typography
                            style={{fontSize: '12px'  }}
                        >
                            COST PRICE
                        </Typography>
                        <UnitCost
                            inputName="costPrice"
                            initialValue={formFields.costPrice}
                            getCalculatorValue={setCostValue.bind(this)}
                            getValue={setCostSingleValue.bind(this)}
                            isSendQuantity={true}
                            product={product}
                            id="right_input"
                            style={{
                                width: '80%',
                                marginLeft: 'auto',
                                height: '25px'
                            }}
                        >
                            <FontAwesomeIcon icon={faCalculator} fixedWidth />
                        </UnitCost>
                    </Grid>

                    <Grid item xs={4} style={{display: 'block'}}>
                        <Typography
                            style={{fontSize: '12px'  }}
                        >
                            SELLING PRICE
                        </Typography>
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            classes={{
                                root: classes.root,
                                input: classes.textCenter, // class name, e.g. `classes-nesting-label-x`
                                error: classes.error
                            }}
                            name="sellingPrice"
                            //error={entryTotal / quantity < cartEntry.costPrice}
                            value={formFields.sellingPrice}
                            onChange={setInputValue.bind(this)}
                            style={{fontSize: '12px' , textAlign: `center !important`, width: 'auto'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductCardHorizontal;
