import React, {useState, useEffect} from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Api from '../../../services/Api';
import PrimaryValidationField from "../../../components/Input/validationInput/PrimaryTextField";
import PrimarySelectField from "../../../components/Input/validationInput/PrimarySelectField";
import PrimaryRadioGroup from "../../../components/Input/validationInput/PrimaryRadioGroup";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function ShopInformationSection(props) {
    const [checkStatus , setCheckStatus] = useState(false);
    const [categories , setCategories] = useState([]);

    const userFields = props.formData;
    const dataValid = props.dataValid;

    const classes = useStyles();

    const [formFields , setFormFields] = useState({
        companyName: userFields.companyName,
        location: userFields.location,
        businessCategoryId: userFields.businessCategoryId,
        storeType: userFields.storeType,
    });

    const [stepError , setStepError] = useState({
        companyName: dataValid.companyName,
        location: dataValid.location,
        businessCategoryId: dataValid.businessCategoryId,
        storeType: dataValid.storeType,
    });

    useEffect(() => {
        (
            async function getCategories(){
                //let newCategory = await new Api('business_categories').index();
                let newCategory = await new Api('business_categories').index();
                setCategories(newCategory.data.business_categories);
            }
        )();
    }, []);

    useEffect(() => {
        if (!checkStatus) {
            validForms();
            setCheckStatus(1);
        }
    });

    const validForms = async () => {
        if(stepError.firstName && stepError.otherNames && stepError.phone){
            await props.isValid(false);
        }else{
            await props.isValid(true);
        }
    };

    const handleChange = async (name , value) => {
        const { ...formData }  = formFields;
        formData[name] = value;
        setFormFields(formData);
        await props.collectData(name , value);
    };

    const handleFormValidation = async (name , value) => {
        const { ...formData }  = stepError;
        formData[name] = value;
        setStepError(formData);
        await props.validDataHandler(name , value);
    };

    const types = [
        {
            value: 'Retail',
            label: 'Retail'
        },
        {
            value: 'Wholesale',
            label: 'Wholesale'
        },
        {
            value: 'Both',
            label: 'Both'
        },
    ];

    return (
        <Paper className={classes.paper} style={{'marginBottom': '80px'}}>
            <Grid container spacing={1}>
                <PrimaryValidationField
                    name="companyName"
                    label="Company name"
                    required={true}
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.companyName}
                />

                <PrimaryValidationField
                    name="location"
                    label="Location"
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    value={userFields.location}
                />

                <PrimarySelectField
                    name="businessCategoryId"
                    label="Store Category"
                    defaultValue="Select Category"
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    selectId="businessCategoryId"
                    values={categories}
                    value={userFields.businessCategoryId}
                />

                <PrimaryRadioGroup
                    name="storeType"
                    label="Store type:"
                    setValue={handleChange}
                    setValid={handleFormValidation}
                    values={types}
                    value={userFields.storeType}
                />
            </Grid>
        </Paper>
    );
}
