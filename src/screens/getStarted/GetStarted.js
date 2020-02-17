import React from 'react';
import {makeStyles} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import './GetStarted.scss';
import ViewWelcome from "./sections/ViewWelcome";
import ViewStore from "./sections/ViewStore";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

const ViewControl = props => {
    if(props.isStore){
        return <ViewStore/>;
    }

    return <ViewWelcome username={props.username}/>;
};

const GetStarted = props => {
    const [isStore , setIsStore] = React.useState(false);

    //Temporary name for firstname for user..
    const username = 'Pearl';

    const classes = useStyles();

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <Container maxWidth="sm" p={0}>
                <ViewControl isStore={isStore} username={username}/>
            </Container>
        </div>
    );
};

export default GetStarted;