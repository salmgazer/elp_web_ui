import React from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Styles from "../../admin/Admin.module.scss";
import ArrowForwardIosIcon from "@material-ui/core/SvgIcon/SvgIcon";
import paths from "../../../utilities/paths";
import Woman from "../../../assets/img/woman.jpg";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";


const ProductCardHorizontal = props => {
    const product = props.product;
    const image = `https://elparah.store/admin/upload/${product.image}`;

    return(
        <Paper className={`shadow bg-white pro-item-horizontal`} >



            {/*<Typography
                component="p"
                variant="h6"
                className={`pb-2 px-1 mt-3 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
            >
                {product.pro_name}
            </Typography>*/}


            <Grid container style={{paddingTop: "7px"}}>
                <Grid item xs={5} sm spacing={2}>
                    <ButtonBase>
                        <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${product.pro_name}`}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={7} sm container className={`py-auto my-auto`}>
                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                        <Grid item xs className={`centered`} >
                            <Typography className={`menu-item block`} style={{fontSize: "0.9rem" , fontWeight: "600"}}>
                                {product.pro_name}
                            </Typography>
                            <Typography className={`menu-item block`} style={{fontSize: "0.9rem" , fontWeight: "400"}}>
                                Ghc {product.Selling_Price}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </Paper>
    );
};

export default ProductCardHorizontal;