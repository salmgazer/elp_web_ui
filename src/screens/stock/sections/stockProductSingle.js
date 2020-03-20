import React, {useState} from 'react';
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import SimpleSnackbar from "../../Components/Snackbar/SimpleSnackbar";
import Typography from "@material-ui/core/Typography";
import ProductServiceHandler from "../../../services/ProductServiceHandler";
import format from 'date-fns/format'
import LocationProductSingle from "./LocationProductSingle";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import Box from "@material-ui/core/Box/Box";
import BottomMenu from "./BottomMenu";


const StockProductSingle = props => {
    const product = props.product;
    const productHandler = new ProductServiceHandler(product);
    const locations = props.locations;

    let lastStock = productHandler.getProductHistory();
    lastStock = lastStock[(lastStock.length - 1)];

    const [loading , setLoading] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

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
                    style={{fontWeight: '300', fontSize: '14px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark italize`}
                >
                    {lastStock ? `Last stock added: ${lastStock.quantity} added on ${format(new Date(lastStock.createdAt) , "dd MMM, yyyy")}` : `No stock added for this product`}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`} style={{display: 'flex'}}>
                    <div className={`stockQuantityCount w-50 p-1`}>
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '300', fontSize: '14px' , lineHeight: '1.5'}}
                            className={`mx-2`}
                        >
                            Total Quantity
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '700', fontSize: '16px' , lineHeight: '1.5'}}
                        >
                            2000
                        </Typography>
                    </div>

                    <div className={`w-50 p-1`}>
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '300', fontSize: '14px' , lineHeight: '1.5'}}
                            className={`mx-2`}
                        >
                            Sales value
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '700', fontSize: '16px' , lineHeight: '1.5'}}
                        >
                            GHC 40,000
                        </Typography>
                    </div>
                </div>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '600', fontSize: '15px' , margin: '0px 0px', padding: '3px'}}
                        className={`text-center mx-auto text-dark w-100`}
                    >
                        Quantities Per Locations
                    </Typography>

                    {locations.map((location) =>
                        <LocationProductSingle location={location}/>
                    )}
                </div>

            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <BottomMenu/>
            </Box>

        </div>
    );
};

export default StockProductSingle;