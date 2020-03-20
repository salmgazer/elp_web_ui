import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import Date from '../../Components/Date/Date';
import Box from "@material-ui/core/Box/Box";
import BoxDefault from '../../Components/Box/BoxDefault';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button/Button";


import SingleProductView from './singleView/SingleProductView';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
      textAlign: 'center'
    },
    search: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '25px',
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
    },
    formControl: {
        minWidth: 100,
    }
}));

const AuditHistory = props => {

    const classes = useStyles();
    const [prod, setProd] = React.useState('all');

    const handleChange = event => {
        setProd(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(1);
     };

    return(
        <div>

            <SectionNavbar 
                title="Audit History"
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <Grid container spacing={1} className={classes.root} >
                <Date style={{width: '170px', border: 'solid'}}/>
            </Grid>

            <Grid container spacing={1} >
                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                    
                >
                    <Grid xs={12}>
                        Items added: 3
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={6} style={{padding: '2px 4px', margin: '10px 0px'}}>
                            <Paper className={classes.search} >
                                <IconButton className={classes.iconButton} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    style={{fontSize: '11px'}}
                                    className={`${classes.input} search-box`}
                                    placeholder="Search for a product"
                                    inputProps={{ 'aria-label': 'Search for a product' }}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={6}  style={{padding: '2px 4px', margin: '10px 0px'}}>
                            <Paper className={classes.search} >
                                <Select
                                    value={prod}
                                    onChange={handleChange}
                                    style={{width: '100%', backgroundColor: 'rgba(255, 255, 255, 0)' , border: 'none'}}
                                >
                                    <MenuItem value='all'>All products</MenuItem>
                                    <MenuItem value='positive'>Positive difference</MenuItem>
                                    <MenuItem value='negative'>Negative difference</MenuItem>
                                    <MenuItem value='zero'>Zero difference</MenuItem>
                                </Select>
                            </Paper>  
                        </Grid>
                    </Grid>
                </BoxDefault>
            </Grid>

            <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.map((item) => <SingleProductView  key={item.prod_id} item={item} />)}
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                    onClick={backHandler.bind(this)}
                >
                    Back  
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                >
                    Balance
                </Button>
            </Box>

        </div>

    )
}

export default AuditHistory;