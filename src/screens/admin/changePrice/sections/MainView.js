import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../Components/Input/SearchInput";
import Typography from "@material-ui/core/Typography/Typography";
import ProductCardHorizontal from "../../../../components/Cards/ProductCardHorizontal";

const MainView = props => {
    const branchProducts = props.branchProducts;
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return(
        <div className="" style={{marginTop: '60px'}}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{marginTop: '5px', padding: '4px 4px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                        styles={{width: '95%'}}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={1}
                className='mt-3 shadow1 boxMain mx-auto'
                style={{
                    width: '96%',
                    padding: '20px 2%' ,
                }}
            >
                {branchProducts.length === 0
                    ?
                    <Grid
                        item xs={12}
                        className={`text-left pl-2`}
                    >
                        <div className={`rounded mx-1 my-2 p-2 bordered`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontSize: '16px'}}
                                className={`text-center text-dark w-100`}
                            >
                                No product found
                            </Typography>
                        </div>
                    </Grid>
                    :
                    branchProducts.map((branchProduct) =>
                        <Grid key={branchProduct.productId} item xs={12} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                            <ProductCardHorizontal branchProduct={branchProduct} addProductPrice={props.addProductPrice} product={branchProduct.product.fetch()}>
                            </ProductCardHorizontal>
                        </Grid>
                    )}
            </Grid>
        </div>
    )
};

export default withRouter(MainView);
