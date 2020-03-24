import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";

const OutOfStockProductSingle = props => {
    const product = props.product;
    const productHandler = new ProductServiceHandler(product);

    const addNewProductStockView = () => {
        props.addNewProductStockView(product.id);
    };

    return (
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={2}>
                <Card
                    className="shadow1 bordered"
                    style={{margin: '5px auto' ,backgroundImage: `url(${productHandler.getProductImage()})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '40px' ,borderRadius: '50%', height: '40px', padding: '4px'}}
                />
            </Grid>
            <Grid item xs={5}
                  className={`pt-0`}
                  style={{fontSize: '16px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div
                >
                    {productHandler.getProductName()}
                </div>
                <div className="font-weight-light mt-1" style={{color: '#53BF77', fontSize: '14px'}}>{`Items remaining : ${productHandler.getProductQuantity()}`}</div>
            </Grid>

            <Grid item xs={5}
                  className={`pt-2`}
                  style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div onClick={addNewProductStockView.bind(this)}>
                    <PrimaryButton
                        classes={`px-2 my-1`}
                    >
                        Add quantity
                    </PrimaryButton>
                </div>
            </Grid>
        </Grid>
    );
};

export default OutOfStockProductSingle;