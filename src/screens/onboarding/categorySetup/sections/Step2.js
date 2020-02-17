import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";
import SelectedCategorySingle from "./SelectedCategorySingle";

const Step2 = (props) => {
    return(
        <div>
            <p style={{marginTop: '60px', fontSize: '18px', fontWeight: '600', color: '#333333'}}>Product categories selected</p>

            <Box style={{marginTop: '5px'}} p={1}>
                {props.subcategories.map((item) => <SelectedCategorySingle key={item.id} item={item}/>)}
            </Box>
        </div>
    );
};

export default Step2;