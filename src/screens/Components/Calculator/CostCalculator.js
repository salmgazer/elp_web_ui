import React from 'react';
import PriceInput from "../Input/PriceInput";

const CostCalculator = (props) => {
    return(
        <div>
            <PriceInput label={`Quantity on a roll/box`}/>
            <PriceInput label={`How many boxes/pack did you buy`}/>
            <PriceInput label={`What was the total cost of all the items?`}/>
        </div>
    )
};

export default CostCalculator;