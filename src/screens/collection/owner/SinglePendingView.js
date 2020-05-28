import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";

const SingleCollectionView = props => {

    const pendingCollection = props.pendingCollection;

    return (
        <div>
                
            <Paper variant="outlined" style={{marginBottom: '30px', textAlign: 'center', width: '90%',marginLeft: '15px'}}>

                <Typography  style={{ fontSize: '14px', marginBottom: '10px', marginTop: '10px'}} >
                    Collection from {pendingCollection.empName}
                </Typography>

                <Typography  style={{ fontSize: '15px', marginBottom: '10px', marginTop: '10px'}} >
                    GHC {pendingCollection.amount}
                </Typography>

                <Button
                    type="submit"
                    variant="outlined"
                    style={{
                        border: '1px solid', 
                        color: '#DAAB59', 
                        padding: '4px 50px', 
                        marginBottom: '15px', 
                        textTransform: 'none', 
                        fontSize:'15px'}}
                >
                        Approve
                </Button>
            </Paper>
                
        </div>
    )
}

export default withRouter(SingleCollectionView);