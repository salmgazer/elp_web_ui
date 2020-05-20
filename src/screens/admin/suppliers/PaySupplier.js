import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";

import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalInfo from '../../../services/LocalInfo';
import Box from "@material-ui/core/Box/Box";
import warehouseImg from "../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";
import BoxDefault from "../../../components/Box/BoxDefault";
import Drawer from "../../../components/Drawer/Drawer";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import PriceInput from "../../../components/Input/PriceInput";


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
        'border-radius': '10px !important',
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

const PaySupplier = props => {
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

    const [isStore , setIsStore] = React.useState(false);


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


                        <SectionNavbars title={`Suppliers`}>
                            <ArrowBackIcon
                                onClick={() => history.push(paths.view_suppliers)}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />

                        <div className="getStarted">
                            <div style={{minHeight: "100px"}}>
                                _
                            </div>
                            <Box component="div">
                                <img className="img100" src={warehouseImg} alt={'Add warehouse'}/>
                            </Box>
                            <div className={`importWarehouseBox`}>
                                <BoxDefault
                                    styles={{
                                        color: '#333333',
                                        bottom: '0',
                                        minHeight: '200px',
                                        position: 'fixed',
                                        padding: '0px',
                                        margin: '0px',
                                        left: 0,
                                        right: 0,
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '100%',
                                            'backgroundColor': '#ffff',
                                            border: '1px solid #black',
                                            padding: '10px 12px',
                                            margin: '5px auto',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            marginBottom: "10px"
                                        }}
                                    >
                                        Amount owned : Ghc 50.00
                                    </Button>

                                    <p style={{fontSize: '18px', fontWeight: '400', color: '#DAAB59',width: '75%', margin: '50px auto' , marginTop: "0px"}}>
                                        Total Due : Ghc <span>500</span>
                                    </p>
                                    <PriceInput label={`Enter Amount Paid`}/>

                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '80%',
                                            'backgroundColor': '#DAAB59',
                                            borderRadius: '7px',
                                            color: '#333333',
                                            padding: '10px 12px',
                                            margin: '5px auto',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            marginTop: '20px',
                                            marginBottom: "5px"
                                        }}

                                    >
                                        Finish
                                    </Button>
                                </BoxDefault>
                            </div>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(PaySupplier);
