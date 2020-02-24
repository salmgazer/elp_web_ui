import React from "react";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import LocalInfo from "../../services/LocalInfo";
import TextField from "@material-ui/core/TextField";
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import paths from "../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Container from "@material-ui/core/Container/Container";
import {makeStyles} from "@material-ui/core";

import Logo from '../../assets/img/el-parah.png';
import Typography from "@material-ui/core/Typography/Typography";
import './Login.scss';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
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

const apiUrl = "";

async function getUserStoreFromLocal(database, user, store) {
  return database.collections
    .get("users_stores")
    .query(Q.where("user_id", user.id), Q.where("store_id", store.id))
    .fetch();
}

async function getUserFromLocal(database, usernameOrPhone, password) {
  return database.collections
    .get("users")
    .query(
      Q.where("username", usernameOrPhone),
      Q.or(Q.where("phone", usernameOrPhone)),
      Q.where("password", password)
    )
    .fetch();
}

async function getStore(database) {
  return database.collections
    .get("stores")
    .query()
    .fetch();
}

async function getUsersFromLocal(database) {
  return database.collections
    .get("users")
    .query()
    .fetch();
}

const Login = props => {
    const classes = useStyles();

    const { history } = props;
    const database = useDatabase();

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    const login = async ({ usernameOrPhone, password }) => {
        if (password.length < 6 || usernameOrPhone.length === 0) {
          alert("Password or username/phone is incorrect");
          return;
        }

        history.push(paths.dashboard);

        // try to get store from local db
        /*let stores = await getStore(database);

        if (!stores || stores.length < 1) {
          //store is not on local db, get from api

          /!* @todo create an API access class *!/
          const storesResponse = await fetch(
            `${apiUrl}/stores?username_or_phone=${usernameOrPhone}`,
            {
              headers: { "Content-Type": "application/json" }
            }
          );
          const storesFromAPI = await storesResponse.json();
          stores = storesFromAPI.data;
        }

        if (stores && stores.length > 0) {
        } else {
          alert(`You are not associated to any store`);
          return;
        }*/
      };

    return (
    <div style={{backgroundColor: '#f2ece3', height: '100vh', padding: "4% 3%"}}>
      <Component
        initialState={{
          isShown: false,
          password: "",
          usernameOrPhone: ""
        }}
      >
        {({ state, setState }) => (
          <React.Fragment>
              <CssBaseline />

              <Container
                  maxWidth="sm"
                  style={{backgroundColor: '#f2ece3'}}
              >
                  <Box
                      className={classes.shadow2}
                      style={{'borderRadius': '10px'}}
                  >
                      <Box component="div" style={{paddingTop: '50px', marginTop: '32px'}}>
                          <img style={{width: '230px', height: '90px'}} className="img-responsive" src={Logo} alt={'Elparah Logo'}/>
                      </Box>
                      <Typography
                          variant="h6"
                          component="h6"
                          fontSize="1.25rem"
                          style={{marginBottom: '30px', paddingTop: '5px'}}
                      >
                          Mobile POS App
                      </Typography>

                      <Box component="div" className={classes.padding1} style={{width: '230px', paddingBottom: '40px' ,margin: '0 auto', color: '#403C3C'}}>
                          <div className={classes.margin} style={{'paddingBottom': '10px'}}>
                              <Grid container spacing={1} alignItems="flex-end" >
                                  <Grid item>
                                      <PhoneIcon />
                                  </Grid>
                                  <Grid item>
                                      <TextField
                                          onChange={event => setState({ usernameOrPhone: event.target.value })}
                                          id="usernameOrPhone" type='text' value={state.usernameOrPhone}
                                          label="username/contact"
                                          helperText=""
                                      />
                                  </Grid>
                              </Grid>
                          </div>

                          <div className={classes.margin} className={classes.padding1}>
                              <Grid container spacing={1} alignItems="flex-end">
                                  <Grid item>
                                      <LockIcon />
                                  </Grid>
                                  <Grid item>
                                      <TextField
                                          id="password"
                                          onChange={event => setState({ password: event.target.value })}
                                          type={state.isShown ? 'text' : 'password'}
                                          label="password"
                                          helperText=""
                                      />
                                  </Grid>
                              </Grid>
                          </div>

                          <Button
                              variant="contained"
                              style={{'width': '100%','backgroundColor': '#DAAB59' , marginBottom: '30px',color: '#403C3C', padding: '5px 40px', fontSize: '17px', fontWeight: '700'}}
                              className={classes.button} className="capitalization"
                              onClick={() => login(state)}
                          >
                              Login
                          </Button>

                          <a  href="#" style={{'marginTop': '20px', color: '#403C3C', fontSize: '14px'}}><i>Help! I forgot my password</i> </a> <br/> or

                          <Button
                              variant="contained"
                              style={{'width': '100%','backgroundColor': '#DAAB59' , color: '#403C3C', margin: '10px auto',padding: '5px 1px', fontSize: '17px', fontWeight: '700'}}
                              className={classes.button} className="capitalization"
                              onClick={() => history.push(paths.register)}
                          >
                              Create new account
                          </Button>
                      </Box>
                  </Box>
              </Container>
          </React.Fragment>
        )}
      </Component>
    </div>
    );
};

export default withRouter(Login);
