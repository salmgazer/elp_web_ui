import React, {useEffect, useState} from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from "@material-ui/core/Typography";
import SellQuantityInput from "../../../Components/Input/SellQuantityInput";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import {withRouter} from 'react-router-dom';
import BranchProductService from "../../../../services/BranchProductService";
import CustomerService from "../../../../services/CustomerService";
import CartService from "../../../../services/CartService";
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import CustomerListDrawer from "../../../../components/Drawer/CustomerListDrawer/CustomerListDrawer";

const useStyles = makeStyles(theme => ({
    root: {
        width: '92%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '25px',
        border: '1px solid #ced4da',
        fontSize: '0.5rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    }
}));

const AddProductCart = props => {
    const branchProduct = props.product[0];
    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const classes = useStyles();
    const [btnState,setBtnState] = useState(false);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [productAdded , setProductAdded] = useState(false);
    const [unitPrice , setUnitPrice] = useState(0);
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [totalPrice , setTotalPrice] = useState(0);
    const [sellingPrice , setSellingPrice] = useState(branchProduct.sellingPrice);
    const [costPrice , setCostPrice] = useState(0);
    const [isShowerCustomerDrawer , setIsShowerCustomerDrawer] = useState(false);
    const [isSaveCart , setIsSaveCart] = useState(false);
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [isSellable , setIsSellable] = useState(true);

    const [formFields , setFormFields] = useState({
        quantity: 1,
        sellingPrice: branchProduct.sellingPrice,
        costPrice: 0,
        productId: branchProduct.productId,
        branchProductId: branchProduct.id,
        discount: 0,
    });

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        setProduct(newProduct);
        setIsSellable(await productHandler.isProductSellable());
        setQuantityProduct(await productHandler.getProductQuantity());
        setImage(new ProductServiceHandler(newProduct).getProductImage());
        setName(newProduct.name);
        setSellingPrice(await productHandler.getSellingPrice());
        setCostPrice(await productHandler.getCostPrice());

        setInputValue('costPrice' , parseFloat(await productHandler.getCostPrice()));
    };

    const [quantity , setQuantity] = useState(1);

    const setInputValue = (name , value) => {
        if(name === 'quantity'){
            setQuantity(value);
        }

        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;

        setFormFields(oldFormFields);
    };

    const removeProduct = () => {
        alert(`${name} is out of stock. Please add stock`);
    };

    const addProduct = async() => {
        await setInputValue('costPrice' , costPrice);

        if (sellingPrice * quantity < costPrice * quantity) {
            setErrorMsg('Selling price can not be less than cost price');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
            return false;
        }

        const status = props.addToCart(formFields);

        if(status){
            await setProductAdded(true);

            setTimeout(function(){
                setProductAdded(false);
                props.setView(0);
            }, 1000)

        }else{
            setErrorMsg('OOPS Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
            return false;
        }
    };

    const setTotalPriceHandler = event => {
        setTotalPrice(((event.target.value)));
        const sp = ((event.target.value) / quantity);

        if (sp < costPrice) {
            setErrorMsg('Selling price can not be less than cost price');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
            //return false;
        }


        const discount = (parseFloat(formFields.sellingPrice - sp)).toFixed(2);
        const {...oldFormFields} = formFields;

        oldFormFields['discount'] = discount;

        setFormFields(oldFormFields);
        setUnitPrice(sp.toFixed(2));
        setSellingPrice(sp.toFixed(2));
    };

    const setUnitPriceHandler = event => {
        // console.log(formFields.sellingPrice , branchProduct.sellingPrice)
        let sp = (event.target.value);

        if (sp < costPrice) {
            setErrorMsg('Selling price can not be less than cost price');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
        }
        const discount = (parseFloat(formFields.sellingPrice - sp)).toFixed(2);
        //.log(sp , formFields.sellingPrice , discount)

        /*
        * @todo how to handle increase not discount...
        * */
        /*if(discount < 0) {
            setErrorMsg('Discount can');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
            return false;
        }*/
        const {...oldFormFields} = formFields;

        oldFormFields['discount'] = discount;

        setFormFields(oldFormFields);

        setUnitPrice(sp);
        if(sp.length === 0){
            sp = 0;
        }
        const tp = (parseFloat(event.target.value) * quantity) || 0;
        setTotalPrice(tp.toFixed(2));
        setSellingPrice((parseFloat(sp)).toFixed(2));
    };

    /*
    * @todo validation for all numeric fields
    * */
    const openDialogHandler = async() => {
        if(props.currentCustomer === (await CustomerService.getCashCustomer())[0].id){
            setIsSaveCart(true);
            setIsShowerCustomerDrawer(true);
        }else{
            const response = await new CartService().suspendCart();

            if (response) {
                setSuccessMsg('Cart saved');
                setSuccess(true);
                setTimeout(function(){
                    props.setView(0);
                    setError(false);
                }, 2000);
            }else{
                setErrorMsg('Cart was not saved. Please try again');
                setError(true);
                setTimeout(function(){
                    setError(false);
                }, 3000);
            }
        }
    };

    /*const setCustomerHandler = async (customer) => {
        props.setCustomerHandler(customer);
        const response = await new CartService().suspendCart();

        if (response) {
            setErrorMsg('Cart saved');
            setError(true);
            setTimeout(function(){
                props.setView(0);
                setError(false);
            }, 2000);
        }else{
            setErrorMsg('Cart was not saved. Please set a customer');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
        }
    };*/

    const setCustomerHandler = (customer) => {
        props.setCustomerHandler(customer);
        setIsShowerCustomerDrawer(false);
        if(isSaveCart){
            openDialogHandler();
        }
    };

    const setSearchValue = (value) => {
        props.searchCustomerHandler(value);
    };


    return (
        <div>
            <SimpleSnackbar
                type="success"
                openState={productAdded}
                message={`New product added successfully`}
            >
                {/*<Button color="secondary" size="small" onClick={props.undoProductAdd}>
                    UNDO
                </Button>*/}
            </SimpleSnackbar>

            <SimpleSnackbar
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar>

            <CustomerListDrawer
                handleClose={() => setIsShowerCustomerDrawer(false)}
                setCustomer={setCustomerHandler.bind(this)}
                customers={props.customers}
                isShow={isShowerCustomerDrawer}
                searchCustomerHandler={setSearchValue.bind(this)}
            />

            <div className={`p-3 bg-white mx-0 shadow`}>
                <span
                    className={`back-icon`}
                    onClick={() => props.setView(0)}
                >
                    <KeyboardBackspaceIcon style={{fontWeight: '700'}}/>
                </span>

                {/*<span
                    className={`cart-icon`}
                    style={{lineHeight: '0.8'}}
                >
                    <div
                        onClick={openDialogHandler.bind(this)}
                    >
                        <AddShoppingCartOutlinedIcon style={{fontWeight: '700'}}/>
                        <div style={{fontSize: '12px'}}>New cart</div>
                    </div>
                </span>*/}
                <div className={`w-100 m-2 my-5`}>
                    <img className={`img-fluid mx-auto w-50 h-75`} src={image} alt={`${name}`}/>
                </div>
            </div>

            <div className={`p-3 mx-0`}>
                <div
                    className={`w-75 mx-auto bg-white shadow-ng`}
                    style={{minHeight: `${name.length > 20 ? '330px' : '300px'}` , borderRadius: '30px', marginTop: '-70px'}}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '18px' , margin: '3px 0px', paddingTop: '5px'}}
                        className={`font-weight-bold text-center text-dark`}
                    >
                        { name }
                    </Typography>

                    <SellQuantityInput label={`Quantity`} inputName="quantity" max={quantityProduct} min={1} getValue={setInputValue.bind(this)}/>

                    <div
                        className={`text-center mt-3 text-dark font-weight-bold`}
                        style={{fontSize: '13px'}}
                    >
                        <span
                            className={`text-center mx-auto`}
                        >
                            Total : GHC {`${(sellingPrice * quantity).toFixed(2)}`}
                            <span
                                className={`mx-2`}
                                style={{fontSize: '18px'}}
                            >|</span> {`${quantityProduct - quantity} left in stock`}
                        </span>
                    </div>

                    {btnState === false ?
                        <div className={`text-center mt-4 text-dark w-100 mx-0`}>
                            <div className={`w-75 mb-0 mx-auto pb-4`}>
                                <button
                                    className={`bg-white font-weight-bold py-2 px-4 rounded`}
                                    style={{color: '#DAAB59', border: '1px solid #DAAB59', fontSize: '15px'}}
                                    onClick={() => setBtnState(true)}
                                >
                                    Apply discount
                                </button>
                            </div>
                        </div>
                        :
                        <div
                            className={`mb-3 text-center mt-3 text-dark mx-auto`}
                            style={{width: '85%'}}
                        >
                            <div className={`mb-5 mx-auto pb-2 w-100`}>
                                <Grid container spacing={1} className='mt-3 mx-0'>
                                    <Grid item xs={5} className={`pr-0`}>
                                        <label className={`text-center text-dark`} style={{fontSize: '11px'}}>Total
                                            new price</label>
                                        <Paper className={`${classes.root} text-center`}>
                                            <InputBase
                                                className={`${classes.input} search-box text-center`}
                                                type="tel"
                                                value={totalPrice || ''}
                                                onChange={(event) => setTotalPriceHandler(event)}
                                                style={{fontSize: '12px'}}
                                            />
                                        </Paper>
                                    </Grid>

                                    <Grid
                                        item xs={2}
                                    >
                                        <SwapHorizOutlinedIcon
                                            style={{fontSize: '25px' , marginTop: '25px'}}
                                        />
                                    </Grid>

                                    <Grid item xs={5} className={`pr-0`}>
                                        <label className={`text-center text-dark`} style={{fontSize: '11px'}}>Unit
                                            new price</label>
                                        <Paper className={`${classes.root} text-center`}>
                                            <InputBase
                                                className={`${classes.input} search-box text-center`}
                                                type="tel"
                                                value={unitPrice || ''}
                                                onChange={(event) => setUnitPriceHandler(event)}
                                                style={{fontSize: '12px'}}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    }
                </div>

                <div
                    className={`text-center ${isSellable ? `text-dark` : `text-white`} w-75 mx-0 font-weight-bold mx-auto`}
                    style={{backgroundColor: isSellable ? '#DAAB59' : 'rgb(84, 83, 81)' , height: '40px' , marginTop: '-50px' , borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', paddingTop: '10px' }}
                >
                        <span
                            className={`w-100 text-center mx-auto`}
                            style={{fontSize: '20px'}}
                            onClick={isSellable ? addProduct : removeProduct}
                        >
                            Add to cart
                        </span>
                </div>
            </div>

            {/*<Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 20px', marginRight: '10px'}}
                >
                    Save & Switch
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px'}}
                    onClick={() => history.push(paths.cart)}
                >
                    View cart
                </Button>
            </Box>*/}
        </div>
    );
};

export default withRouter(AddProductCart);
