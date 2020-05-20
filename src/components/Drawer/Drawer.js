import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import './Drawer.scss';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router-dom";
import paths from "../../utilities/paths";
import LocalInfo from "../../services/LocalInfo";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Drawer = props => {
    const { history } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: props.isShow,
    });

    useEffect(() => {
        toggleDrawer('left' , props.isShow);
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ['left']: open });
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
                        <span className="large" id="s_name">{ LocalInfo.company.name }</span><br/>
                        <span className="small" id="b_name">{ LocalInfo.branch.name }</span><br/>
                        <span className="medium" id="u_name">{ LocalInfo.userFullName }</span>
                    </div>
		        </div>
            </span>

            <List className="drawerDefault" style={{background:'#403C3C', color: '#FFFFFF'}}>
                <Divider />
                {/*<ListItem button key={1}>
                    <ListItemIcon><StoreIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="My stores" />
                </ListItem>
                <Divider />*/}
                <ListItem button key={2} onClick={() => history.push(paths.sell)}>
                    <ListItemIcon><ShoppingCartIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Sell" />
                </ListItem>
                <Divider />
                <ListItem button key={3} onClick={() => history.push(paths.stock)}>
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
                <ListItem button key={6} onClick={() => history.push(paths.admin)}>
                    <ListItemIcon><PersonIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItem>
                <Divider />
                <ListItem button key={7} onClick={() => history.push(paths.get_startedAudit)}>
                    <ListItemIcon><VisibilityIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Audit" />
                </ListItem>
                <Divider />
                <ListItem button key={8}>
                    <ListItemIcon><AccountBalanceWalletIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Reconcilation" />
                </ListItem>
                <Divider />
                <ListItem button key={10}>
                    <ListItemIcon><SettingsIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItem>
                <Divider />
                <ListItem button key={11}>
                    <ListItemIcon><ExitToAppIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                open={props.isShow}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', props.isShow)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
};

export default withRouter(Drawer);
