import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";

// import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
// import MenuIcon from '@material-ui/icons/Menu';
// import Paper from '@material-ui/core/Paper';
// import BoxDefault from "../../Components/Box/BoxDefault";
// import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import Drawer from "../../Components/Drawer/Drawer";
import LocalInfo from '../../../services/LocalInfo';
// import Container from "@material-ui/core/Container/Container";
// import Box from "@material-ui/core/Box/Box";
// import Button from "@material-ui/core/Button/Button";


const Expense = props => {

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


                        <SectionNavbars title={`Expense`}>
                            <ArrowBackIcon
                                onClick={() => history.push(paths.admin)}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />




                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(Expense);
