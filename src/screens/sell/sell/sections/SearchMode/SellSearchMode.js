import React , { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddIcon from "../../../../Components/ClickableIcons/AddIcon";
import ProductCard from "../../../../Components/Cards/ProductCard";
import WarningIcon from "../../../../Components/ClickableIcons/WarningIcon";
import Typography from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const SellSearchMode = props => {
    const classes = useStyles();
    const products = props.products;

    const addProductHandler = (id) => {
        console.log(id);
        props.productAdd(id , 1);
    };

    const removeProductHandler = (id) => {
        console.log(id);
        //props.removeProduct(id);
    };

    return (
        <div>
            <Grid container spacing={1} className={`my-1`}>
                <Grid item xs={7} style={{padding: '4px 8px'}}>
                    <Paper className={classes.root} >
                        <InputBase
                            className={`${classes.input} search-box`}
                            placeholder="Search for a product"
                            inputProps={{ 'aria-label': 'Search for a product' }}
                        />
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>

                <Grid item xs={5} style={{padding: '4px 8px'}}>
                    <Paper className={`${classes.root} text-center`} >
                        <span className={`mx-auto`}
                            style={{fontSize: '18px' , lineHeight: '1.5rem'}}
                        >
                            <ShoppingCartOutlinedIcon style={{fontSize: '16px'}}/>
                            Saved Cart
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
                    Top sold products
                </Typography>

                <Grid container spacing={1} className='mt-3'>
                    {products.map((item) =>
                        <Grid key={item.pro_id} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                            { item.pro_quantity === null ?
                                <div
                                    onClick={removeProductHandler.bind(this , item.pro_id)}
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
                                    onClick={addProductHandler.bind(this, item.pro_id)}
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
                            <ProductCard product={item}>
                                GHC {(parseFloat(item.Selling_Price)).toFixed(2)}
                            </ProductCard>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    )
};

export default SellSearchMode;