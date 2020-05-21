import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import PaidIcon from "@material-ui/icons/Brightness1";
import AccessTime from "@material-ui/icons/AccessTime";

const SingleOrderHistory = () => {

    return (
        <div>
            <Grid container style={{paddingTop: "7px", borderBottom: "1px solid #d8d2d2"}}>
                <Grid item xs={3} sm style={{paddingTop: "9px"}}>
                    <AccessTime style={{fontSize: "2.5rem" , color: "#5a5959ba"}}/>
                </Grid>
                <Grid item xs={9} sm container style={{paddingBottom: "7px" }}>
                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                        <Grid item xs>
                            <Typography style={{fontSize: "1rem"}}>
                                27th Jan, 2018, 5:00pm
                            </Typography>
                            <Typography  style={{fontSize: "0.9rem"}}>
                                GHC 500
                            </Typography>

                            <Typography style={{fontSize: "0.8rem"}}>
                                <PaidIcon style={{fontSize: "0.8rem" , color : "#4caf50"}}/>&nbsp;
                                Paid
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

export default SingleOrderHistory;