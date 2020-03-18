import React from 'react';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box/Box";
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";


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
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const SortSupplierView = props => {

    const openDay = (event) => {
        props.setView(0);
    };

    const classes = useStyles();

    return(
        <div>
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', margin: '5px 0px' }} >
                {props.pageName}
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={10} style={{padding: '4px 8px', marginLeft: '30px'}}>
                    <Paper className={classes.root} >
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            className={`${classes.input} search-box`}
                            placeholder="Search for a product"
                            inputProps={{ 'aria-label': 'Search for a product' }}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>

                    <Grid item xs={3}>
                        <Card
                            className="shadow1"
                            style={{
                                margin: '5px auto', 
                                backgroundImage: `no_image.png`, 
                                backgroundPosition: 'center', 
                                backgroundSize: 'cover', 
                                width: '60px', 
                                borderRadius: '50%', 
                                height: '60px', 
                                padding: '0px'
                            }}
                        />
                    </Grid>

                    <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}} onClick={openDay.bind(this)} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='font-weight-light mt-1' >{props.cellName}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Last sale: 02/03/2020</div>
                        </div>
                    </Grid>

                </Grid>
            </Box>


        </div>
    );
};

export default SortSupplierView;