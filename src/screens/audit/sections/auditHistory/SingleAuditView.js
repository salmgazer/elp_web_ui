import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import format from "date-fns/format";
import DeleteIcon from '@material-ui/icons/Delete';

const SingleAuditView = props => {
    const dateAudit = props.dateAudited;

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

                <Grid item xs={3} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{ width:'100%'}}>
                        <div className={`textItem shadow1 text-center`} style={{display: 'inline-block'}}>
                            <div onClick={props.auditProducts} >View</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{ width:'100%'}}>
                        <div className={`specialDelete shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                            <DeleteIcon
                                onClick={deleteHistoryHandler.bind(this , dateAudit.id)}
                                style={{fontSize: '1.5rem', color: '#DAAB59', marginTop: '5px'}}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>

    );
};

export default SingleAuditView;