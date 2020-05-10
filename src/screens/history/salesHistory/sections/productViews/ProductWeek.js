import React, {useEffect , useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EventIcon from '@material-ui/icons/Event';


import SaleService from "../../../../../services/SaleService";
import BranchService from "../../../../../services/BranchService";
import LocalInfo from "../../../../../services/LocalInfo";
import format from "date-fns/format";

const ProductWeek = props => {
    const sale = props.sale;
    const prodName = props.prodName;
    const [product, setProduct] = useState(false);
    const [name , setName] = useState(false);
    const [quantity , setQuantity] = useState(false);


    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity) {
            getProduct();
        }
    });

    const getProduct = async () => {
        //const newProduct = await sale.product.fetch();
        const newProduct = await props.saleEntry.product.fetch();
        setProduct(newProduct);

        // const name = new ProductServiceHandler(prod).getProductName();
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);

        const profit = await SaleService.getSaleEntryProfitById(sale.id);
        const quant = await SaleService.getSaleProductQuantity(sale.id);
        const total = await SaleService.getSaleEntryAmountById(sale.id);
        
        setName((name).length > 20 ? (name).slice(0 , 20) + '...' : name);
        //setProduct(newProduct);
        //setImage(new ProductServiceHandler(product).getProductImage());
        setQuantity(quant);
        
    };

    return(
        <div>
            {prodName === name
                ?
                <div>
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={2}>
                        <Card
                            className="shadow1"
                            style={{
                                margin: '10px auto',  
                                backgroundPosition: 'center', 
                                backgroundSize: 'cover', 
                                width: '50px', 
                                borderRadius: '50%', 
                                height: '50px', 
                                padding: '0px'
                            }}
                        >
                            <EventIcon style={{position: 'center', marginTop: '12px'}} />
                        </Card>
                    </Grid>
                    <Grid item xs={10} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{format(new Date(sale.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(sale.createdAt) , "h:mm a")}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales: GHC {(sale.sellingPrice * sale.quantity)}</div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Profit: GHC {(sale.sellingPrice * sale.quantity) - (sale.costPrice * sale.quantity)}</div>
                        </div>
                    </Grid>

                </Grid>

                    
                </div>
                :

                ''
            }
            

        </div>

    );
};

export default ProductWeek;