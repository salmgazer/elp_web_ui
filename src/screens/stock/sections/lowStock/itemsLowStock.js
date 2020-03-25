import React from 'react';
import SectionNavbars from "../../../Components/Sections/SectionNavbars";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import Container from "@material-ui/core/Container/Container";
import Box from "@material-ui/core/Box/Box";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import LowStockProductSingle from "./lowStockProductSingle";

const ItemsLowStock = (props) => {
    const products = props.stock;

    const backHandler = () => {
        props.setView(0);
    };

    return (
        <div className={`mt-6`}>
            <SectionNavbars title="Stock" >
                <ArrowBackIcon
                    //onClick={() => )}
                    style={{fontSize: '2.5rem'}}
                />
            </SectionNavbars>

            <div className="row p-0 pt-0 mx-0 text-center shadow1 mb-3">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    Low stock
                </Typography>
            </div>

            <Container
                maxWidth="sm"
                style={{width: '100%'}}
            >
                {products.map((product) => <LowStockProductSingle addNewProductStockView={props.addNewProductStockView} key={product.id} product={product}/>)}
            </Container>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div
                    onClick={backHandler.bind(this)}
                >
                    <SecondaryButton
                        classes={`py-1 px-5`}
                    >
                        Back
                    </SecondaryButton>
                </div>
            </Box>
        </div>
    );
};

export default ItemsLowStock;