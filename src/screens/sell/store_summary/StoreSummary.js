import React , {useState} from 'react';
import {withRouter} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Component from "@reactions/component";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import Typography from "@material-ui/core/Typography/Typography";
import CardGridComponent from "../../dashboard/Sections/CardGridComponent";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import SingleStore from "./sections/SingleStore";
import Button from "@material-ui/core/Button/Button";
import LocalInfo from "../../../services/LocalInfo";
import CompanyService from "../../../services/CompanyService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import ModelAction from "../../../services/ModelAction";

const StoreSummary = props => {
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    const { history, database, companySales } = props;

    console.log(companySales);
    /*
    * @todo replace user name with localInfo details.
    * */
    const username = LocalInfo.username;

    return (
        <div>
            <Component
                initialState={{
                    profitMade: 0,
                    salesMade: 0,
                    creditMade: 0,
                    purchaseMade: 0,
                    branchList: LocalInfo.branches,
                    companyName: LocalInfo.companies.name
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <SectionNavbars title={`Welcome ${username}`}>
                            <MenuIcon
                                onClick={() => setIsDrawerShow(true)}
                                style={{fontSize: '2.5rem'}}
                            />
                        </SectionNavbars>

                        <Drawer isShow={isDrawerShow} />

                        <div className={`rounded bordered mb-3 mx-2 px-5 py-3 mt-7`}>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '0px 14px'}}
                                className={`text-center mx-auto text-dark`}
                            >
                                Stores Summary
                            </Typography>
                            <span
                                style={{fontWeight: '300', fontSize: '12px' , margin: '0px 0px', padding: '0px 14px'}}
                                className={`text-center`}
                            >
                                This is a summary of all your shops this month
                            </span>

                            <Grid container spacing={1}>
                                <CardGridComponent
                                    title="Sales made this month"
                                    amount={state.salesMade}
                                >
                                    <br/><span style={{'marginTop': '1px', color: '#53BF77', fontSize: '11px', fontWeight: '300' , lineHeight: '1.0'}}>10% higher than last month</span>
                                </CardGridComponent>
                                <CardGridComponent
                                    title="Profit made this month"
                                    amount={state.profitMade}
                                >
                                    <br/><span style={{'marginTop': '1px', color: '#53BF77', fontSize: '11px', fontWeight: '300' , lineHeight: '1.0'}}>10% higher than last month</span>
                                </CardGridComponent>
                                <CardGridComponent
                                    title="Credit sales this month"
                                    amount={state.creditMade}
                                />
                                <CardGridComponent
                                    title="Purchases this month"
                                    amount={state.purchaseMade}
                                />
                            </Grid>
                        </div>

                        <div className={`rounded bordered mb-7 mx-2 px-1 mt-2`}>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '10px 14px 0px'}}
                                className={`text-center mx-auto text-dark`}
                            >
                                Select a shop location to continue
                            </Typography>

                            <Box style={{marginTop: '5px' , paddingBottom: '5px'}} p={1} className={`mt-2 mb-1 mx-1`}>
                                {state.branchList.map((item) => <SingleStore key={item.branchId} branch={item} companyName={state.companyName} />)}
                            </Box>
                        </div>
                        <Box
                            className={`shadow1 bg-white`}
                            p={1}
                            style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                        >
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 20px', fontSize: '14px'}}
                                className={`capitalization font-weight-bold`}
                            >
                                Add new store location
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

const EnhancedStoreSummary = withDatabase(
    withObservables([], ({ database }) => ({
        companySales: CompanyService.sales(),
    }))(withRouter(StoreSummary))
);

export default EnhancedStoreSummary;

