import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RoomIcon from '@material-ui/icons/Room';

const LocationProductSingle = props => {
    const location = props.location;

    return(
        <div className={`rounded mx-1 my-2 p-2 bordered`}>
            <Grid container spacing={1} className={`py-1`}>
                <Grid
                    item xs={2}
                    className={`text-left pl-2`}
                >
                    <RoomIcon
                        style={{fontSize: '30px', color: '#DAAB59'}}
                    />
                </Grid>

                <Grid
                    item xs={4}
                    className={`text-left pl-2`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '16px'}}
                        className={`text-left text-dark`}
                    >
                        {location.name}
                    </Typography>
                </Grid>

                <Grid
                    item xs={3}
                    className={`pl-2 mx-auto`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '16px'}}
                        className={`text-center text-dark`}
                    >
                        {location.quantity}
                    </Typography>
                </Grid>

                <Grid
                    item xs={3}
                    className={`pl-2 mx-auto`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '14px', color: '#DAAB59'}}
                        className={`text-right text-dark font-weight-light`}
                    >
                        {location.status ? 'current' : ''}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
};

export default LocationProductSingle;