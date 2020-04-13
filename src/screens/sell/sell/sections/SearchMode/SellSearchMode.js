import React , { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddIcon from "../../../../../components/ClickableIcons/AddIcon";
import ProductCard from "../../../../../components/Cards/ProductCard";
import WarningIcon from "../../../../../components/ClickableIcons/WarningIcon";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import SearchInput from "../../../../Components/Input/SearchInput";
import BranchProductService from "../../../../../services/BranchProductService";

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
    const [searchValue , setSearchValue] = useState({
        search: ''
    });
    const branchProducts = props.branchProducts;

    const classes = useStyles();
    //const products = new ProductServiceHandler(props.products).getStoreProducts();

    const addProductHandler = (id) => {
        props.productAdd(id , 1);
    };

    const removeProductHandler = (id) => {
        console.log(id);
        //props.removeProduct(id);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return (
        <div>
            <Grid container spacing={1} className={`my-1`}>
                <Grid item xs={7} style={{padding: '4px 8px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>

                <Grid item xs={5} style={{padding: '4px 8px'}} onClick={() => props.setView(2)}>
                    <Paper className={`${classes.cart} text-center`} >
                        <span className={`mx-auto italize font-weight-light`}
                            style={{fontSize: '15px' , lineHeight: '1.5rem'}}
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
                    style={{fontWeight: '500', fontSize: '18px' , margin: '3px 0px', paddingTop: '5px'}}
                >
                    Quick add
                </Typography>

                <Grid container spacing={1} className='mt-3'>
                    {branchProducts.map((branchProduct) =>
                    <Grid key={branchProduct.productId} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                        { new BranchProductService(branchProduct).isProductSellable() === false ?
                            <div
                                onClick={removeProductHandler.bind(this , branchProduct.productId)}
                            >
                                <WarningIcon
                                    styles={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        top: '-2px',
                                        float: 'right',
                                        position: 'absolute',
                                        right: '-2px',
                                        color: '#DA5959',
                                    }}
                                />
                            </div>:
                            <div
                                onClick={addProductHandler.bind(this, branchProduct.productId)}
                            >
                                <AddIcon
                                    styles={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        top: '-2px',
                                        float: 'right',
                                        position: 'absolute',
                                        right: '-2px',
                                        color: '#DAAB59',
                                    }}
                                />
                            </div>
                        }
                        <ProductCard product={branchProduct.product.fetch()}>
                             {new BranchProductService(branchProduct).getSellingPrice() ? `GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No cost price`}
                        </ProductCard>
                    </Grid>
                    )}
                </Grid>
            </div>
        </div>
    )
};

export default SellSearchMode;