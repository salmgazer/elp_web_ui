import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from "@material-ui/core/Button/Button";
import format from "date-fns/format";
import DeleteIcon from '@material-ui/icons/Delete';

const SingleAuditView = props => {
    const dateAudit = props.dateAudited;

    // const openProductsView = (event) => {
    //    props.setView(1);
    // };

    const deleteHistoryHandler = (pId) => {
        console.log(pId)
        props.deleteAuditEntry(pId);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={2} style={{ margin: '25px 0px 0px 0px'}} >
                    <AccessTimeIcon />
                </Grid>

                <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{format(new Date(dateAudit.createdAt) , "do MMMM, yyyy")} </span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>{format(new Date(dateAudit.createdAt) , "h:mm a")}</div>
                        
                        { dateAudit.quantityCounted  === dateAudit.storeQuantity ? 
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'green'}}>Balanced</div>
                         : 
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'red'}}>Unbalanced</div>
                        }  
        
                    </div>
                </Grid>

                <Grid item xs={5} style={{ marginTop: '20px'}}>  
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'13px'}}
                        onClick={props.auditProducts}
                    >
                        View  
                    </Button>
                    <div className={`deleteIcon2 shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                        <DeleteIcon
                            onClick={deleteHistoryHandler.bind(this , dateAudit.id)}
                            style={{fontSize: '20px', color: '#DAAB59', marginTop: '5px'}}
                        />
                    </div>
                </Grid>
            </Grid>

        </div>

    );
};

export default SingleAuditView;