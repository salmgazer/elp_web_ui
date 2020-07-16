import React, {Component} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import './sections/changePrice.scss';
import MainView from "./sections/MainView";
import './changePrice.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import LocalInfo from "../../../services/LocalInfo";
import BranchService from "../../../services/BranchService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchProductStock from "../../../models/branchesProductsStocks/BranchProductStock";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import ModelAction from "../../../services/ModelAction";


class ChangePrice extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            value: 0,
            storeProducts: 1,
            activeStep: 0,
            branchProducts: [],
            currentProduct: {},
            addedProducts: []
        };
    }

    async componentDidMount() {
        const { branchProducts } = this.props;

        await this.setState({
            branchProducts: branchProducts,
            companyBranches: LocalInfo.branches,
        });
    }

    async componentDidUpdate(prevProps) {
        const { branchProducts , branchProductStock } = this.props;

        if(prevProps.branchProductStock.length !== branchProductStock.length){
            this.setState({
                branchProducts: branchProducts,
                companyBranches: LocalInfo.branches,
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {

        switch (step) {
            case 0:
                return <MainView addProductPrice={this.addProductPrice.bind(this)} setView={this.setStepContentView.bind(this)} products={this.state.productList} branchProducts={this.state.branchProducts} searchHandler={this.searchHandler.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async addProductPrice(formFields){
        await new ModelAction('BranchProduct').update(formFields.branchProductId , {
            sellingPrice: parseFloat(formFields.sellingPrice)
        });
    }

    /*
    * Search products handler...
    * */
    searchHandler = async (searchValue) => {
        /*
        * @todo make sure it works...
        * */
        try {
            const products = await new BranchService().searchBranchProduct(searchValue);

            this.setState({
                branchProducts: products,
            });
        }catch (e) {
            return false
        }
    };

    useStyles = () => makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },
    }));

    render(){
        return(
            <div className={`addProducts`}>
                <SectionNavbars
                    title="Change selling price"
                    leftIcon={
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    }
                    leftOnClick={() => this.state.activeStep === 0 ? this.props.history.goBack() : this.setState({
                        activeStep: 0
                        })}
                />

                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchProducts' , 'branchProductStock'], ({ branchProducts , branchProductStock, database }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        branchProductStock: database.collections.get(BranchProductStock.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
    }))(withRouter(ChangePrice))
);

export default withRouter(EnhancedDirectiveViewStock);

