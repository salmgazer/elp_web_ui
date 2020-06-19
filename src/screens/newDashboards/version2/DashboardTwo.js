import React, {useEffect , useState} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";

import LocalInfo from '../../../services/LocalInfo';
import CompanyService from "../../../services/CompanyService";
import CardGridComponent from './section/CardGridComponent';

import sell from '../../../assets/img/sell.png';
import stock from '../../../assets/img/stock.png';
import transfer from '../../../assets/img/transfer.png';
import dashboardAlt from '../../../assets/img/dashboardAlt.png';
import audit from '../../../assets/img/audit1.png';
import management from '../../../assets/img/management.png';
import { withRouter } from "react-router-dom";


const Dashboard = props => {
    const [companySales , setCompanySales] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        const response = await new CompanyService().getSalesDetails('today');
        setCompanySales(response);
    };
    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;


    // if (LocalInfo.storeId && LocalInfo.userId) {
    //     history.push(paths.home);
    // }

    return (
        <div style={{height: '100vh'}}>
            <React.Fragment>
                <CssBaseline />

                <SectionNavbars
                    title={ LocalInfo.company.name }
                    leftIcon={
                        <div onClick={() => setIsDrawerShow(true)}>
                            <MenuIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

                <div
                    onClick={() => setIsDrawerShow(false)}
                    onKeyDown={() => setIsDrawerShow(false)}
                >
                    <Drawer isShow={isDrawerShow} />
                </div>

                <Paper style={{marginTop: '60px'}} >
                    <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                        <Grid item xs={11} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >
                                Hello, {username}! What will you like to do?
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                    }}
                >
                    <CardGridComponent 
                        source={sell} 
                        text='Sell' 
                        onClick={() => history.push(paths.sell)}
                    />

                    <CardGridComponent source={stock} text='Stock' onClick={() => history.push(paths.stock)}/>

                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                    }}
                >
                    <CardGridComponent source={transfer} text='Collection' onClick={() => history.push(paths.collection_owner)}/>

                    <CardGridComponent source={dashboardAlt} text='Dashboard' onClick={() => history.push(paths.dashboard)}/>

                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                    }}
                >
                    <CardGridComponent source={audit} text='Audit' onClick={() => history.push(paths.audit)}/>

                    <CardGridComponent source={management} text='Shop management' onClick={() => history.push(paths.admin)}/>

                </div>
                

                
            </React.Fragment>
        </div>
    );
};


export default withRouter(Dashboard);

