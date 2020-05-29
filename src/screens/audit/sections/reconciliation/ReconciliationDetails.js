import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../../components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Divider from '@material-ui/core/Divider';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import SingleDetail from './singleViews/SingleDetail';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center'
    }
}));

const ReconciliationDetails = props => {
    const classes = useStyles();
    const [isShowDrawer , setIsShowDrawer] = useState(false);

    const backHandler = (event) => {
        props.setView(0);
    };

    const setView = (view) => {
        props.setView(view);
    };

    return (
        <div>
            <SectionNavbar
                title={`Reconciliation details`}
                leftIcon={
                    <div onClick={setView.bind(this , 1)}>
                        <ArrowBackIosIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem
                        button
                        key={8}
                        onClick={setView.bind(this , 3)}
                    >
                        <ListItemIcon><HistoryOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Audit history" />
                    </ListItem>
                    <Divider/>
                    <ListItem
                        button
                        key={10}
                        onClick={() => setIsShowDrawer(false)}
                    >
                        <ListItemIcon><CloseOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <Grid container spacing={1} style={{ marginTop: '70px' }} >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            The total sales
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC 1000
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Total credit
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC 500
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Difference
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC 500
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            {props.reconciliationDetail.map((item) => <SingleDetail  key={item.id} reportItem={item} />)}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={backHandler.bind(this)}
                >
                    Close
                </Button>
            </Box>

        </div>
    )

}

export default ReconciliationDetails;