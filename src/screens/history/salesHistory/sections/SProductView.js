import React from 'react';
import Typography from '@material-ui/core/Typography';
import './View.scss';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

import ProductCard from "../../../Components/Cards/ProductCard";


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

const ProductView = props => {

    const openDay = (event) => {
        props.setView(0);
    };

    const classes = useStyles();

    return(
        <div>
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', margin: '5px 0px' }} >
                Search for a product to view history
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={10} style={{padding: '4px 8px', marginLeft: '30px'}}>
                    <Paper className={classes.root} >
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            className={`${classes.input} search-box`}
                            placeholder="Search for a product"
                            inputProps={{ 'aria-label': 'Search for a product' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
                
            <Grid container spacing={1} className='mt-3'>
                {props.products.map((item) =>
                    <ProductCard key={item.pro_id} product={item} clickProduct={openDay.bind(this)} >
                    </ProductCard>
                )}
            </Grid>

                <Button
                    variant="outlined"
                    style={{
                        border: '1px solid #DAAB59', 
                        color: '#DAAB59', 
                        padding: '5px 30px', 
                        textTransform: 'none', 
                        fontSize:'17px',
                        marginTop: '100px', 
                        textAlign: 'center'
                    }}
                >
                    Scan Barcode   
                </Button>

        </div>
    );
};

export default ProductView;