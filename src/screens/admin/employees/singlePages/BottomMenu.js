import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { withRouter } from "react-router-dom";
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MenuIcon from '@material-ui/icons/Menu';

import paths from "../../../../utilities/paths";
import LocalInfo from "../../../../services/LocalInfo";

const BottomMenu = props => {
    const { history } = props;
    const number = props.number;
    
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
                <a href={`tel:${number}`} style={{textDecoration: 'none', textTransform: 'none'}}>
                    <PhoneIcon
                        style={{fontSize: '25px'}}
                    />

                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '12px'}}
                        // onClick={() => setView(5)}
                    >
                        Contact
                    </Typography>
                </a>
            </div>

            
            <div
                style={{flex: 1}}
                //onClick={setView.bind(this, 6)}
                className={`text-center icon-color`}
            >
                <DeleteOutlinedIcon
                    style={{fontSize: '25px'}}
                />
                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                    //onClick={setView.bind(this, 6)}
                >
                    Delete
                </Typography>
            </div>
                
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                onClick={() => setView(6)}
            >
                <MenuIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    Log
                </Typography>
            </div>
        </Grid>
    );
};

export default withRouter(BottomMenu);

