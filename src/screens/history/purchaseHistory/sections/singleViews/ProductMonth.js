import React, {useEffect , useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EventIcon from '@material-ui/icons/Event';
import BranchStockService from '../../../../../services/BranchStockService';
import format from "date-fns/format";

const ProductMonth = props => {
    /*const product = props.weekItems;
    * @todo format receipt number as required...
    * */

   const purchase = props.purchase;
   const prodName = props.prodName;
   const [product, setProduct] = useState(false);
   const [name , setName] = useState(false);
   const [quantity , setQuantity] = useState('');
   const [costPrice , setCostPrice] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity || !costPrice ) {
            getQuantity();
        }
    });

    const getQuantity = async () => {
        /*
        * @todo get entries via query on model
        * */
       const newProduct = await props.purchaseEntry.product.fetch();
       setProduct(newProduct);
        // const name = new ProductServiceHandler(prod).getProductName();
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);

       const costP = await BranchStockService.getStockEntryCostPriceById(purchase.id);
       const quant = await BranchStockService.getStockProductQuantity(purchase.id);
       setCostPrice(costP);
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
                                <span className='text-dark font-weight-bold' >{format(new Date(purchase.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(purchase.createdAt) , "h:mm a")}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity {quantity}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost : GHC {costPrice}</div>
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

export default ProductMonth;