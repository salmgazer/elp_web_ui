import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BoxDefault from '../../../../Components/Box/BoxDefault';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        marginTop: '5px',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const MainView = props => {

    const classes = useStyles();

    const openDay = (event) => {
        props.setView(1);
    };

    return (
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
                styles={{marginTop: '60px'}}
            >
                <Typography component="p" style={{ fontSize: '15px' }} >
                    Select the supplier who sold product to you
                </Typography>
            </BoxDefault>

            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
                styles={{height: '50px'}}
            >
                <Grid container spacing={1}>
                    <Grid item xs={10} style={{padding: '4px 8px', marginLeft: '30px'}}>
                        <Paper className={classes.root} >
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                className={`${classes.input} search-box`}
                                placeholder="Search for a supplier"
                                inputProps={{ 'aria-label': 'Search for a supplier' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>

            </BoxDefault>

            {props.suppliersList.map((item) =>   
                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                    styles={{height: '50px'}}
                    key={item.id}
                    
                >
                    <Grid container spacing={1} onClick={openDay.bind(this)} >
                        <Grid item xs={3} style={{marginTop: '10px'}} >
                            <AccountCircleIcon style={{fontSize: '2.5rem'}}  />
                        </Grid>

                        <Grid item xs={9} style={{display: 'table', height: '60px', margin: '0px 0px'}} >
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' >{item.name}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Last purchase: {item.date} </div>
                            </div>
                        </Grid>
                    </Grid>  
                </BoxDefault>
                
            )}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    
                >
                    Cancel
                </Button>
            </Box>

        </div>
    )
}

export default MainView;