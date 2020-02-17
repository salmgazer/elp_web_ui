import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import paths from "../../../utilities/paths";
import SectionNavbars from "../../Components/Sections/SectionNavbars";
import Box from "@material-ui/core/Box/Box";
import Don from '../../../assets/img/Don.jpg';
import Button from "@material-ui/core/Button/Button";
import Step1 from "./sections/Step1";
import Step2 from "./sections/Step2";

class CategorySetup extends Component{
    state = {
        activeStep: 0,
        categories: [
            {
                id: 1,
                name: "Non-alcoholic drink",
                subcategories: [
                    {
                        id: 1,
                        name: "Water",
                        image: `${Don}`,
                        status: true
                    },
                    {
                        id: 2,
                        name: "Soft Drinks",
                        image: `${Don}`,
                        status: false
                    },
                    {
                        id: 3,
                        name: "Malt Drinks",
                        image: `${Don}`,
                        status: true
                    }
                ]
            },
            {
                id: 2,
                name: "Home care",
                subcategories: [
                    {
                        id: 4,
                        name: "Energy Drinks",
                        image: `${Don}`,
                        status: true
                    }
                ]
            },
            {
                id: 3,
                name: "Food",
                subcategories: [
                    {
                        id: 4,
                        name: "Energy Drinks",
                        image: `${Don}`,
                        status: true
                    }
                ]
            },
            {
                id: 4,
                name: "Alcoholic drink",
                subcategories: [
                    {
                        id: 4,
                        name: "Energy Drinks",
                        image: `${Don}`,
                        status: true
                    }
                ]
            }
        ],
        subcategories: [
            {
                id: 1,
                name: "Water",
                image: `${Don}`,
                status: true
            },
            {
                id: 2,
                name: "Soft Drinks",
                image: `${Don}`,
                status: true
            },
            {
                id: 3,
                name: "Malt Drinks",
                image: `${Don}`,
                status: false
            },
            {
                id: 4,
                name: "Energy Drinks",
                image: `${Don}`,
                status: false
            }
        ]
    };

    selectCategoryHandler = (itemId , event) => {
        console.log(itemId);
        const old_subcategories = this.state.subcategories;
        const old_categories = this.state.categories;

        const subcategories = old_categories.findIndex((item => item.id === itemId));
        const item = [
            ...old_categories[subcategories].subcategories
        ];

        console.log(item);

        this.setState({
            subcategories: item
        });
    };

    //Steps to select category
    getSteps = () => {
        return ['Add Categories' , 'View Added Categories'];
    };

    getStepContent = step => {
        const categories = this.state.categories;
        const subcategories = this.state.subcategories;
        switch (step) {
            case 0:
                return <Step1 clickFnc={this.selectCategoryHandler.bind(this)} categories={categories} subcategories={subcategories}/> ;
            case 1:
                return <Step2 subcategories={subcategories}/>;
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

    handleFinish = () => {
        const { history } = this.props;
        history.push(paths.add_products);
    };

    render(){
        const steps = this.getSteps();

        return(
            <div>
                <SectionNavbars title="Setup Shop">
                    <ArrowBackIcon />
                </SectionNavbars>

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