import React, {useState} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import {withRouter} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import Welcome from '../../../assets/img/welcome.png';
import Box from "@material-ui/core/Box/Box";
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EventIcon from '@material-ui/icons/Event';
import ListIcon from '@material-ui/icons/List';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddIcon from '@material-ui/icons/Add';
import StoreIcon from '@material-ui/icons/Store';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import paths from '../../../utilities/paths';

const PageInfo = props => {
    const { history } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openAudit, setOpenAudit] = useState(false);
    const [openData, setOpenData] = useState(false);

    const handleClickEdit= () => {
        setOpenEdit(!openEdit);
    };

    const handleClickAudit= () => {
        setOpenAudit(!openAudit);
    };

    const handleClickData= () => {
        setOpenData(!openData);
    };

    return(
        <div>
            <SectionNavbars
                title="Customer care"
                leftIcon={
                    <div onClick={() => props.setView(0)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Box component="div" m={2} style={{marginTop: '5rem'}}>
                <img className="img100" src={Welcome} alt={'welcome'}/>
            </Box>

            <Paper elevation={3} >

                <Grid container spacing={2} style={{marginBottom: '30px'}}>

                    <Grid item xs={2} style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                        <div >
                            {openEdit ? <ExpandMore onClick={handleClickEdit} style={{marginTop: '10px'}} /> : <ArrowForwardIosIcon style={{fontSize: '0.9rem', marginTop: '10px'}} onClick={handleClickEdit} />}
                        </div>
                    </Grid>

                    <Grid xs={1} style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "0px", marginTop: "13px"}}>
                        <EventIcon />
                    </Grid>

                    <Grid item xs={9} style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "0px", marginTop: "5px"}} >
                        <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                            <Typography style={{fontSize: "15px"}}>
                                 Edit data
                            </Typography>                                      
                        </Grid>
                    </Grid>

                    <Collapse in={openEdit} timeout="auto" unmountOnExit style={{width: '100%'}}>
                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{ marginTop: "8px"}} onClick={() => history.push(paths.sales_history)}> 
                                <EventIcon />
                            </Grid>

                            <Grid item xs={8} sm container onClick={() => history.push(paths.sales_history)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '10px'}}>
                                             Edit sale
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{ marginTop: "8px"}} onClick={() => history.push(paths.purchase_history)}>
                                <EventIcon />
                            </Grid>

                            <Grid item xs={8} sm container onClick={() => history.push(paths.purchase_history)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '10px'}}>
                                            Edit purchase
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{ marginTop: "8px"}}>
                                <EventIcon />
                            </Grid>

                            <Grid item xs={8} sm container >
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '10px'}}>
                                            Edit collection
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Collapse>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >
                        <Grid item xs={2} >
                            <div >
                                {openAudit ? <ExpandMore onClick={handleClickAudit} style={{marginTop: '10px'}} /> : <ArrowForwardIosIcon style={{fontSize: '0.9rem', marginTop: '10px'}} onClick={handleClickAudit} />}
                            </div>
                        </Grid>

                        <Grid xs={1} style={{marginTop: "10px" }}>
                            <SearchIcon />
                        </Grid>

                        <Grid item xs={9} style={{ marginTop: "10px" }} >
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                                <Typography style={{fontSize: "15px"}}>
                                    Audit
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>

                    <Collapse in={openAudit} timeout="auto" unmountOnExit style={{width: '100%'}}>
                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{marginTop: "5px" }} onClick={() => history.push(paths.audit)}>
                                <SearchIcon />
                            </Grid>

                            <Grid item xs={8} sm container onClick={() => history.push(paths.audit)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '10px'}}>
                                            View audit
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{marginTop: "5px" }} onClick={() => history.push(paths.audit)}>
                                <SearchIcon />
                            </Grid>

                            <Grid item xs={8} sm onClick={() => history.push(paths.audit)} >
                                <Grid item xs direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '10px'}}>
                                             Audit shop
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Collapse>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >
                        <Grid item xs={2} >
                            <div >
                                {openData ? <ExpandMore onClick={handleClickData} style={{marginTop: '10px'}} /> : <ArrowForwardIosIcon style={{fontSize: '0.9rem', marginTop: '10px'}} onClick={handleClickData} />}
                            </div>
                        </Grid>

                        <Grid xs={1} style={{marginTop: "10px" }}>
                            <ListIcon />
                        </Grid>

                        <Grid item xs={9} style={{ marginTop: "10px" }} >
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                                <Typography style={{fontSize: "15px"}}>
                                    View data entries
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>

                    <Collapse in={openData} timeout="auto" unmountOnExit style={{width: '100%'}}>
                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{marginTop: "5px" }} onClick={() => history.push(paths.invoice_history)}>
                                <ListIcon />
                            </Grid>

                            <Grid item xs={8} sm container onClick={() => history.push(paths.invoice_history)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '8px'}}>
                                            Invoice
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{marginTop: "5px" }} onClick={() => history.push(paths.purchase_history)}>
                                <ListIcon />
                            </Grid>

                            <Grid item xs={8} sm onClick={() => history.push(paths.purchase_history)} >
                                <Grid item xs  direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '8px'}}>
                                            Purchases
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{marginTop: "5px" }} onClick={() => history.push(paths.sales_history)}>
                                <ListIcon />
                            </Grid>

                            <Grid item xs={8} sm onClick={() => history.push(paths.sales_history)} >
                                <Grid item xs  direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '8px'}}>
                                            Sales
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={3} sm />

                            <Grid xs={1} style={{marginTop: "5px" }} onClick={() => history.push(paths.audit)}>
                                <ListIcon />
                            </Grid>

                            <Grid item xs={8} sm onClick={() => history.push(paths.audit)} >
                                <Grid item xs  direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                    <Grid item xs>
                                        <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500", marginTop: '8px'}}>
                                            Audit
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Collapse>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >  

                        <Grid xs={2} style={{marginTop: "10px" }}>
                            <AccessTimeIcon />
                        </Grid>

                        <Grid item xs={10} style={{ marginTop: "10px" }} >
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                                <Typography style={{fontSize: "15px"}}>
                                    Your activity
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >  

                        <Grid xs={2} style={{marginTop: "10px" }} onClick={() => history.push(paths.category_setup)}>
                            <AddIcon />
                        </Grid>

                        <Grid item xs={10} style={{ marginTop: "10px" }} onClick={() => history.push(paths.category_setup)}>
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                                <Typography style={{fontSize: "15px"}}>
                                    Add new product
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >  

                        <Grid xs={2} style={{marginTop: "10px" }} onClick={() => history.push(paths.dashboard)}>
                            <StoreIcon />
                        </Grid>

                        <Grid item xs={10} style={{ marginTop: "10px" }} >
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}} onClick={() => history.push(paths.dashboard)}>
                                <Typography style={{fontSize: "15px"}}>
                                    Enter shop
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >  

                        <Grid xs={2} style={{marginTop: "10px" }}>
                            <StoreIcon />
                        </Grid>

                        <Grid item xs={10} style={{ marginTop: "10px" }} >
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                                <Typography style={{fontSize: "15px"}}>
                                    Set up shop
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container style={{borderBottom: "1px solid #d8d2d2" , padding: "3px 0px", borderTop: "1px solid #d8d2d2" }} >  

                        <Grid xs={2} style={{marginTop: "10px" }}>
                            <LocationOnIcon />
                        </Grid>

                        <Grid item xs={10} style={{ marginTop: "10px" }} >
                            <Grid item xs  style={{textAlign: "left" ,  paddingBottom: "0px"}}>
                                <Typography style={{fontSize: "15px"}}>
                                    Add shop location
                                </Typography>                                      
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
                
                <Grid container style={{marginBottom: '4rem'}} />

            </Paper>

        </div>
    )

}

export default withRouter(PageInfo);
