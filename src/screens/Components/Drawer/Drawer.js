import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';import './Drawer.scss';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Drawer = props => {
    console.log(props);
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: props.isShow,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <span className="drawerDefault"
                  style={{display: 'flex', position: 'relative', background: '#403C3C', lineHeight: '27px', color: '#ffffff'}}>
                <div className="ham-top-div">
                    <div className="ham-top-div-inner">
                        <StoreIcon style={{fontSize: '70px', color: '#000000'}}/>
                    </div>
                    <div className="" style={{ padding:'10px 16px'}}>
                        <span className="large" id="s_name">GODS GRACE STORE</span><br/>
                        <span className="small" id="b_name">Lapaz branch</span><br/>
                        <span className="medium" id="u_name">Pearl Gemegah</span>
                    </div>
		        </div>
            </span>

            <List className="drawerDefault" style={{background:'#403C3C', color: '#FFFFFF'}}>
                <Divider />
                <ListItem button key={1}>
                    <ListItemIcon><StoreIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="My stores" />
                </ListItem>
                <Divider />
                <ListItem button key={2}>
                    <ListItemIcon><ShoppingCartIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Sell" />
                </ListItem>
                <Divider />
                <ListItem button key={3}>
                    <ListItemIcon><ListAltIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Stock" />
                </ListItem>
                <Divider />
                <ListItem button key={4}>
                    <ListItemIcon><AttachMoneyIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Accounting" />
                </ListItem>
                <Divider />
                <ListItem button key={5}>
                    <ListItemIcon><DashboardIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider />
                <ListItem button key={6}>
                    <ListItemIcon><PersonIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItem>
                <Divider />
                <ListItem button key={7}>
                    <ListItemIcon><SettingsIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <Divider />
                <ListItem button key={8}>
                    <ListItemIcon><ExitToAppIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
                <Divider />
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
};

export default Drawer;
