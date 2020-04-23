import React, {useEffect, useState} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import Typography from "@material-ui/core/Typography";
import ProductServiceHandler from "../../../services/ProductServiceHandler";
import format from 'date-fns/format'
import LocationProductSingle from "./LocationProductSingle";
import Box from "@material-ui/core/Box/Box";
import BottomMenu from "./BottomMenu";
import Grid from "@material-ui/core/Grid/Grid";
import BranchProductService from "../../../services/BranchProductService";
import BranchStockService from "../../../services/BranchStockService";


const StockProductSingle = props => {
    const branchProduct = props.product[0];
    const [product , setProduct] = useState('');
    const [lastHistory , setLastHistory] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [productQuantity , setProductQuantity] = useState(0);
    const [companyStocks , setCompanyStocks] = useState([]);

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    }, []);

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        const fetchLastHistory = await new BranchStockService().getLastProductStock(branchProduct.productId);
        setProduct(newProduct);
        setLastHistory(fetchLastHistory);
        setName(newProduct.name);
        setImage(new ProductServiceHandler(product).getProductImage());
        setProductQuantity(await new BranchStockService().getProductStockQuantity(branchProduct.productId));
        setCompanyStocks(await new BranchStockService().getBranchStockQuantities(branchProduct.productId));
    };

    /*let lastStock = productHandler.getProductHistory();
    lastStock = lastStock[(lastStock.length - 1)];*/

    const [loading , setLoading] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    const backHandler = () => {
        props.setView(0);
    };

    return (
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
                    style={{fontWeight: '300', fontSize: '14px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark italize`}
                >
                    {lastHistory ? `Last stock added: ${lastHistory.quantity} added on ${format(new Date(lastHistory.createdAt) , "dd MMM, yyyy")}` : `No stock added for this product`}
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
                            {productQuantity}
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
                           GHC {parseFloat(productQuantity * branchProduct.sellingPrice).toFixed(2)}
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
                        Quantities Per Location(s)
                    </Typography>

                    {companyStocks.map((location) =>
                        <LocationProductSingle key={location.id} location={location}/>
                    )}
                </div>

            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <BottomMenu setView={props.setView}/>
            </Box>

        </div>
    );
};

export default StockProductSingle;
