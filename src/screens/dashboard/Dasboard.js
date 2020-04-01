import React from "react";
import { withRouter } from "react-router-dom";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import './Dashboard.scss';

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import paths from "../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../components/Sections/SectionNavbars";
import BoxDefault from "../../components/Box/BoxDefault";
import CardDefault from "../../components/Cards/CardDefault";
import SettingsIcon from '@material-ui/icons/Settings';
import CardGridComponent from "./Sections/CardGridComponent";
import Drawer from "../../components/Drawer/Drawer";

import LocalInfo from '../../services/LocalInfo';
import Manufacturer from "../../models/manufacturers/Manufacturer";
import Brand from "../../models/brands/Brand";
import BranchProduct from "../../models/branchesProducts/BranchProduct";
import SyncService from "../../services/SyncService";
import Product from "../../models/products/Product";
import Customer from "../../models/customers/Customer";
import Sales from "../../models/sales/Sales";
import ModelAction from "../../services/ModelAction";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
    shadow2: {
        'box-shadow': '0 0 1rem 2px #dcc7a4',
    },
    margin1: {
        margin: '20px auto',
    },
    padding1: {
        'padding-bottom': '20px',
    },
    boxRadius: {
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const Dashboard = props => {
    const classes = useStyles();
    const [text , setText] = React.useState();
    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history, branchProducts, brands, manufacturers, products, database, customers , sales } = props;
    // const database = useDatabase();


    const createBrand = async() => {
        const columns = {
            name: 'Maner',
            location: 'Mallam',
            phone: '0241441749',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        const mew = await new ModelAction('Brand').post(columns);

        console.log("********************************");
        console.log(new ModelAction('Brand').index())
        console.log(mew);
        console.log("**************************");
    }

   /* console.log(new ModelAction('Product').findByColumns(
        [
            {
                name: "barcode",
                value: "6928001828376",
                fxn: "notEq"
            }
        ]
    ));*/
    console.log("********************************");
    console.log(products);
    console.log("**************************");
    console.log(Product.columns);
    console.log(branchProducts);
    console.log(brands);
    console.log(manufacturers);

    console.log(customers);
    console.log(sales);
    console.log("********************************");

  const createCustomer = async () => {
    //const customersCollection = database.collections.get(Customer.table);
    const brandsCollection = database.collections.get(Sales.table);
    //const salesCollection = database.collections.get(Sales.table);
    //const customerToCreate = { name: "That guy", location: "Oyibi", phone: "0543344100", createdAt: Date.now(), updatedAt: Date.now() };
    const salesToCreate = { note: "That guy", type: "sale", paymentStatus: "part", customerId: 'wqkvpgojy0u9r6nk', branchId: LocalInfo.branchId, receiptNumber: 'asdadsad' , createdBy: LocalInfo.userId ,createdAt: Date.now(), updatedAt: Date.now() };
    database.action(async () => {
      /*const existingBrand = await salesToCreate
        .query(Q.where("receiptNumber", salesToCreate.receiptNumber))
        .fetch();
      if (existingBrand[0]) {
        alert(`The brand ${salesToCreate.receiptNumber} already exists`);
        return;
      }*/
        /*const newCustomer = await customersCollection.create(brand => {
            brand.name = customerToCreate.name;
            brand.location = customerToCreate.location;
            brand.phone = customerToCreate.phone;
            brand.createdAt = customerToCreate.createdAt;
            brand.updatedAt = customerToCreate.updatedAt;
        });*/
      const customer = await database.collections.get(Customer.table).find(customers[0].id);
      const newBrand = await brandsCollection.create(brand => {
        brand.note = salesToCreate.note;
        brand.type = salesToCreate.type;
        brand.paymentStatus = salesToCreate.paymentStatus;
        //brand.customerId = customer;
        brand.customer.set(customer);
        brand.branchId = salesToCreate.branchId;
        //brand.customerId = salesToCreate.customerId;
        brand.receiptNumber = salesToCreate.receiptNumber;
        brand.createdBy = salesToCreate.createdBy;
        brand.createdAt = salesToCreate.createdAt;
        brand.updatedAt = salesToCreate.updatedAt;
      });
      //alert(`Successfully created the customer ${newCustomer.name}`);
      alert(`Successfully created the sales ${newBrand.receiptNumber}`);
    });
  };


    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    return (
        <div style={{height: '100vh'}}>
            <Component
                initialState={{
                    profitMade: 0,
                    salesMade: 0,
                    creditSales: 0,
                    purchaseMade: 0,
                    isDrawerShow: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />


                        <SectionNavbars title={`Welcome ${username}`}>
                            <MenuIcon
                                onClick={() => setState({isDrawerShow: true})}
                                style={{fontSize: '2.5rem'}}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />
                        <BoxDefault
                            bgcolor="background.paper"
                            p={1}
                            className={'boxDefault'}
                            styles={{marginTop: '90px'}}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.20rem'}}
                            >
                                Store summary
                            </Typography>

                            <Grid container spacing={1}>
                                <CardGridComponent
                                    title="Sales made today"
                                    amount={state.salesMade}
                                />
                                <CardGridComponent
                                    title="Profit made today"
                                    amount={state.profitMade}
                                />
                                <CardGridComponent
                                    title="Credit sales made"
                                    amount={state.creditSales}
                                >
                                    <br/><a  href="#" style={{'marginTop': '1px', color: '#DAAB59', fontSize: '14px', fontWeight: '300'}}>View credit sales</a>
                                </CardGridComponent>
                                <CardGridComponent
                                    title="Purchases made today"
                                    amount={state.purchaseMade}
                                >
                                    <br/><a  href="#" style={{'marginTop': '1px', color: '#DAAB59', fontSize: '14px', fontWeight: '300'}}>View stock</a>
                                </CardGridComponent>
                            </Grid>
                        </BoxDefault>
                        <BoxDefault
                            bgcolor="background.paper"
                            p={1}
                            className={'boxDefault'}
                            styles={{marginBottom: '90px'}}
                        >
                            <CardDefault styles={{width: '85%', marginTop: '10px'}}>
                                <HomeIcon style={{fontSize: '2rem'}}/>
                                <Typography
                                    component="p"
                                    variant="h6"
                                    style={{fontWeight: '700', fontSize: '1.00rem'}}
                                >
                                    Go to Homepage
                                </Typography>
                            </CardDefault>

                            <CardDefault styles={{width: '85%', marginTop: '20px'}}>
                                <SettingsIcon style={{fontSize: '2rem'}}/>
                                <Typography
                                    component="p"
                                    variant="h6"
                                    style={{fontWeight: '700', fontSize: '1.00rem'}}
                                >
                                    Go to Settings
                                </Typography>
                            </CardDefault>
                        </BoxDefault>



                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            p={1}
                            style={{ height: '4.5rem', position: "fixed", bottom:"0", width:"100%" }}
                        >
                            <Button
                                variant="contained"
                                style={{'width': '70%','backgroundColor': '#DAAB59' , color: '#403C3C', margin: '4px auto',padding: '8px 5px', fontSize: '17px', fontWeight: '700'}}
                                className={`${classes.button} capitalization`}
                                //onClick={() => history.push(paths.store_summary)}
                                onClick={async () => {
                                    await createBrand();
                                  /*const activeBranch = LocalInfo.branchId;
                                  const userAccess = JSON.parse(LocalInfo.userAccess);
                                  console.log(userAccess);
                                  const companyId = userAccess.access[0].id;
                                  const userId = userAccess.user.userId;
                                  await SyncService.sync(companyId, activeBranch, userId, database);
                                  console.log("DONE SYNCING");*/
                                }}
                            >
                                Start selling
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};


/*
* @todo why pass through database again?
* */
const EnhancedDashboard = withDatabase(
  withObservables([], ({ database }) => ({
    branchProducts: database.collections.get(BranchProduct.table).query(Q.where('branchId', localStorage.getItem('activeBranch'))).observe(),
    brands: database.collections.get(Brand.table).query().observe(),
    manufacturers: database.collections.get(Manufacturer.table).query().observe(),
    products: new ModelAction('Product' , database).index(),
    customers: database.collections.get(Customer.table).query().observe(),
    sales: database.collections.get(Sales.table).query().observe()
  }))(withRouter(Dashboard))
);

export default EnhancedDashboard;

