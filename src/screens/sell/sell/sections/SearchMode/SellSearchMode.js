import React , { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ProductCard from "../../../../../components/Cards/ProductCard";
import Typography from "@material-ui/core/Typography/Typography";
import SearchInput from "../../../../Components/Input/SearchInput";
import BranchProductService from "../../../../../services/BranchProductService";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import SingleProductMainCard from "../singleProductMainCard";
import Empty from '../../../../../assets/img/employee.png';
import paths from "../../../../../utilities/paths";
import EmptyContainer from "../../../../../components/Empty/EmptyContainer";
import {withRouter} from "react-router-dom";
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import MainDialog from "../../../../../components/Dialog/MainDialog";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        fontSize: '0.7rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    cart: {
        width: '95%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '6px',
        height: '35px',
        fontSize: '0.8rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: '0.9rem',
    },
    iconButton: {
        padding: 10,
    }
}));

const SellSearchMode = props => {
    const [searchValue, setSearchValue] = useState({
        search: '',
        state: 'inactive'
    });
    const { history } = props;
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [productAdded, setProductAdded] = useState(false);
    const [showErrorProduct, setShowErrorProduct] = useState(false);
    const [errorProduct, setErrorProduct] = useState(false);
    const [errorBProduct, setErrorBProduct] = useState(false);
    const [errorProductMsg, setErrorProductMsg] = useState('');

    const branchProducts = props.branchProducts;

    const classes = useStyles();

    const addProductHandler = (id) => {
        props.productAdd(id, 1);
    };

    /*
    * @todo resolve isProductSellable...
    * */

    const addProductOneHandler = async (productId, branchProductId, sellingPrice, branchProduct) => {
        const quantity = await new BranchProductService(branchProduct).getProductQuantity();

        if (quantity < 1) {
            setErrorMsg('Product is out of stock. Please refill');
            setError(true);
            setTimeout(function () {
                setError(false);
            }, 3000);
            return false;
        }

        const formFields = {
            quantity: 1,
            sellingPrice: sellingPrice,
            costPrice: parseFloat(await new BranchProductService(branchProduct).getCostPrice()),
            productId: productId,
            branchProductId: branchProductId,
            discount: 0,
        };

        const status = props.addToCart(formFields);

        if (status) {
            await setProductAdded(true);

            setTimeout(function () {
                setProductAdded(false);
            }, 2000)

        } else {
            setErrorMsg('OOPS Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setError(false);
            }, 3000);
            return false;
        }
    };

    const removeProductHandler = async (name , bPro) => {
        {/*{new BranchProductService(branchProduct).getSellingPrice() ? `GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No cost price`}*/}

        //return !!(await this.getProductQuantity() > 0 && await this.getCostPrice() && this.getSellingPrice());
        let errors = '';

        const theProduct = new BranchProductService(bPro);
        if(!await theProduct.getProductQuantity()){
            errors = "No stock available.";
        }

        if(!await theProduct.getCostPrice()){
            errors = (errors).concat("\nNo cost price available.");
        }

        if(!await theProduct.getSellingPrice()){
            errors = (errors).concat("\nNo selling price available.");
        }

        setErrorProductMsg(errors);
        setErrorProduct(await bPro.product.fetch());
        setErrorBProduct(bPro.id);
        setShowErrorProduct(true);
        //alert(`${name} is out of stock or has no cost price. Please add stock`);
    };

    const addLineBreaks = string => {
        return string.split('\n').map((text, index) => (
            <React.Fragment key={`${text}-${index}`}>
                {text}
                <br />
            </React.Fragment>
        ));
    };


    const setInputValue = (name, value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;
        if(value.length > 0){
            oldFormFields['state'] = 'active';
            setHeaderText('Search didn\'t not find any product');
            setEmptyBtnState(true);
        }else{
            oldFormFields['state'] = 'inactive';
            setHeaderText('Click Add product to add products you sell to your store');
            setEmptyBtnState(true);
        }

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    const addStockHandler = () => {
        localStorage.setItem('redirectPath' , paths.sell);
        localStorage.setItem('activeStockProduct' , errorBProduct);
        props.history.push(paths.stock);
    };

    return (
        <div>
            <MainDialog
                states={showErrorProduct}
                handleDialogClose={() => setShowErrorProduct(false)}
                title={`Selected Product`}
            >
                {
                    errorProduct ?
                        <>
                            <div className={`w-100 m-2`}>
                                <img className={`img-fluid mx-auto w-50 h-75`} src={new ProductServiceHandler(errorProduct).getProductImage()} alt={`${errorProduct.name}`}/>
                            </div>

                            <Typography
                                component="p"
                                variant="h6"
                                className={`text-center my-2 font-weight-bold`}
                                style={{fontWeight: '500', fontSize: '16px' , margin: '5px auto', paddingTop: '10px'}}
                            >
                                {errorProduct.name}
                            </Typography>

                            <Typography
                                component="p"
                                variant="inherit"
                                className={`text-center my-1`}
                                style={{fontWeight: '300', color: 'red', fontSize: '12px' , margin: '5px auto', paddingTop: '10px'}}
                            >
                                { addLineBreaks(errorProductMsg) }
                            </Typography>

                            <Box
                                className={`bg-white my-3`}
                                p={1}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', marginRight: '10px'}}
                                    onClick = {() => setShowErrorProduct(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59', padding: '5px 15px', color: '#333333'}}
                                    onClick={addStockHandler.bind(this)}
                                >
                                    Edit Product
                                </Button>
                            </Box>
                        </>
                        : ''
                }
            </MainDialog>
            <Grid container spacing={1} className={`my-1`}>
                <Grid item xs={7} style={{padding: '4px 8px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>

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
                    type="warning"
                    openState={error}
                    message={errorMsg}
                >
                </SimpleSnackbar>

                <Grid item xs={5} style={{padding: '4px 8px'}} onClick={() => props.setView(2)}>
                    <Paper className={`${classes.cart} text-center`}>
                        <span className={`mx-auto italize font-weight-light`}
                              style={{fontSize: '15px', lineHeight: '1.5rem'}}
                        >
                            <ShoppingCartOutlinedIcon style={{fontSize: '16px'}}/>
                            Saved Cart
                            <span style={{
                                fontSize: '12px',
                                color: '#000000',
                                position: 'absolute',
                                top: 0,
                                right: '5%',
                                backgroundColor: '#daab59',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                fontWeight: '500'
                            }}
                            >
                                {props.savedCartCount}
                            </span>
                        </span>
                    </Paper>
                </Grid>
            </Grid>

            <div className={`borderRadius10 bg-white px-2 py-2 mt-2`}>
                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontWeight: '500', fontSize: '18px', margin: '3px 0px', paddingTop: '5px'}}
                >
                    Quick add
                </Typography>

                <Grid container spacing={1} className='mt-3'>
                    {branchProducts.length === 0
                        ?
                            <EmptyContainer
                                buttonAction={() => history.push(paths.add_products)}
                                imageLink={Empty}
                                headerText={headerText}
                                button={emptyBtnState}
                                btnText="Add Product"
                            />
                        :
                        branchProducts.map((branchProduct) =>
                            <Grid key={branchProduct.productId} item xs={4}
                                  style={{padding: '4px 8px', position: 'relative'}} className={`mx-0 px-1`}>
                                <SingleProductMainCard
                                    branchProduct={branchProduct}
                                    posFunc={addProductOneHandler}
                                    negFunc={removeProductHandler}
                                />

                                {/*<div
                                    onClick={
                                        new BranchProductService(branchProduct).isProductSellable() === false ?
                                            removeProductHandler.bind(this, branchProduct.productId)
                                            :
                                            addProductHandler.bind(this, branchProduct.productId)
                                    }
                                >*/}
                                <ProductCard notTruncate={true} branchProduct={branchProduct} removeProductHandler={removeProductHandler.bind(this)} addProductHandler={addProductHandler.bind(this)} isSell={true} product={branchProduct.product.fetch()}>
                                    {/*{new BranchProductService(branchProduct).getSellingPrice() ? `GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No cost price`}*/}
                                </ProductCard>
                                {/*</div>*/}
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        </div>
    )
};

export default withRouter(SellSearchMode);
