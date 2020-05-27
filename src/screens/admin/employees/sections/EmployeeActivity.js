import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import ListItemText from '@material-ui/core/ListItemText';

import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import BottomMenu from '../singlePages/BottomMenu';
import SingleActivity from '../singlePages/SingleActivity';
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import BoxDefault from '../../../../components/Box/BoxDefault';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    }
}));

const EmployeeActivity = props => {

    const classes = useStyles();
    const [isShowDrawer , setIsShowDrawer] = useState(false);

    const backHandler = (event) => {
        props.setView(4);
    };

    const setView = (step) => {
        props.setView(step);
    };

    return (
        <div>
            <SectionNavbars
                title="Employees"
                leftIcon={
                    <div onClick={backHandler.bind(this)}>
                        <ArrowBackIosIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => setIsShowDrawer(true)}>
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
                    <ListItem button key={11}>
                        <ListItemIcon><ShareIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Share" />
                    </ListItem>
                    <ListItem button key={12}>
                        <ListItemIcon><CloudUploadIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Upload" />
                    </ListItem>
                    <ListItem button key={13}>
                        <ListItemIcon><FileCopyIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Copy" />
                    </ListItem>
                    <ListItem button key={14}>
                        <ListItemIcon><PrintIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Print this page" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <Paper style={{marginTop: '60px'}} >
                <Grid container spacing={2} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '25px'}} className={`mx-auto mt-7`}>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >
                            Attendant activity
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>


            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >

                {props.employeeActivities.map((item) => <SingleActivity  key={item.id} activity={item}/>)}

            </BoxDefault>
           
            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <BottomMenu setView={props.setView}/>
            </Box>

        </div>
    )

}

export default withRouter(EmployeeActivity);