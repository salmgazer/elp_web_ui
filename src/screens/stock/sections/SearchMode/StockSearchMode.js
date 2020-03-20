import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../Components/Input/SearchInput";
import SingleProductBox from "../../../Components/Product/SingleProductBox";

const StockSearchMode = props => {
    const products = props.stock;

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        //props.searchHandler(value);
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
                {products.map((product) =>
                    <SingleProductBox product={product} key={product.id} addProductHandler={addProductHandler.bind(this, product.id)}/>
                )}
            </Grid>
        </div>
    );
};

export default StockSearchMode;