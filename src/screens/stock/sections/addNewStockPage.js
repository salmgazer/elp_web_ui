import React, {useEffect, useState} from 'react';
import ProductServiceHandler from "../../../services/ProductServiceHandler";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import InputBase from "@material-ui/core/InputBase/InputBase";
import Paper from "@material-ui/core/Paper/Paper";
import '../../../components/Input/styles/SellInput.scss';
import {makeStyles, withStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import Box from "@material-ui/core/Box/Box";
import Container from "@material-ui/core/Container";
import Modal from "../../../components/Modal/Modal";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import { confirmAlert } from 'react-confirm-alert';
import UnitCost from '../../Components/Input/UnitCost';
import LocalInfo from "../../../services/LocalInfo";
import BranchProductService from "../../../services/BranchProductService";
import QuantityInput from "../../../components/Input/QuantityInput";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
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
    },
    center: {
        textAlign: 'center'
    }
}));

const optionGroupStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '0.9rem',
    },
    select: {
        '&:before': {
            borderColor: '#DAAB59',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: '#DAAB59',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '95%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: '1px auto',
        width: '95%',
        'text-align': 'center',
    },
    left: {
        'text-align': 'left',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: 'green',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
    },
}));

const PrimarySwitch = withStyles({
    switchBase: {
        color: `#009688 !important`,
        '&$checked': {
            color: `#009688 !important`,
        },
        '&$checked + $track': {
            backgroundColor: `#009688 !important`,
        },
    },
    root: {
        float: `right !important`,
    },
    checked: {},
    track: {},
})(Switch);

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = optionGroupStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="primary"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const AddNewStockPage = props => {
    const classes = useStyles();
    const optionGroupClasses = optionGroupStyles();
    const branchProduct = props.product[0];

    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [costPrice , setCostPrice] = useState(0);
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [totalPrice , setTotalPrice] = useState("");

    const [moneySourceDialog, setMoneySourceDialog] = useState(false);
    const [sellingPriceDialog, setSellingPriceDialog] = useState(false);
    const [loading , setLoading] = useState(true);
    const [newLoading , setNewLoading] = useState(true);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [swapItem, setSwapItem] = useState(true);

    const [formFields , setFormFields] = useState({
        quantity: 1,
        sellingPrice: branchProduct.sellingPrice,
        costPrice: costPrice ? parseFloat(costPrice).toFixed(2) : "",
        paymentSource: LocalInfo.stockMoneySource,
        type: 'stock',
        productId: branchProduct.productId,
        branchProductId: branchProduct.id,
        stockMoneySourceRememberChoice: LocalInfo.stockMoneySourceRememberChoice,
        branchId: LocalInfo.branchId,
    });

    const [changePriceFields , setChangePriceFields] = useState({
        sellingPrice: "",
    });

    const checkProduct = () => {
        setLoading(true);
        if((formFields.quantity === "" || formFields.quantity === null || parseFloat(formFields.quantity === 0)) || (formFields.costPrice === "" || formFields.costPrice === null || parseFloat(formFields.costPrice === 0)) || (formFields.sellingPrice === "" || parseFloat(formFields.sellingPrice === 0))) {
            setErrorDialog(true);
            setErrorMsg('Please fill all stock details');
            setLoading(false);
            setTimeout(function(){
                setErrorDialog(false);
            }, 3000);

            return false;
        }

        if((formFields.quantity !== "" || parseFloat(formFields.quantity !== 0)) && (formFields.costPrice !== "" || parseFloat(formFields.costPrice !== 0)) && (formFields.sellingPrice !== "" || parseFloat(formFields.sellingPrice !== 0))){
            if(parseFloat(formFields.costPrice) >= parseFloat(formFields.sellingPrice)){
                setErrorDialog(true);
                setErrorMsg('Cost price can not be more than selling price');
                setLoading(false);
                setTimeout(function(){
                    setErrorDialog(false);
                }, 3000);

                return false;
            }
        }

        if(LocalInfo.stockMoneySourceRememberChoice){
            saveStock();
        }else{
            setMoneySourceDialog(true);
        }
    };

    const saveStock = () => {
        setLoading(true);
        if((formFields.quantity === "" || formFields.quantity === null || parseFloat(formFields.quantity === 0)) || (formFields.costPrice === "" || formFields.costPrice === null || parseFloat(formFields.costPrice === 0)) || (formFields.sellingPrice === "" || parseFloat(formFields.sellingPrice === 0))) {
            setErrorDialog(true);
            setErrorMsg('Please fill all stock details');
            setLoading(false);
            setTimeout(function(){
                setErrorDialog(false);
            }, 3000);

            return false;
        }

        if((formFields.quantity !== "" || parseFloat(formFields.quantity !== 0)) && (formFields.costPrice !== "" || parseFloat(formFields.costPrice !== 0)) && (formFields.sellingPrice !== "" || parseFloat(formFields.sellingPrice !== 0))){
            if(parseFloat(formFields.costPrice) >= parseFloat(formFields.sellingPrice)){
                setErrorDialog(true);
                // setErrorMsg('Cost price can not be more than selling price');
                setLoading(false);
                setTimeout(function(){
                    setErrorDialog(false);
                }, 3000);

                return false;
            }
        }

        props.updateProduct(formFields);

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            setLoading(false);
            props.setView(0)
        }, 2000);
    };

    const cancelAddProduct = (event) => {
        confirmAlert({
            title: 'Confirm to cancel',
            message: 'You risk losing the details added for this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.setView(0);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        });
    };

    const OptionChangeHandler = (event) => {
        event.persist();
        setInputValue('moneySource' , event.target.value);
        LocalInfo.branchSettings(event);
    };

    const swapText = () => {
        if (swapItem) {
            setSwapItem(false);
        }
        else {
            setSwapItem(true);
        }
    };


    useEffect(() => {
        if (!product) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        setProduct(newProduct);
        setQuantityProduct(await productHandler.getProductQuantity());
        setImage(new ProductServiceHandler(newProduct).getProductImage());
        setName(newProduct.name);
        const cp = await productHandler.getCostPrice();
        setCostPrice(cp);
        setInputValue('costPrice' , cp);
        //setTotalPrice((parseFloat(cp * formFields.quantity)).toFixed(2))
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;

        if(name === 'costPrice'){
            setTotalPrice((value * formFields.quantity).toFixed(2));
        }else if(name === 'quantity'){
            setTotalPrice((value * formFields.costPrice).toFixed(2));
        }

        oldFormFields[name] = value;
        if(oldFormFields.costPrice === "" || oldFormFields.quantity === "" || oldFormFields.costPrice === 0 || oldFormFields.quantity === 0){
            setLoading(true)
        }else{
            setLoading(false)
        }

        setFormFields(oldFormFields);
    };

    const setCostValue = (value) => {
        const {...oldFormFields} = formFields;

        for (let i = 0; i < value.length; i++){
            const itemKey = Object.keys(value[i]);
            oldFormFields[itemKey] = value[i][itemKey];
        }

        setTotalPrice((parseFloat(value[0].costPrice) * parseFloat(value[1].quantity)).toFixed(2));
        if(oldFormFields.costPrice === "" || oldFormFields.quantity === "" || oldFormFields.costPrice === 0 || oldFormFields.quantity === 0){
            setLoading(true)
        }else{
            setLoading(false)
        }

        setFormFields(oldFormFields);
    };

    const changePriceFieldsHandler = (event) => {
        const {...oldFormFields} = changePriceFields;
        setNewLoading(false);
        /*if(event.target.name === 'costPrice'){
            setTotalPrice(formFields.quantity * event.target.value);
        }*/

        oldFormFields[event.target.name] = event.target.value;

        setChangePriceFields(oldFormFields);
    };

    const changeSourceModalState = () => {
        setMoneySourceDialog(!moneySourceDialog);
    };

    const changeSellingPriceModalState = () => {
        setSellingPriceDialog(!sellingPriceDialog);
    };

    const handleSwitchChange = event => {
        const name = event.target.name;
        setInputValue(event.target.name , !formFields[name]);
        LocalInfo.branchSettings(event);
    };

    const backHandler = () => {
        props.setView(0);
    };

    const setTotalPriceHandler = event => {
        if(event.target.value === "" && typeof event.target.value !== 'number'){
            setTotalPrice("");
            return true;
        }
        setTotalPrice((event.target.value));
        setInputValue(event.target.name , event.target.value);
        const cp = (parseFloat(event.target.value) / formFields.quantity);

        const {...oldFormFields} = formFields;

        oldFormFields['costPrice'] = cp.toFixed(2);

        setFormFields(oldFormFields);
        //setInputValue('costPrice' , cp.toFixed(2));

        setLoading(false);
    };

    const saveChangePrice = () => {
        const {...oldFormFields} = formFields;

        //oldFormFields['costPrice'] = changePriceFields['costPrice'];
        oldFormFields['sellingPrice'] = changePriceFields['sellingPrice'];

        setFormFields(oldFormFields);
        setChangePriceFields({
            sellingPrice: ""
        });

        changeSellingPriceModalState();
    };

    // const handleCloseSnack = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setErrorDialog(false);
    // };

    return(
        <div className={`mt-6`}>
            <SectionNavbars title="Stock"
                leftIcon= {
                    <ArrowBackIcon
                        onClick={backHandler.bind(this)}
                        style={{fontSize: '2.5rem'}}
                    />
                }
            />

            <SimpleSnackbar
                openState={successDialog}
                message={`New product added successfully`}
            >
                {/*<Button color="secondary" size="small"
                        onClick={props.undoAddProduct}
                >
                    UNDO
                </Button>*/}
            </SimpleSnackbar>
            <SimpleSnackbar
                openState={errorDialog}
                message={errorMsg}
            >
            </SimpleSnackbar>
            {/* <Snackbar open={errorDialog} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar> */}

            <div className="row p-0 pt-0 mx-0 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {name}
                </Typography>
            </div>
            <div>
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={image} alt={name}/>
            </div>

            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px'}}
            >
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    {quantityProduct ? `Available stock: ${quantityProduct}` : `No stock added for this product`}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <QuantityInput startValue={formFields.quantity} label={`Quantity to add`} inputName="quantity" getValue={setInputValue.bind(this)}/>

                    <Grid container spacing={1} className={`my-2`}>
                        <Grid
                            item xs={5}
                        >
                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> Total cost</label>

                            <Paper className={classes.root} id="left_input" >
                                <InputBase
                                    className={`${classes.input} search-box text-center`}
                                    type="tel"
                                    classes={{
                                        input: classes.center
                                    }}
                                    //defaultValue=''
                                    value={totalPrice}
                                    name="totalCost"
                                    onChange={(event) => setTotalPriceHandler(event)}
                                />

                            </Paper>
                        </Grid>
                        <Grid
                            item xs={2}
                        >
                            <SwapHorizOutlinedIcon
                                className={`mt-4`}
                                onClick={swapText}
                                style={{fontSize: '25px'}}
                            />
                        </Grid>
                        <Grid
                            item xs={5}
                        >
                            <UnitCost isSendQuantity={true} product={product} id="right_input" label={`Unit price`} inputName="costPrice" initialValue={formFields.costPrice} getValue={setCostValue.bind(this)} >
                                <FontAwesomeIcon icon={faCalculator} fixedWidth />
                            </UnitCost>
                        </Grid>
                    </Grid>
                    {/*{swapItem ?

                        :

                        <Grid container spacing={1} className={`my-2`}>
                            <Grid
                                item xs={5}
                            >
                                <UnitCost id="left_input" label={`Unit price`} inputName="costPrice" initialValue="" getValue={setInputValue.bind(this)} >
                                    <FontAwesomeIcon onClick={openCalculator.bind(this)} icon={faCalculator} fixedWidth />
                                </UnitCost>
                            </Grid>
                            <Grid
                                item xs={2}
                            >
                                <SwapHorizOutlinedIcon
                                    className={`mt-4`}
                                    onclick={swapText}
                                    style={{fontSize: '25px'}}
                                />
                            </Grid>
                            <Grid
                                item xs={5}
                            >
                                <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> Total cost</label>

                                <Paper className={classes.root} id="left_input" >
                                    <InputBase
                                        className={`${classes.input} search-box text-center`}
                                        type="tel"

                                        defaultValue=''
                                        value={totalPrice}
                                        name="totalCost"
                                        onChange={(event) => setTotalPriceHandler(event)}
                                    />

                                </Paper>
                            </Grid>
                        </Grid>
                    }*/}


                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '300', color: '#daab59', fontSize: '18px' , margin: '0px 0px', padding: '14px', textDecoration: 'underline'}}
                        className={`text-center mx-auto`}
                        onClick={() => setSellingPriceDialog(true)}
                    >
                        Change Selling Price
                    </Typography>
                </div>
            </div>

            <Modal
                states={moneySourceDialog}
                handleClose={changeSourceModalState.bind(this)}
                title={`Money source`}
                footer={
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                    onClick={saveStock}
                >
                    Save
                </Button>
                }
            >
                <Container className={`mx-3`} style={{width: '100%'}}>
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '300', fontSize: '17px' , margin: '0px 0px', padding: '4px'}}
                        className={`text-center mx-auto`}
                    >
                        Where was the money from?
                    </Typography>

                    <Grid item xs={12} className={optionGroupClasses.margin}>
                        <FormControl className={`${optionGroupClasses.margin} optionAdd`} component="fieldset" style={{fontSize: '0.9rem'}}>
                            <RadioGroup
                                className={optionGroupClasses.margin}
                                onChange={OptionChangeHandler}
                                aria-label="paymentSource"
                                name="paymentSource"
                                defaultValue={formFields.paymentSource}
                            >
                                <FormControlLabel value="sales" control={<StyledRadio />} label="Sales" />
                                <FormControlLabel value="owner" control={<StyledRadio />} label="Owner" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={`${optionGroupClasses.margin} mt-3`}>
                        <div className={`mx-auto mb-2`}>
                            <FormControlLabel
                                control={
                                    <PrimarySwitch
                                        size={`medium`}
                                        checked={formFields.stockMoneySourceRememberChoice}
                                        onChange={handleSwitchChange}
                                        name="stockMoneySourceRememberChoice"
                                    />
                                }
                                label="Remember my choice"
                            />
                        </div>

                    </Grid>
                </Container>
            </Modal>

            <Modal
                states={sellingPriceDialog}
                handleClose={changeSellingPriceModalState.bind(this)}
                title={`Change price`}
                footer={
                    <div>
                        <Button
                            style={{'backgroundColor': '#FFFFFF', border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 40px' , marginRight: '5px'}}
                            onClick={changeSellingPriceModalState.bind(this)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px'}}
                            onClick={saveChangePrice}
                            disabled={newLoading}
                        >
                            Save
                        </Button>
                    </div>
                }
            >
                <Container className={`mx-3 my-3`} style={{width: '100%'}}>
                    <Grid item xs={12} className={optionGroupClasses.margin}>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '300', fontSize: '17px' , margin: '0px 0px 20px', padding: '4px'}}
                            className={`text-center mx-auto`}
                        >
                            Current cost price: GHC {formFields.costPrice || costPrice}
                        </Typography>

                        {/*<label className={`text-dark py-2 text-left`} style={{fontSize: '18px'}}> New cost price</label>
*/}
                        {/*<Paper className={classes.root} >
                            <InputBase
                                className={`${classes.input} search-box text-center`}
                                type="tel"
                                initialValue=""
                                value={changePriceFields.costPrice}
                                name="costPrice"
                                onChange={(event) => changePriceFieldsHandler(event)}
                            />

                        </Paper>*/}
                    </Grid>

                    <Grid item xs={12} className={optionGroupClasses.margin}>
                        {/*<Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '300', fontSize: '17px' , margin: '0px 0px', padding: '4px'}}
                            className={`text-left mx-auto mt-3`}
                        >
                            Current selling price: GHC {sellingPrice}
                        </Typography>*/}

                        <label className={`text-dark py-2 text-left`} style={{fontSize: '18px'}}> New selling price</label>

                        <Paper className={classes.root} >
                            <InputBase
                                className={`${classes.input} search-box text-center`}
                                type="tel"
                                initialValue=""
                                value={changePriceFields.sellingPrice}
                                name="sellingPrice"
                                onChange={(event) => changePriceFieldsHandler(event)}
                            />

                        </Paper>
                    </Grid>
                </Container>
            </Modal>
            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', float: 'right', marginRight: '5px'}}
                            onClick={cancelAddProduct.bind(this)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', float: 'left', marginLeft: '5px'}}
                            onClick={checkProduct.bind(this)}
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default AddNewStockPage;
