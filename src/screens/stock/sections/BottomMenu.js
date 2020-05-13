import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { withRouter } from "react-router-dom";
import paths from "../../../utilities/paths";
import LocalInfo from "../../../services/LocalInfo";

const BottomMenu = props => {
    const { history } = props;
    const setView = (step) => {
        props.setView(step);
    };

    return (
        <Grid
            container
            spacing={1}
            className={`py-1`}
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <div
                className={`text-center icon-color`}
                style={{
                    flex: 1,
                }}
            >
                <AddShoppingCartOutlinedIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                    onClick={() => setView(5)}
                >
                    Add stock
                </Typography>
            </div>

            {LocalInfo.branches.length > 1 ?
                <div
                    style={{flex: 1}}
                    onClick={setView.bind(this, 6)}
                    className={`text-center icon-color`}
                >
                    <SwapHorizOutlinedIcon
                        style={{fontSize: '25px'}}
                    />
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '12px'}}
                        onClick={() => setView(6)}
                    >
                        Move stock
                    </Typography>
                </div>
                : ''}
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                onClick={() => history.push(paths.purchase_history)}
            >
                <AccessTimeIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    History
                </Typography>
            </div>
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
            >
                <CreateOutlinedIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    Change price
                </Typography>
            </div>
        </Grid>
    );
};

export default withRouter(BottomMenu);

