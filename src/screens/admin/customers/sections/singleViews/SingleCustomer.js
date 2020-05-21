import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Woman from '../../../../../assets/img/woman.jpg';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    }
}));

const ViewCustomers = props => {

    const classes = useStyles

    return(
        
          
       
                                <Grid container style={{paddingTop: "10px"}}>
                                    <Grid item xs={3} sm>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="customer photo" src={Woman} style={{width: "60px" , height: "60px" , borderRadius: "50%"}}></img>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={5} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }} >
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , marginBottom: "7px"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Esi Mensah
                                                </Typography>

                                                <Typography style={{fontSize: "0.8rem"}}>
                                                    05481452770
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    width: '80%',
                                                    'backgroundColor': '#ffff',
                                                    borderRadius: '5px',
                                                    color: '#ff5722',
                                                    border: 'none',
                                                    padding: '5px 5px',
                                                    fontSize: '11px',
                                                    fontWeight: '500',
                                                    marginTop: '8px',
                                                }}
                                                className={`capitalization`}
                                                // onClick={openDialogHandler.bind(this)}
                                            >
                                                Owes <br />
                                                GHc 500
                                            </Button>

                                        </div>
                                    </Grid>

                                </Grid>

            

        
    )

}
export default ViewCustomers;