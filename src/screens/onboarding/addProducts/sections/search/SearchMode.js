import React, {useState} from 'react';
import '../AddProducts.scss';
import {
    makeStyles,
} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import clsx from 'clsx';
import ProductCard from "../../../../../components/Cards/ProductCard";
import AddedIcon from "../../../../../components/ClickableIcons/AddedIcon";
import AddIcon from "../../../../../components/ClickableIcons/AddIcon";
import SearchInput from "../../../../Components/Input/SearchInput";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const optionGroupStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '0.9rem',
    },
    select: {
        '&:before': {
            borderColor: '#DAAB59',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: '#DAAB59',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '95%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: '1px auto',
        width: '95%',
        'text-align': 'center',
    },
    left: {
        'text-align': 'left',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: 'green',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
    },
}));

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = optionGroupStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="primary"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}
const SearchMode = props => {
    const [searchValue , setSearchValue] = useState({
        search: props.searchValue,
        productOption: 'all',
    });

    const products = props.products;

    const optionGroupClasses = optionGroupStyles();


    const addProductHandler = (id) => {
        console.log(id);
        props.productAdd(id);
    };

    const removeProductHandler = (id) => {
        console.log(id);
        props.removeProduct(id);
    };

    const OptionChangeHandler = (event) => {
        props.optionFilter(event.target.value);
        console.log(event.target.value);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return(
        <div className="shadow1 boxMain" style={{minHeight: '400px' , width: '96%', padding: '0px 2% 20px' , marginBottom: '60px'}}>

            <Grid item xs={12} className={optionGroupClasses.margin}>
                <FormControl className={`${optionGroupClasses.margin} optionAdd`} component="fieldset" style={{fontSize: '0.9rem'}}>
                    <RadioGroup
                        className={optionGroupClasses.margin}
                        onChange={OptionChangeHandler}
                        aria-label="store_type"
                        name="storeType"
                        defaultValue={searchValue.productOption}
                    >
                        <FormControlLabel value="all" control={<StyledRadio />} label="All" />
                        <FormControlLabel value="stocked" control={<StyledRadio />} label="Stocked" />
                        <FormControlLabel value="incomplete" control={<StyledRadio />} label="Incomplete" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto`}>
                    <SearchInput
                        initialValue={searchValue.search}
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={1} className='mt-3'>
                {products.map((item) =>
                    <Grid key={item.id} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                        { item.owned ?
                            <div
                                onClick={removeProductHandler.bind(this , item.id)}
                            >
                                <AddedIcon
                                    styles={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        top: '-2px',
                                        float: 'right',
                                        position: 'absolute',
                                        right: '-2px',
                                        color: '#28a745',
                                        zIndex: '1500',
                                    }}
                                />
                            </div>:
                            <div
                                onClick={addProductHandler.bind(this, item.id)}
                            >
                                <AddIcon
                                    styles={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        top: '-2px',
                                        float: 'right',
                                        position: 'absolute',
                                        right: '-2px',
                                        color: '#DAAB59',
                                        zIndex: '1500',
                                    }}
                                />
                            </div>
                        }
                        <div onClick={addProductHandler.bind(this, item.id)}>
                        <ProductCard product={item}>
                        </ProductCard>
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default SearchMode;
