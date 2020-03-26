import React , {useState , useRef}  from "react";
import { withRouter , Link } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import LocalInfo from "../../services/LocalInfo";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import paths from "../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Container from "@material-ui/core/Container/Container";
import {makeStyles, withStyles} from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Logo from '../../assets/img/el-parah.png';
import Typography from "@material-ui/core/Typography/Typography";
import './Login.scss';
import AuthService from "../../services/AuthService";
import InputAdornment from '@material-ui/core/InputAdornment';
import PrimaryLoader from "../Components/Loader/Loader";
import SimpleSnackbar from "../Components/Snackbar/SimpleSnackbar";
import SyncService from "../../services/SyncService";

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

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            borderColor: '#DAAB59',
            padding: '4px !important', // override inline-style
        },
    },
})(TextValidator);

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
    const loginForm = useRef(null);
    const [loading , setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { history } = props;
    const database = useDatabase();

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    const login = async ({ usernameOrPhone, password }) => {
        if (password.length < 2 || usernameOrPhone.length === 0) {
          alert("Password or username/phone is incorrect");
          return;
        }

        //Start loader and disable button
        setLoading(true);

        //Make a request to get token
        let req = await new AuthService().login(usernameOrPhone , password);

        if(!req.error){
            /*
            * @todo
            * push user details to watermelon...
            * */
            history.push(paths.dashboard)
        }else{
            document.getElementById("loginForm").reset();
            setLoading(false);
            await setErrorDialog(true);
            await setErrorMsg(req.error.msg);

            const activeBranch = LocalInfo.branchId;
            const userAccess = JSON.parse(LocalInfo.userAccess);
            console.log(userAccess);
            const companyId = userAccess.access[0].id;
            const userId = userAccess.user.userId;
            await SyncService.sync(companyId, activeBranch, userId, database);
            console.log("DONE SYNCING");

            return setTimeout(function(){
                setErrorDialog(false);
            }, 3000);
        }

        //history.push(paths.dashboard);

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
                      style={{backgroundColor: '#f2ece3', padding: '3% 3%'}}
                  >
                      <SimpleSnackbar
                          type="warning"
                          openState={errorDialog}
                          message={errorMsg}
                      />

                      <Box
                          className={`${classes.shadow2} login`}
                          style={{'borderRadius': '10px'}}
                      >
                          <Box component="div" style={{paddingTop: '50px', marginTop: '0px'}}>
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
                              <ValidatorForm
                                  ref={loginForm}
                                  id = "loginForm"
                                  onSubmit={ async () => {
                                           await login(state)
                                           .then(async function(){
                                               if(loginForm.current === null){

                                               }else{
                                                   await setState({
                                                       isShown: false,
                                                       password: "",
                                                       usernameOrPhone: ""
                                                   });
                                                   loginForm.current.resetValidations();
                                               }
                                           });
                                      }
                                  }
                                  onError={errors => console.log(errors)}
                              >

                                  <div className={classes.margin} style={{'paddingBottom': '10px'}}>
                                      <Grid container spacing={1} alignItems="flex-end" >
                                          <Grid item>
                                              <ValidationTextField
                                                  onChange={event => setState({ usernameOrPhone: event.target.value })}
                                                  id="usernameOrPhone"
                                                  type='text'
                                                  value={state.usernameOrPhone}
                                                  label="username/contact"
                                                  name="usernameOrPhone"
                                                  validators={['required', 'minStringLength:4']}
                                                  errorMessages={['Username is a required field', 'The minimum length for username is 4']}
                                                  helperText=""
                                                  InputProps={{
                                                      startAdornment:
                                                          <InputAdornment position="start">
                                                              <AccountCircleIcon />
                                                          </InputAdornment>
                                                  }}
                                              />
                                          </Grid>
                                      </Grid>
                                  </div>

                                  <div className={`${classes.margin} ${classes.padding1}`}>
                                      <Grid container spacing={1} alignItems="flex-end">
                                          <Grid item>
                                              <ValidationTextField
                                                  id="password"
                                                  onChange={event => setState({ password: event.target.value })}
                                                  type={state.isShown ? 'text' : 'password'}
                                                  value={state.password}
                                                  validators={['required', 'minStringLength:2']}
                                                  errorMessages={['Password is a required field', 'The minimum length for password is 6']}
                                                  name="password"
                                                  label="password"
                                                  helperText=""
                                                  InputProps={{
                                                      startAdornment:
                                                          <InputAdornment position="start">
                                                              <LockIcon />
                                                          </InputAdornment>
                                                  }}
                                              />
                                          </Grid>
                                      </Grid>
                                  </div>

                                  <Button
                                      variant="contained"
                                      style={{'width': '100%','backgroundColor': '#DAAB59' , marginBottom: '30px',color: '#403C3C', padding: '5px 40px', fontSize: '17px', fontWeight: '700'}}
                                      className={`${classes.button} capitalization primaryButton`}
                                      type="submit"
                                      disabled={loading}
                                  >
                                      {
                                          loading ?
                                              <PrimaryLoader
                                                  style={{width: '30px' , height: '30px'}}
                                                  color="#FFFFFF"
                                                  type="Oval"
                                                  className={`mt-1`}
                                                  width={25}
                                                  height={25}
                                              />
                                                    :
                                              'Login'
                                      }
                                  </Button>
                              </ValidatorForm>

                              <Link to={paths.forgot_password} style={{textDecorationColor: '#333333'}}>
                                <span  style={{'marginTop': '20px', color: '#403C3C', fontSize: '14px'}}><i>Help! I forgot my password</i> </span> <br/>
                              </Link>
                              or
                              <Button
                                  variant="contained"
                                  style={{'width': '100%','backgroundColor': '#DAAB59' , color: '#403C3C', margin: '10px auto 30px',padding: '5px 1px', fontSize: '17px', fontWeight: '700'}}
                                  className={`${classes.button} capitalization`}
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
