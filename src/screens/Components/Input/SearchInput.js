import React , {useState} from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
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

const SearchInput = (props) => {
    const [value , setValue] = useState('');
    const inputName = props.inputName;

    const setValueHandler = (event) => {
        setValue(event.target.value);
        props.getValue(inputName , event.target.value);
    };

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root} >
                <InputBase
                    className={`${classes.input} search-box`}
                    placeholder="Search for a product"
                    inputProps={{ 'aria-label': 'Search for a product' }}
                    defaultValue={value}
                    name={props.inputName}
                    onChange={(event) => setValueHandler(event)}
                />
                <IconButton className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
};

export default SearchInput;