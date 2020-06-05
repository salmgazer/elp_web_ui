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
import SyncService from "../../services/SyncService";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Backdrop from '@material-ui/core/Backdrop';
import ProgressLabel from 'react-progress-label';
import AuthService from "../../services/AuthService";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Drawer = props => {
    const { history } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: props.isShow,
    });
    const [syncOpen, setSyncOpen] = React.useState(false);

    const database = useDatabase();

    useEffect(() => {
        toggleDrawer('left' , props.isShow);
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ['left']: open });
    };

    const handleSyncClose = () => {
        setSyncOpen(false);
    };
    const handleSyncToggle = () => {
        setSyncOpen(!syncOpen);
    };

    const sync = async() => {
        setSyncOpen(true);
        backDrop();
        await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);

        //alert("About to sync");
        //alert("Done syncing");
        //handleSyncClose();
    }

    const backDrop = () => {
        console.log('I was here')
        return (
            <Backdrop className={classes.backdrop} open={syncOpen}>
                <ProgressLabel
                    progress={localStorage.getItem("currentRequestProgress")}
                    fillColor="rgb(248,247,243)"
                    trackColor="#fff"
                    progressColor="#DAAB59"
                    progressWidth={10}
                    trackWidth={16}
                    trackBorderWidth={1}
                    trackBorderColor="rgb(232,223,209)"
                    cornersWidth={5}
                    size={130}
                    text={localStorage.getItem("currentRequestName")}
                    textProps={{
                        x: '50%',
                        y: '50%',
                        dx: 8,
                        dy: 8,
                        textAnchor: 'middle',
                        style: {
                            fontSize: 28,
                            fontWeight: '500',
                            fill: '#ac884c'
                        }
                    }}
                />
            </Backdrop>
        )
    }

    const logout = async() => {
        try {
            await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);
            await new AuthService().logout();

        }catch (e) {
            console.log(e)
        }
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <span className="drawerDefault"
                onClick={() => history.push(paths.dashboard)}
                style={{display: 'flex', position: 'relative', background: '#403C3C', lineHeight: '27px', color: '#ffffff'}}
            >
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
                <ListItem button key={4} onClick={() => history.push(paths.collection_owner)}>
                    <ListItemIcon><AttachMoneyIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Collection" />
                </ListItem>
                <Divider />
                <ListItem button key={5} onClick={() => history.push(paths.dashboard)}>
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
                <ListItem button key={8} onClick={() => history.push(paths.reconciliation)}>
                    <ListItemIcon><AccountBalanceWalletIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Reconcilation" />
                </ListItem>
                <Divider />
              <ListItem button key={10} onClick={sync}>
                <ListItemIcon><SettingsIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                <ListItemText primary="Sync" />
              </ListItem>
              <Divider />
                <ListItem button key={11}>
                    <ListItemIcon><SettingsIcon style={{color: '#FFFFFF'}} /></ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItem>
                <Divider />
                <ListItem button key={12} onClick={logout}>
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
