import React, {Component, useEffect, useState} from 'react';
import { withRouter } from "react-router-dom";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import paths from "../../../utilities/paths";
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Step1 from "./sections/Step1";
import Step2 from "./sections/Step2";
import Api from "../../../services/Api";
import SimpleSnackbar from "../../Components/Snackbar/SimpleSnackbar";

class CategorySetup extends Component{
    /*
    * @todo
    * 1. Get categories and subcategories from watermelon.
    * */

    state = {
        activeStep: 0,
        categories: [],
        subcategories: [],
        errorDialog: false,
        errorMsg: '',
    };

    async componentDidMount() {
        const branchId = localStorage.getItem('activeBranch');
        const accessToken = localStorage.getItem('accessToken');
        try {
            let newCategory = await new Api('others').index(
                {},
                {'Authorization': `Bearer ${accessToken}`},
                `https://elp-core-api-dev.herokuapp.com/v1/client/branches/${branchId}/product_categories`,
            );
            localStorage.setItem('categoryLookup' , JSON.stringify(newCategory.data.allChildren));

            this.setState({
                'categories' : newCategory.data.allParents,
                'subcategories' : newCategory.data.allChildren
            });

            console.log(newCategory.data);
        }catch (error) {
            console.log(error)
        }
    }

    selectCategoryHandler = (itemId , event) => {
        //const stateSubcategories = this.state.subcategories;

        let branchCategories = JSON.parse(localStorage.getItem('categoryLookup'));
        console.log(branchCategories);
        const searchResults = branchCategories.filter((item) => {
            return item.parentId === itemId;
        });

        this.setState({
            subcategories: searchResults
        });
    };

    addSubCategoryHandler = (subCategoryId , event) => {
        console.log(subCategoryId);
        let branchCategoriesAdded = JSON.parse(localStorage.getItem('branchCategoriesAdded')) || [];
        let branchCategoriesRemoved = JSON.parse(localStorage.getItem('branchCategoriesRemoved')) || [];

        const old_subcategories = this.state.subcategories;

        const subcategories = old_subcategories.findIndex((item => item.id === subCategoryId));
        const item = {...old_subcategories[subcategories]};
        console.log(item)
        if(item.owned){
            return false;
        }else{
            branchCategoriesAdded.push(subCategoryId);
            branchCategoriesRemoved = branchCategoriesRemoved.filter((item => item !== subCategoryId));

            localStorage.setItem('branchCategoriesRemoved' , JSON.stringify(branchCategoriesRemoved));
        }

        item.owned = !item.owned;
        old_subcategories[subcategories] = item;

        localStorage.setItem('categoryLookup' , JSON.stringify(old_subcategories));

        localStorage.setItem('branchCategoriesAdded' , JSON.stringify(branchCategoriesAdded));

        this.setState({
            subcategories: old_subcategories
        });
    };

    removeSubCategoryHandler = (subCategoryId , event) => {
        let branchCategoriesRemoved = JSON.parse(localStorage.getItem('branchCategoriesRemoved')) || [];
        let branchCategoriesAdded = JSON.parse(localStorage.getItem('branchCategoriesAdded')) || [];

        const old_subcategories = this.state.subcategories;

        const subcategories = old_subcategories.findIndex((item => item.id === subCategoryId));
        const item = {...old_subcategories[subcategories]};

        if(item.owned){
            item.owned = false;
            old_subcategories[subcategories] = item;

            branchCategoriesRemoved.push(subCategoryId);

            localStorage.setItem('branchCategoriesRemoved' , JSON.stringify(branchCategoriesRemoved));

            branchCategoriesAdded = branchCategoriesAdded.filter((item => item !== subCategoryId));

            localStorage.setItem('branchCategoriesAdded' , JSON.stringify(branchCategoriesAdded));
            localStorage.setItem('categoryLookup' , JSON.stringify(old_subcategories));

            this.setState({
                subcategories: old_subcategories
            });
        }else{
            return false;
        }
    };

    searchHandler = (search) => {
        /*
        * @todo
        * Work on fetchin data from source
        * */
        const old_subcategories = JSON.parse(localStorage.getItem('categoryLookup'));

        const subcategories = old_subcategories.filter(function(item) {
            return (item.name).toLowerCase().indexOf(search.toLowerCase()) !== -1
        });

        this.setState({
            subcategories: subcategories
        });
    };

    //Steps to select category
    getSteps = () => {
        return ['Add Categories' , 'View Added Categories'];
    };

    getStepContent = step => {
        const categories = this.state.categories;
        const subcategories = this.state.subcategories;
        const shop_subcategories = subcategories.filter((item) => item.owned === true);

        switch (step) {
            case 0:
                return <Step1 addSubCategory={this.addSubCategoryHandler.bind(this)} removeSubCategory={this.removeSubCategoryHandler.bind(this)} clickFnc={this.selectCategoryHandler.bind(this)} categories={categories} subcategories={subcategories}/> ;
            case 1:
                return <Step2 search={this.searchHandler.bind(this)} addSubCategory={this.addSubCategoryHandler.bind(this)} removeSubCategory={this.removeSubCategoryHandler.bind(this)} subcategories={shop_subcategories}/>;
            default:
                return 'Complete';
        }
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    handleFinish = async() => {
        const { history } = this.props;
        const branchCategories = (this.state.subcategories).filter(item => item.owned === true);

        localStorage.setItem('branchCategories' , JSON.stringify(branchCategories));

        const branchId = localStorage.getItem('activeBranch');
        const accessToken = localStorage.getItem('accessToken');
        const branchAddedCategories = localStorage.getItem('branchCategoriesAdded');

        try {
            let branchCategories = await new Api('others').create(
                {},
                {'Authorization': `Bearer ${accessToken}`},
                {},
                `https://elp-core-api-dev.herokuapp.com/v1/client/branches/${branchId}/product_categories?product_category_ids=${branchAddedCategories}`,
            );

            if(branchCategories){
                history.push(paths.add_products);
            }

            this.setState({
                errorDialog: true,
                errorMsg: 'Something went wrong. Please try again'
            });
        }catch (error) {
            this.setState({
                errorDialog: true,
                errorMsg: error
            });
            console.log(error)
        }
    };

    render(){
        const steps = this.getSteps();
        console.log(JSON.parse(localStorage.getItem('categoryLookup')));

        const counter = ((this.state.subcategories).filter(item => item.owned === true)).length;

        return(
            <div>
                <SectionNavbars title="Setup Shop">
                    <ArrowBackIcon />
                </SectionNavbars>

                <SimpleSnackbar
                    type="warning"
                    openState={this.state.errorDialog}
                    message={this.state.errorMsg}
                />

                <div>
                    {this.state.activeStep === steps.length - 1 ? (
                        <div>
                            {this.getStepContent(this.state.activeStep)}

                            <Box
                                className="shadow1"
                                bgcolor="background.paper"
                                p={1}
                                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                    onClick={this.handleFinish}
                                    disabled={!counter}
                                >
                                    Finish
                                </Button>
                            </Box>
                        </div>
                    ) : (
                        <div>
                            {this.getStepContent(this.state.activeStep)}

                            <Box
                                className="shadow1"
                                bgcolor="background.paper"
                                p={1}
                                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                    onClick={this.handleNext}
                                    disabled={!counter}
                                >
                                    Next
                                </Button>
                            </Box>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(CategorySetup);