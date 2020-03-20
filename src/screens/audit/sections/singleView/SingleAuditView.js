import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from "@material-ui/core/Button/Button";

const SingleAuditView = props => {
    const dateAudit = props.dateAudited;

    const openProductsView = (event) => {
       props.setView(2);
    };


    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={2} style={{ margin: '30px 0px 0px 0px'}} >
                    <AccessTimeIcon />
                </Grid>

                <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{dateAudit.date}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {dateAudit.time}</div>
                        
                        { dateAudit.status  === "Unbalanced" ? 
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'red'}}> {dateAudit.status}</div>
                         : 
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'green'}}> {dateAudit.status}</div>
                        }  
        

        
                    </div>
                </Grid>

                <Grid item xs={3} style={{ margin: '30px 0px 0px 0px'}}>  
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'13px'}}
                        onClick={openProductsView.bind(this)}
                    >
                        View  
                    </Button>
                </Grid>
            </Grid>

        </div>

    );
};

export default SingleAuditView;