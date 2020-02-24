import auth0_config from '../auth_config';
import auth0 from 'auth0-js';
import localInfo from './LocalInfo';


export default class Auth0Service {
    constructor() {
        this.auth0 = new auth0.WebAuth(auth0_config);
    }


    login(username, password) {
        this.auth0.client.login({
            username,
            password,
            realm: 'Username-Password-Authentication',
            audience: 'elp-core-api'
        })
        // username and password
        // try to login
        // if pass: save in localstorage
        // if fail: alert user
    }

    register() {
        // check if user exists - core-api
        // user registers : username and password on AuthService
        // create company on core-api - companies table
        // create core-api user and associate with auth0 user
        // create first branch on core-api and associate to store
    }

    logout() {
        // clear local storage
        // call logout on auth0
    }
}