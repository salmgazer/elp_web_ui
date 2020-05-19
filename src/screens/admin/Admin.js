import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import './Admin.scss';
import Styles from './Admin.module.scss';
import Grid from '@material-ui/core/Grid';
import paths from "../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Woman from '../../assets/img/woman.jpg';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../components/Sections/SectionNavbars";
import Drawer from "../../components/Drawer/Drawer";

import LocalInfo from '../../services/LocalInfo';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
    shadow2: {
        'box-shadow': '0 0 1rem 2px #dcc7a4',
    },
    margin1: {
        margin: '20px auto',
    },
    padding1: {
        'padding-bottom': '20px',
    },
    boxRadius: {
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const Admin = props => {
    const classes = useStyles();

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    return (
        <div style={{height: '100vh'}}>
            <Component
                initialState={{
                    isDrawerShow: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />


                        <SectionNavbars title={`Welcome ${username}`}>
                            <MenuIcon
                                onClick={() => setState({isDrawerShow: true})}
                                style={{fontSize: '2.5rem'}}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />

                        <div style={{ position: "fixed", top:"80px", width:"100%" }}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="complex" src={Woman} style={{width: "60px" , height: "60px" , borderRadius: "50%"}}></img>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={6} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Pearl Gemegah
                                                </Typography>
                                                <Typography  style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    God's Grace Store
                                                </Typography>
                                                <Typography style={{fontSize: "0.8rem"}}>
                                                    Owner
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className={Styles.block} item xs={2} sm>
                                        <div className={Styles.centered}>
                                        <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.account_info)}/>
                                        </div>
                                    </Grid>
                                </Grid>

                            </Paper>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "10px" , paddingBottom: "0px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Shop Information
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Add shop
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>
                                             <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.register)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Add warehouse
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.add_warehouse)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                   Change store information
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.change_store_info)}/>

                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid item xs={12} sm container style={{borderBottom: "1px solid #d8d2d2" , borderTop: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "6px" , paddingBottom: "0px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Stock
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Change prices
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.change_price)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Request for new products
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.register)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Generate barcode
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} 
                                            // onClick={() => history.push(paths.generate_barcode)}
                                            />

                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid item xs={12} sm container style={{borderBottom: "1px solid #d8d2d2" , borderTop: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "6px" , paddingBottom: "0px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Employees
                                        </Typography>
                                    </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Manage employees
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.register)}/>

                                        </div>
                                    </Grid>

                                </Grid>
                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={2} sm>

                                    </Grid>
                                    <Grid item xs={8} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Employees permission
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.register)}/>

                                        </div>
                                    </Grid>

                                </Grid>



                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Edit expense list
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.expense)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Suppliers
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.suppliers)}/>

                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Customers
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.view_customers)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    User Log
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.register)}/>

                                        </div>
                                    </Grid>

                                </Grid>




                            </Grid>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(Admin);
