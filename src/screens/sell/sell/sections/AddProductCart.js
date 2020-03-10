import React, {useState} from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box/Box";
import SellQuantityInput from "../../../Components/Input/SellQuantityInput";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";

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
    const classes = useStyles();
    const [btnState,setBtnState] = useState(false);
    const [productAdded , setProductAdded] = useState(false);

    const product = props.product;
    const image = `https://elparah.store/admin/upload/${product.image}`;

    const setInputValue = (name , value) => {
        console.log(name , value)
    };

    const addProduct = async() => {
        await setProductAdded(true);

        setTimeout(function(){
            setProductAdded(false);
        }, 3000)
    };

    return (
        <div>
            <SimpleSnackbar
                openState={productAdded}
                message={`New product added successfully`}
            >
                <Button color="secondary" size="small">
                    UNDO
                </Button>
            </SimpleSnackbar>
            <div className={`p-3 bg-white mx-0 shadow`}>
                <span
                    className={`back-icon`}
                    onClick={() => props.setView(0)}
                >
                    <KeyboardBackspaceIcon style={{fontWeight: '700'}}/>
                </span>
                <div className={`w-100 m-2 my-5`}>
                    <img className={`img-fluid mx-auto w-50 h-75`} src={image} alt={`${product.pro_name}`}/>
                </div>
            </div>

            <div className={`p-3 mx-0`}>
                <div
                    className={`w-75 mx-auto bg-white shadow-ng`}
                    style={{minHeight: '300px' , borderRadius: '30px', marginTop: '-70px'}}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '18px' , margin: '3px 0px', paddingTop: '5px'}}
                        className={`font-weight-bold text-center text-dark`}
                    >
                        { product.pro_name }
                    </Typography>

                    <SellQuantityInput label={`Quantity`} inputName="quantity" getValue={setInputValue.bind(this)}/>

                    <div
                        className={`text-center mt-3 text-dark font-weight-bold`}
                        style={{fontSize: '13px'}}
                    >
                        <span
                            className={`text-center mx-auto`}
                        >
                            Total : GHC {`13.00`}
                            <span
                                className={`mx-2`}
                                style={{fontSize: '18px'}}
                            >|</span> 376 left in stock
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
                            className={`mb-3 text-center mt-3 text-dark mx-auto w-75`}
                        >
                            <div className={`mb-5 mx-auto pb-2 w-100`}>
                                <Grid container spacing={1} className='mt-3 mx-0'>
                                    <Grid item xs={5} className={`pr-0`}>
                                        <label className={`text-center text-dark`} style={{fontSize: '11px'}}>Total
                                            discount</label>
                                        <Paper className={`${classes.root} text-center`}>
                                            <InputBase
                                                className={`${classes.input} search-box text-center`}
                                                type="tel"
                                                placeholder={`Total discount`}
                                                style={{fontSize: '12px'}}
                                            />
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={2} className={`pt-4`}
                                          style={{fontSize: '16px', color: '#daab59'}}
                                    >
                                        or
                                    </Grid>

                                    <Grid item xs={5} className={`pr-0`}>
                                        <label className={`text-center text-dark`} style={{fontSize: '11px'}}>Unit
                                            discount</label>
                                        <Paper className={`${classes.root} text-center`}>
                                            <InputBase
                                                className={`${classes.input} search-box text-center`}
                                                type="tel"
                                                placeholder={`Unit discount`}
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
                    className={`text-center text-dark w-75 mx-0 font-weight-bold mx-auto`}
                    style={{backgroundColor: '#DAAB59' , height: '40px' , marginTop: '-50px' , borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', paddingTop: '10px' }}
                >
                        <span
                            className={`w-100 text-center mx-auto`}
                            style={{fontSize: '20px'}}
                            onClick={addProduct}
                        >
                            Add to cart
                        </span>
                </div>
            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
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
                >
                    View cart
                </Button>
            </Box>
        </div>
    );
};

export default AddProductCart;