import React from 'react';
import Button from "@material-ui/core/Button";

const SecondaryButton = props => {
    return (
        <Button
            variant="contained"
            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px' , fontSize: '15px'}}
            className={`${props.classes} capitalize`}
        >
            {props.children}
        </Button>
    )
};

export default SecondaryButton;