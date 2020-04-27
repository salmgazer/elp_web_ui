import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../Components/Input/SearchInput";
import SingleProductBox from "../../../../components/Product/SingleProductBox";
import BranchProductService from "../../../../services/BranchProductService";
import BranchService from "../../../../services/BranchService";

const StockSearchMode = props => {
    //const products = props.stock;
    const branchProducts = props.branchProducts;

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);
        const products = await new BranchService().searchBranchProduct(value);
        //const products = await BranchProductService.searchProduct(value);
        console.log(products);
    };

    const addProductHandler = (id) => {
        console.log(id);
        props.addProductStockView(id);
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto`}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={1}
                className={`shadow1 boxMain mx-auto rounded mt-2`}
                style={{width: '100%', padding: '10px 2% 20px' , marginBottom: '60px'}}
            >
                {branchProducts.map((branchProduct) =>
                    <SingleProductBox product={branchProduct} key={branchProduct.id} addProductHandler={addProductHandler.bind(this, branchProduct.id)}/>
                )}
            </Grid>
        </div>
    );
};

export default StockSearchMode;
