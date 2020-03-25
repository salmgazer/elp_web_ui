import React, {useState} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box/Box";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import QuantityInput from "../../../Components/Input/QuantityInput";
import PrimarySelect from "../../../Components/Select/PrimarySelect";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import SectionNavbars from "../../../Components/Sections/SectionNavbars";
import SimpleSnackbar from "../../../Components/Snackbar/SimpleSnackbar";
import Grid from "@material-ui/core/Grid/Grid";


const MoveStock = props => {
    const warehouse = [
        {
            value: 1,
            name: 'Warehouse'
        },
        {
            value: 2,
            name: 'Adenta'
        },
    ];

    const branches = [
        {
            value: 1,
            name: 'Lapaz Branch'
        },
        {
            value: 2,
            name: 'Oyibi Branch'
        },
    ];
    const product = props.product;
    const productHandler = new ProductServiceHandler(product);

    const [formFields , setFormFields] = useState({
        quantity: null,
        moveFrom: null,
        moveTo: null,
        branchId: parseFloat(localStorage.getItem('activeBranch')),
    });

    let lastStock = productHandler.getProductHistory();
    lastStock = lastStock[(lastStock.length - 1)];

    const [loading , setLoading] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;

        setFormFields(oldFormFields);
    };

    console.log(product);

    return (
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
                    style={{fontWeight: '500', fontSize: '16px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    Warehouse : 50 | Lapaz stock : 20
{/*
                    {lastStock ? `Last stock added: ${lastStock.quantity} added on ${format(new Date(lastStock.createdAt) , "dd MMM, yyyy")}` : `No stock added for this product`}
*/}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <Grid container spacing={1} className={`my-1`}>
                        <Grid
                            item xs={12}
                        >
                            <QuantityInput style={{width: '100%'}} label={`Quantity to add`} inputName="quantity" getValue={setInputValue.bind(this)}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={`my-2`}>
                        <Grid
                            item xs={12}
                        >
                            <div className={`my-2 mx-auto`}>
                                <PrimarySelect label="Move from" data={warehouse} getValue={setInputValue.bind(this)} name="moveFrom"/>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={`my-1`}>
                        <Grid
                            item xs={12}
                        >
                            <div className={`my-2 mx-auto`}>
                                <PrimarySelect label="Move to" data={branches} getValue={setInputValue.bind(this)} name="moveTo"/>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <PrimaryButton classes={`mr-2`}>
                    Cancel
                </PrimaryButton>
                <SecondaryButton>
                    Save
                </SecondaryButton>
            </Box>

        </div>
    );
};

export default MoveStock;