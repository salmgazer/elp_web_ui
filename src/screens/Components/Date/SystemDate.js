import React , { useState } from 'react';
import Typography from "@material-ui/core/Typography";

const SystemDate = props => {
    return (
        <div>
            <Typography
                component="h6"
                variant="h6"
                style={{fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
                className={`mx-auto text-dark my-1`}
            >
                12th June, 2019
            </Typography>
        </div>
    );
};

export default SystemDate;