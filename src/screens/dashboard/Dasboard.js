import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import './Dashboard.scss';

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import paths from "../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../Components/Sections/SectionNavbars";
import BoxDefault from "../Components/Box/BoxDefault";
import CardDefault from "../Components/Cards/CardDefault";
import SettingsIcon from '@material-ui/icons/Settings';
import CardGridComponent from "./Sections/CardGridComponent";
import Drawer from "../Components/Drawer/Drawer";

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

const apiUrl = "";

async function getUserStoreFromLocal(database, user, store) {
    return database.collections
        .get("users_stores")
        .query(Q.where("user_id", user.id), Q.where("store_id", store.id))
        .fetch();
}

async function getUserFromLocal(database, usernameOrPhone, password) {
    return database.collections
        .get("users")
        .query(
            Q.where("username", usernameOrPhone),
            Q.or(Q.where("phone", usernameOrPhone)),
            Q.where("password", password)
        )
        .fetch();
}

async function getStore(database) {
    return database.collections
        .get("stores")
        .query()
        .fetch();
}

async function getUsersFromLocal(database) {
    return database.collections
        .get("users")
        .query()
        .fetch();
}

const Dashboard = props => {
    const classes = useStyles();

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;
    const database = useDatabase();

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    return (
        <div style={{height: '100vh'}}>
            <Component
                initialState={{
                    profitMade: 0,
                    salesMade: 0,
                    creditSales: 0,
                    purchaseMade: 0,
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
                        <BoxDefault
                            bgcolor="background.paper"
                            p={1}
                            className={'boxDefault'}
                            styles={{marginTop: '90px'}}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.20rem'}}
                            >
                                Store summary
                            </Typography>

                            <Grid container spacing={1}>
                                <CardGridComponent
                                    title="Sales made today"
                                    amount={state.salesMade}
                                />
                                <CardGridComponent
                                    title="Profit made today"
                                    amount={state.profitMade}
                                />
                                <CardGridComponent
                                    title="Credit sales made"
                                    amount={state.creditSales}
                                >
                                    <br/><a  href="#" style={{'marginTop': '1px', color: '#DAAB59', fontSize: '14px', fontWeight: '300'}}>View credit sales</a>
                                </CardGridComponent>
                                <CardGridComponent
                                    title="Purchases made today"
                                    amount={state.purchaseMade}
                                >
                                    <br/><a  href="#" style={{'marginTop': '1px', color: '#DAAB59', fontSize: '14px', fontWeight: '300'}}>View stock</a>
                                </CardGridComponent>
                            </Grid>
                        </BoxDefault>
                        <BoxDefault
                            bgcolor="background.paper"
                            p={1}
                            className={'boxDefault'}
                            styles={{marginBottom: '90px'}}
                        >
                            <CardDefault styles={{width: '85%', marginTop: '10px'}}>
                                <HomeIcon style={{fontSize: '2rem'}}/>
                                <Typography
                                    component="p"
                                    variant="h6"
                                    style={{fontWeight: '700', fontSize: '1.00rem'}}
                                >
                                    Go to Homepage
                                </Typography>
                            </CardDefault>

                            <CardDefault styles={{width: '85%', marginTop: '20px'}}>
                                <SettingsIcon style={{fontSize: '2rem'}}/>
                                <Typography
                                    component="p"
                                    variant="h6"
                                    style={{fontWeight: '700', fontSize: '1.00rem'}}
                                >
                                    Go to Settings
                                </Typography>
                            </CardDefault>
                        </BoxDefault>



                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            p={1}
                            style={{ height: '4.5rem', position: "fixed", bottom:"0", width:"100%" }}
                        >
                            <Button
                                variant="contained"
                                style={{'width': '70%','backgroundColor': '#DAAB59' , color: '#403C3C', margin: '4px auto',padding: '8px 5px', fontSize: '17px', fontWeight: '700'}}
                                className={classes.button} className="capitalization"
                                onClick={() => history.push(paths.store_summary)}
                            >
                                Start selling
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(Dashboard);
