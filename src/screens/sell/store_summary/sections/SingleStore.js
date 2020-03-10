import React , {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import Card from "@material-ui/core/Card";
import {withRouter} from 'react-router-dom';
import CardDefaultSmall from "../../../Components/Cards/CardDefaultSmall";
import Typography from "@material-ui/core/Typography/Typography";
import './singleStore.scss';
import paths from "../../../../utilities/paths";


const SingleStore = props => {
    const { history } = props;

    const branch = props.branch;
    /*companyName: 'GODS GRACE STORe',
        branchName: 'Adenta Branch',
        companyId: 1,
        branchId: 12,
        sales: 10,
        profit: 2,
        credit: 5,
        purchases: 1,*/
    return (
        <div>
            <Grid container spacing={1} className={`bordered mb-3 py-2 rounded`}>
                <Grid item xs={2}>
                    <div className={`pt-3`}>
                        <StorefrontOutlinedIcon style={{fontSize: '2.5rem' , color: '#DAAB59'}}/>
                    </div>
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}
                        className={`font-weight-bold text-uppercase`}
                    >
                        {branch.companyName}
                        <div className="font-weight-light mt-1 text-capitalize text-dark" style={{fontSize: '14px'}}>{branch.branchName}</div>
                    </div>
                </Grid>
                <Grid item xs={4} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{textAlign: 'right' , width:'100%'}} className={`pt-2`}>
                        <span
                            style={{borderRadius: '6px' , fontSize: '13px' , fontWeight: '700', color: '#DAAB59'}}
                            className={`bordered px-3 py-2`}
                            onClick={() => history.push(paths.sell)}
                        >Open store</span>
                    </div>
                </Grid>

                <Grid container spacing={1} className={`mb-3 text-center mx-3`}>
                    <Grid item xs={3}>
                        <CardDefaultSmall styles={{width: '85%', marginTop: '10px', borderRadius: '10px'}} >
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '13px' , lineHeight: '1.3'}}
                                className={`mx-auto`}
                            >
                                Sales made
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                            >
                                GHC {branch.sales}
                            </Typography>
                        </CardDefaultSmall>
                    </Grid>
                    <Grid item xs={3}>
                        <CardDefaultSmall styles={{width: '85%', marginTop: '10px', borderRadius: '10px'}} >
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '13px' , lineHeight: '1.3'}}
                                className={`mx-2`}
                            >
                                Profit made
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                            >
                                GHC {branch.profit}
                            </Typography>
                        </CardDefaultSmall>
                    </Grid>
                    <Grid item xs={3}>
                        <CardDefaultSmall styles={{width: '85%', marginTop: '10px', borderRadius: '10px'}} >
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '13px' , lineHeight: '1.3'}}
                                className={`mx-auto`}
                            >
                                Credit sales
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                            >
                                GHC {branch.credit}
                            </Typography>
                        </CardDefaultSmall>
                    </Grid>
                    <Grid item xs={3}>
                        <CardDefaultSmall styles={{width: '85%', marginTop: '10px', borderRadius: '10px'}} >
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '12px' , lineHeight: '1.3'}}
                                className={`mx-auto`}
                            >
                                Purchases made
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                            >
                                GHC {branch.purchases}
                            </Typography>
                        </CardDefaultSmall>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(SingleStore);