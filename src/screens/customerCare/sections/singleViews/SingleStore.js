import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import StoreMallDirectoryRoundedIcon from '@material-ui/icons/StoreMallDirectoryRounded';
import {Link, withRouter} from 'react-router-dom';
import './singleStore.scss';
// import paths from "../../../../utilities/paths";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Collapsible from 'react-collapsible';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// import LocalInfo from "../../../../services/LocalInfo";
// import BranchService from "../../../../services/BranchService";

const SingleStore = props => {
    // const { history } = props;
    // const [companySales , setCompanySales] = useState(false);
    const company = props.company;

    // useEffect(() => {
    //     // You need to restrict it at some point
    //     // This is just dummy code and should be replaced by actual
    //     if (!companySales) {
    //         getCompanyDetails();
    //     }
    // });

    // const getCompanyDetails = async () => {
    //     setCompanySales(await new BranchService().getSalesDetails('month' , branch.id));
    // };

    // const setBranch = (branchId) => {
    //   console.log(branchId);
    //     LocalInfo.branchId = branchId;
    //     history.push(paths.sell);
    // };

    return (
        <div className={`bordered rounded mb-3`}>
            <Grid container spacing={1} className={`px-2`}>
                <Grid item xs={2}>
                    <div className={`pt-3`}>
                        <StoreMallDirectoryRoundedIcon style={{fontSize: '2.5rem' , color: '#DAAB59'}}/>
                    </div>
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle', fontSize: '14px'}}
                        className={`font-weight-bold text-uppercase`}
                    >
                        {company.name}
                        
                    </div>
                </Grid>
                <Grid item xs={4} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{textAlign: 'right' , width:'100%'}} className={`pt-2`}>
                        <Link to={''} style={{textDecorationColor: '#333333'}}>
                            <span  style={{'marginTop': '30px', marginBottom: '20px', color: '#DAAB59', fontSize: '13px'}}>View branches</span> <br/>
                        </Link> 
                    </div>
                </Grid>
            </Grid>

            <Collapsible
                trigger={
                    <div className={`mx-auto w-100`}>
                        <ExpandMoreRoundedIcon/>
                    </div>
                }
                triggerWhenOpen={
                    <div className={`mx-auto w-100`}>
                        <ExpandLessRoundedIcon/>
                    </div>
                }
            >
                <div
                    style={{
                        display: 'block',
                        width: '95%',
                        alignItems: 'left',
                        textAlign: 'left',
                        marginBottom: '5px' ,
                        margin: 'auto',
                        paddingBottom: '10px'
                    }}
                >
                    {company.branches.map((item) => 

                        <div key={item.id} style={{marginBottom: '10px'}}>
                            <Grid container >

                                <Grid item xs={1}>
                                    <LocationOnIcon key={item.id} style={{color: '#DAAB59'}}/> 
                                </Grid>
                    
                                <Grid xs={11} >
                                    <Link key={item.id} to={''} style={{textDecorationColor: '#333333'}}>
                                        <span  style={{'marginTop': '30px', marginBottom: '20px', color: '#403C3C', fontSize: '13px'}}>{item.name}</span> <br/>
                                    </Link> 
                                </Grid>

                            </Grid>

                        </div>
                    
                    )}

                </div>
            </Collapsible>

        </div>
    );
};

export default withRouter(SingleStore);
