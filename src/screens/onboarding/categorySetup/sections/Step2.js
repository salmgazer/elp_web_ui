import React, {useState} from 'react';
import Box from "@material-ui/core/Box/Box";
import SelectedCategorySingle from "./SelectedCategorySingle";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core";
import SearchInput from "../../../Components/Input/SearchInput";

const Step2 = (props) => {
    const [searchValue , setSearchValue] = useState({
        search: '',
    });


    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.search(value);
    };

    return(
        <div>
            <Box className={`mt-5 shadow1 pb-2`} p={1}>
                <p  style={{fontSize: '18px', fontWeight: '600', color: '#333333'}} className={`my-2`}>Added categories</p>

                <Grid container spacing={1}>
                    <Grid item xs={10} style={{padding: '4px 8px 14px'}} className={`mx-auto`}>
                        <SearchInput
                            inputName="search"
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box style={{marginTop: '5px'}} p={1}>
                {props.subcategories.map((item) => <SelectedCategorySingle key={item.id} item={item} _addSubCategoryHandler={props.addSubCategory} />)}
            </Box>
        </div>
    );
};

export default Step2;