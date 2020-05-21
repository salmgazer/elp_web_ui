import React from 'react';
import Grid from "@material-ui/core/Grid";
import ClockIcon from "@material-ui/icons/AccessTime";
import PaidIcon from "@material-ui/icons/Brightness1";
import paths from "../../../../../utilities/paths";
import Typography from "@material-ui/core/Typography";

const SupplierOrderHistorySingle = (props) => {
    const { history } = props;

    return (
        <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2"}}>
            <Grid item xs={3} sm style={{paddingTop: "9px"}}>
                <ClockIcon style={{fontSize: "3.5rem" , color: "#5a5959ba"}}/>
            </Grid>
            <Grid item xs={9} sm container style={{paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                    <Grid item xs>
                        <Typography style={{fontSize: "1.2rem" , fontWeight: '500'}}>
                            27th Jan, 2018, 5:00pm
                        </Typography>
                        <Typography  style={{fontSize: "1.1rem" , fontWeight: '400'}}>
                            GHC 500
                        </Typography>

                        <Typography style={{fontSize: "1rem" , fontWeight: '300'}}>
                            <PaidIcon style={{fontSize: "1.2rem" , color : "#4caf50" , paddingTop: '5px'}}/>&nbsp;
                            Paid
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SupplierOrderHistorySingle;
