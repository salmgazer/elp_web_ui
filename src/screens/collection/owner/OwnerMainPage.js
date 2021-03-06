import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";
import AppsIcon from '@material-ui/icons/Apps';

import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import SingleRecentView from './SingleRecentView';
import SinglePendingView from './SinglePendingView';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import paths from "../../../utilities/paths";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: '65px',
        marginBottom: '3px',
        padding: '10px 10px'
      },
      title: {
          fontSize: '11px',
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
      },
      money: {
          fontSize: '17px',

      },
      paper3: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '80%',
        marginLeft: '25px',
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '90%',
        marginTop: '10px',
        marginLeft: '10px',
    },
    dateInput: {
        borderBottomStyle: 'solid'
    }
}));

const OwnerMainPage = props => {
    const { history } = props;
    const classes = useStyles();
    const collection = props.collection;
    const pendingCollection = props.pendingCollection;
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const historyHandler = (event) => {
        props.setView(1);
    };

    return (
        <div>
            <SectionNavbars
                title="Collection"
                leftIcon={
                    <div>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                leftOnClick={() => setIsDrawerShow(true)}
                rightIcon={
                    <div>
                        <AppsIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                altOnClick={() => history.push(paths.dashboard)}
                icons={
                    <div>
                        <AddCircleRoundedIcon
                            style={{
                                fontSize: '2.5rem',
                                color: '#FFFFFF'
                            }}
                        />
                    </div>
                }
                rightOnClick={() => props.setView(2)}
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <Grid container spacing={1} className={`${classes.root} shadow1`} >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Today's sales
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC {props.branchDetails.total.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Today's purchases
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC {props.branchDetails.purchases.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Credit sales
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC {props.branchDetails.credit.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            {pendingCollection.length === 0
                ?
                <Paper variant="outlined" className={classes.paper2}>

                    <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px', fontWeight: '600' }} >
                        Pending collections for today
                    </Typography>

                    <Typography style={{ fontSize: '18px', padding: '30px', marginBottom: '30px', fontStyle: 'italic'}} >
                        No pending collections
                    </Typography>

                </Paper>
                :
                <div>

                    <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px',  marginTop: '10px', fontWeight: '600' }} >
                        Pending collections for today
                    </Typography>

                    <Paper variant="outlined" className={classes.paper2}>
                        {pendingCollection.map((entry) => <SinglePendingView approveCollection={props.approveCollection} key={entry.id} pendingCollection={entry} />)}
                    </Paper>
                </div>
            }

            {collection.length === 0
                ?
                <div>
                    <Paper variant="outlined" className={classes.paper2} style={{marginBottom: '100px'}} >
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px'}} >
                            Recent approved collections
                        </Typography>

                        <Typography style={{ fontSize: '18px', padding: '30px', marginBottom: '30px', fontStyle: 'italic'}} >
                            No approved collections today
                        </Typography>
                    </Paper>
                </div>
                :
                <div>
                    <Paper variant="outlined" className={classes.paper2} style={{marginBottom: '100px'}}>
                        <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px' }} >
                            Recent collections
                        </Typography>

                        {collection.slice(0, 2).map((entry) => <SingleRecentView approveCollection={props.approveCollection} disapproveCollection={props.disapproveCollection}  key={entry.id} collection={entry} />)}
                    </Paper>
                </div>
            }

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >

                <Button
                    variant="contained"
                    style={{backgroundColor:'#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                    onClick={historyHandler.bind(this)}
                >
                    View history
                </Button>

            </Box>

        </div>
    )
}

export default withRouter(OwnerMainPage);
