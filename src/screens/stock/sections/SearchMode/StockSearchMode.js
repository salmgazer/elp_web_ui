import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../Components/Input/SearchInput";
import SingleProductBox from "../../../../components/Product/SingleProductBox";
import Empty from '../../../../assets/img/employee.png';
import paths from "../../../../utilities/paths";
import EmptyContainer from "../../../../components/Empty/EmptyContainer";
import {withRouter} from "react-router-dom";

const StockSearchMode = props => {
    const branchProducts = props.branchProducts;
    const { history } = props;
    const [headerText , setHeaderText] = useState('');
    const [emptyBtnState , setEmptyBtnState] = useState(true);
    const [searchValue , setSearchValue] = useState({
        search: '',
        state: 'inactive'
    });

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;
        if(value.length > 0){
            oldFormFields['state'] = 'active';
            setHeaderText('Search didn\'t not find any product');
            setEmptyBtnState(true);
        }else{
            oldFormFields['state'] = 'inactive';
            setHeaderText('Seems you don\'t have any stock');
            setEmptyBtnState(true);
        }

        setSearchValue(oldFormFields);

        props.searchProduct(value);
    };

    const addProductHandler = (id) => {
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
                {branchProducts.length === 0
                    ?
                    <EmptyContainer
                        buttonAction={() => history.push(paths.add_products)}
                        imageLink={Empty}
                        headerText={headerText}
                        button={emptyBtnState}
                        btnText="Add Product"
                    />
                    :
                    branchProducts.map((branchProduct) =>
                        <SingleProductBox product={branchProduct} key={branchProduct.id} addProductHandler={addProductHandler.bind(this, branchProduct.id)}/>
                    )
                }
            </Grid>
        </div>
    );
};

export default withRouter(StockSearchMode);
