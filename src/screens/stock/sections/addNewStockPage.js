import React, {useState} from 'react';
import ProductServiceHandler from "../../../services/ProductServiceHandler";
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SimpleSnackbar from "../../Components/Snackbar/SimpleSnackbar";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import QuantityInput from "../../Components/Input/QuantityInput";
import CostCalculator from "../../Components/Calculator/CostCalculator";
import Grid from "@material-ui/core/Grid/Grid";
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import InputBase from "@material-ui/core/InputBase/InputBase";
import Paper from "@material-ui/core/Paper/Paper";
import '../../../screens/Components/Input/styles/SellInput.scss';
import {makeStyles} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import Box from "@material-ui/core/Box/Box";
import Container from "@material-ui/core/Container";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Modal from "../../Components/Modal/Modal";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';

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

    const [calculatorDialog, setCalculatorDialog] = useState(false);
    const [moneySourceDialog, setMoneySourceDialog] = useState(false);
    const [loading , setLoading] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    const [formFields , setFormFields] = useState({
        quantity: null,
        sellingPrice: null,
        costPrice: null,
        moneySource: 'sales',
        productId: props.product.id,
        rememberChoice: false,
        branchId: parseFloat(localStorage.getItem('activeBranch')),
    });

    const getCalculatorValue = (value) => {
        const {...oldFormFields} = formFields;

        oldFormFields['costPrice'] = parseFloat(value);

        setFormFields(oldFormFields);
        console.log(oldFormFields);
    };

    const openCalculator = (event) => {
        setCalculatorDialog(true);
    };

    const getCalculatorModalState = (value) => {
        setCalculatorDialog(value);
    };

    const OptionChangeHandler = (event) => {
        console.log(event.target.value);
    };

    const product = props.product;
    const productHandler = new ProductServiceHandler(product);
    const locations = props.locations;

    let lastStock = productHandler.getProductHistory();
    lastStock = lastStock[(lastStock.length - 1)];



    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;

        setFormFields(oldFormFields);
    };

    const changeSourceModalState = () => {
        setMoneySourceDialog(!moneySourceDialog);
    };

    const handleSwitchChange = event => {
        const {...oldFormFields} = formFields;
        oldFormFields[event.target.name] = event.target.checked;

        setFormFields(oldFormFields);
    };

    console.log(product);

    return(
        <div className={`mt-6`}>
            <SectionNavbars title="Stock" >
                <ArrowBackIcon
                    //onClick={() => )}
                    style={{fontSize: '2.5rem'}}
                />
            </SectionNavbars>

            <SimpleSnackbar
                openState={successDialog}
                message={`New product added successfully`}
            >
                <Button color="secondary" size="small"
                        onClick={props.undoAddProduct}
                >
                    UNDO
                </Button>
            </SimpleSnackbar>

            <CostCalculator product={product} calculatedPrice={getCalculatorValue.bind(this)} closeModal={getCalculatorModalState.bind(this)} calculatorDialog={calculatorDialog}/>

            <div className="row p-0 pt-0 mx-0 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {productHandler.getProductName()}
                </Typography>
            </div>
            <div>
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={productHandler.getProductImage()} alt={productHandler.getProductName()}/>
            </div>

            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px'}}
            >
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '300', fontSize: '14px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark italize`}
                >
                    {lastStock ? `Available stock: ${lastStock.quantity}` : `No stock added for this product`}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <QuantityInput style={{width: '100%'}} label={`Quantity to add`} inputName="quantity" getValue={setInputValue.bind(this)}/>


                    <Grid container spacing={1} className={`my-2`}>
                        <Grid
                            item xs={5}
                        >
                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> Total cost</label>

                            <Paper className={classes.root} >
                                <InputBase
                                    className={`${classes.input} search-box text-center`}
                                    type="tel"
                                    value=""
                                    name="totalCost"
                                />

                            </Paper>
                        </Grid>
                        <Grid
                            item xs={2}
                        >
                            <SwapHorizOutlinedIcon
                                className={`mt-4`}
                                style={{fontSize: '25px'}}
                            />
                        </Grid>
                        <Grid
                            item xs={5}
                        >
                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> Unit cost</label>

                            <Paper className={classes.root} >
                                <InputBase
                                    className={`${classes.input} search-box text-center`}
                                    type="tel"
                                    value=""
                                    name="Unit Cost"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <FontAwesomeIcon onClick={openCalculator.bind(this)} icon={faCalculator} fixedWidth />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '300', color: '#daab59', fontSize: '18px' , margin: '0px 0px', padding: '14px', textDecoration: 'underline'}}
                        className={`text-center mx-auto`}
                    >
                        Change Selling Price
                    </Typography>
                </div>
            </div>

            <Modal
                states={moneySourceDialog}
                handleClose={changeSourceModalState.bind(this)}
                title={`Money source`}
                footer={<SecondaryButton>Save</SecondaryButton>}
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
                                aria-label="moneySource"
                                name="moneySource"
                                defaultValue={formFields.moneySource}
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
                                    <Switch
                                        checked={formFields.rememberChoice}
                                        onChange={handleSwitchChange}
                                        name="rememberChoice"
                                        color="primary"
                                    />
                                }
                                label="Remember my choice"
                            />
                        </div>

                    </Grid>
                </Container>
            </Modal>
            <Box
                className="shadow1 mx-auto"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div style={{ display: 'flex'}}>
                    <div>
                        <PrimaryButton classes={`mr-2`}>
                            Cancel
                        </PrimaryButton>
                    </div>

                    <div onClick={() => setMoneySourceDialog(true)}>
                        <SecondaryButton>
                            Save
                        </SecondaryButton>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default AddNewStockPage;
