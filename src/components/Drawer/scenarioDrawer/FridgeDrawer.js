import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import '../Drawer.scss';
import Avatar from "@material-ui/core/Avatar/Avatar";
import { withRouter } from "react-router-dom";
import paths from "../../../utilities/paths";
import LocalInfo from "../../../services/LocalInfo";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SyncService from "../../../services/SyncService";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import AuthService from "../../../services/AuthService";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import RequestLoader from "../Loader/RequestLoader";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 320,
        height: '100%',
        backgroundColor: `#ffffff !important`
    },
    fullList: {
        width: 'auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Drawer = props => {
    const { history } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: props.isShow,
    });

    const lastSync = LocalInfo.lastSyncedAt ?
        `${formatDistanceToNow(
            fromUnixTime(LocalInfo.lastSyncedAt / 1000)
        )} ago` : 'Never synced before';

    const [open, setOpen] = React.useState(props.isShow);
    //const [logoutPop, setLogoutPop] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [syncOpen, setSyncOpen] = React.useState(false);

    const database = useDatabase();

    useEffect(() => {
        setOpen(props.isShow);
        toggleDrawer('left' , props.isShow);
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ 'left': open });
    };

    const handleSyncClose = () => {
         setSyncOpen(false);
    };
    /*const handleSyncToggle = () => {
         setSyncOpen(!syncOpen);
    };*/

     const sync = async() => {
         //setLogoutPop(true);

         setSyncOpen(true);
         //backDrop();
         await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);

         alert("About to sync");
         alert("Done syncing");
         //setLogoutPop(false);

         handleSyncClose();
     };

    const logout = async() => {
        //setLogoutPop(true);
        try {
            await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);
            await new AuthService().logout();

        }catch (e) {
            console.log(e)
        }
        //setLogoutPop(false);

    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {/*<RequestLoader
                open={logoutPop}
            />*/}

            <span className="drawerDefault"
                onClick={() => history.push(paths.dashboard)}
                style={{display: 'flex', position: 'relative', background: '#ffffff', lineHeight: '27px', color: '#403C3C'}}
            >
                <div className="ham-top-div">
                    <div>
                        <Avatar
                            alt={LocalInfo.company.name}
                            className={classes.primaryColor}
                            style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                                margin: '10px auto',
                                textAlign: 'left',
                                color: '#000000',
                                backgroundColor: '#EBBAB3',
                            }}
                        >
                            {(LocalInfo.company.name).charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                    <div className="" style={{ padding:'10px 16px'}}>
                        <span className="large" id="s_name">Fridge mode</span><br/>
                        <span className="medium" id="b_name">{ LocalInfo.userFullName } </span>
                    </div>
		        </div>
            </span>
            <Divider />

            <List className="drawerDefault" style={{background:'#FFFFFF', color: '#403C3C'}}>
                {/* <ListItem button key={1}  >
                    <ListItemIcon><CloudDoneIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary={`Last sync: ${lastSync}`} />
                    <ListItemText
                        style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                        }}
                        className={`shadow1 text-center`}
                        primary="Sync"
                        onClick={sync}
                    />
                   
                </ListItem> */}

                <ListItem button key={2} onClick={() => history.push(paths.sell)}>
                    <ListItemIcon><ShoppingCartIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Sales" />
                </ListItem>

                <ListItem button key={5} onClick={() => history.push(paths.dashboard)}>
                    <ListItemIcon><AccessTimeIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Sales history" />
                </ListItem>

                <ListItem button key={3} onClick={() => history.push(paths.stock)}>
                    <ListItemIcon><FormatListBulletedIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Stock" />
                </ListItem>

                <ListItem button key={5} onClick={() => history.push(paths.dashboard)}>
                    <ListItemIcon><AccessTimeIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Stock history" />
                </ListItem>

                <ListItem button key={7} onClick={() => history.push(paths.audit)}>
                    <ListItemIcon><VisibilityIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Audit" />
                </ListItem>

                <ListItem button key={5} onClick={() => history.push(paths.dashboard)}>
                    <ListItemIcon><AccessTimeIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Audit history" />
                </ListItem>

                <ListItem button key={8} onClick={() => history.push(paths.under_construction)}>
                    <ListItemIcon><AccountBalanceWalletIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Accounting" />
                </ListItem>
                
                <ListItem button key={5} onClick={() => history.push(paths.dashboard)}>
                    <ListItemIcon><AccessTimeIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Fridge Accounting history" />
                </ListItem>
                
                <ListItem button key={12} onClick={logout}>
                    <ListItemIcon><ArrowBackIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Exit Fridge" />
                </ListItem>

            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                open={open}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', open)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
};

export default withRouter(Drawer);
