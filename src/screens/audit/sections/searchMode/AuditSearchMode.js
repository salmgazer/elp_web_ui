import React , { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddIcon from "../../../../components/ClickableIcons/AddIcon";
import ProductCard from "../../../../components/Cards/ProductCard";
import WarningIcon from "../../../../components/ClickableIcons/WarningIcon";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import SearchInput from "../../../Components/Input/SearchInput";
import BranchProductService from "../../../../services/BranchProductService";
import SingleProductBox from "../../../../components/Product/SingleProductBox";

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

const AuditSearchMode = props => {
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
            <div className={`borderRadius10 bg-white px-2 py-2 mt-2`}>
                <Grid container spacing={1} className={`my-1 mx-auto`}>
                    <Grid item xs={8} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '400', fontSize: '18px' , textAlign: 'left', margin: '3px 0px', paddingTop: '5px'}}
                        >
                            Select a product to audit
                        </Typography>
                    </Grid>

                    <Grid item xs={4} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '400', textAlign: 'right', fontSize: '18px' , margin: '3px 0px', paddingTop: '5px'}}
                        >
                            Total: {branchProducts.length}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={`my-1 mx-auto`}>
                    <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        <SearchInput
                            styles={{border: '1px solid #e5e5e5'}}
                            inputName="search"
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} className='mt-3'>
                    {branchProducts.length === 0
                        ?
                        <Grid
                            item xs={12}
                            className={`text-left pl-2`}
                        >
                            <div className={`rounded mx-1 my-2 p-2 bordered`}>
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark w-100`}
                                >
                                    No product found
                                </Typography>
                            </div>
                        </Grid>
                        :
                        branchProducts.map((branchProduct) =>
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
                                <div
                                    onClick={
                                        new BranchProductService(branchProduct).isProductSellable() === false ?
                                            removeProductHandler.bind(this , branchProduct.productId)
                                            :
                                            addProductHandler.bind(this, branchProduct.productId)

                                    }
                                >
                                    <ProductCard product={branchProduct.product.fetch()}>
                                        {new BranchProductService(branchProduct).getSellingPrice() ? `GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No cost price`}
                                    </ProductCard>
                                </div>
                            </Grid>
                        )
                    }

                </Grid>
            </div>
        </div>
    )
};

export default AuditSearchMode;
