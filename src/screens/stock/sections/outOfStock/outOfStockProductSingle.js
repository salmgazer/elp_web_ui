import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
// import BranchProductService from "../../../../services/BranchProductService";
import BranchStockService from "../../../../services/BranchStockService";

const OutOfStockProductSingle = props => {
    const branchProduct = props.product;
    const [product , setProduct] = useState('');
    const [lastHistory , setLastHistory] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [productQuantity , setProductQuantity] = useState(0);
    const [companyStocks , setCompanyStocks] = useState([]);

    useEffect(() => {
        if (!product || !lastHistory || !companyStocks) {
            getProduct();
        }
    });

    //const productHandler = new BranchProductService(branchProduct);

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

    const addNewProductStockView = () => {
        props.addNewProductStockView(branchProduct.id);
    };

    return (
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={2}>
                <Avatar
                    alt={image}
                    src={image}
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        margin: '10px auto',
                        textAlign: 'center',
                    }}
                />
            </Grid>
            <Grid item xs={7}
                  className={`pt-0`}
                  style={{fontSize: '16px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div
                >
                    {name}
                </div>
                <div className="font-weight-light mt-1" style={{color: '#53BF77', fontSize: '14px'}}>{`Quantity remaining : ${productQuantity}`}</div>
            </Grid>

            <Grid item xs={3}
                  className={`pt-2`}
                  style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div onClick={addNewProductStockView.bind(this)}>
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 9px', textTransform: 'none', fontSize:'12px'}}
                    >
                        Add stock
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default OutOfStockProductSingle;
