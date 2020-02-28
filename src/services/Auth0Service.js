import localInfo from './LocalInfo';
import Api from './Api';
import GenerateOTP from './GenerateString';
import SmsService from './SmsService';

export default class Auth0Service {
    /*constructor() {
        //this.auth0 = new auth0.WebAuth(auth0_config);
    }*/

    login = async (username , password) => {
        // username and password
        // try to login
        // if pass: save in localstorage
        // if fail: alert user
        const userData = {
            username: username,
            password: password,
            strategy: "local",
        };

        let user = await new Api('authentication').create(userData);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log(user);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

        if( user ){
            const response = user.data;
            localStorage.setItem('accessToken' , response.accessToken);
            localStorage.setItem('userDetails' , JSON.stringify(response.user));
            localStorage.setItem('username' , response.user.username);

            return {
                success: 200,
                user: response.user
            };
        }

        return {
            error: {
                msg: "Invalid login credentials",
                status: 401
            }

        };
    };

    register = async( data ) => {
        // check if user exists - core-api
        // user registers : username and password on AuthService -- done
        // create company on core-api - companies table -- done
        // create first company on core-api and associate to user -- done
        /*
        @var { username , firstName , otherNames, phone, password}
        @todo check if user exist
        */
        let user , company = 0;
        const userData = {
            username: data.username,
            firstName: data.firstName,
            otherNames: data.otherNames,
            phone: data.phone,
            password: data.password,
            otp: new GenerateOTP(4).generateNumber(),
        };
        user = await this.registerUser(userData);

        if( user ){
            console.log(user);
            const companyData = {
                name: data.companyName,
                userId: user.userId
            };

            company = await this.registerCompany(companyData);

            if( company ){
                //This will handle OTP...
                const response = await this.sendOTP(user.phone , user.otp);

                return {
                    user,
                    company,
                    response,
                }
            }

            /*
            * @todo handle error return functions...before sending errors
            * */
            return {
                error: {
                    msg: "Something went wrong with company creation",
                    status: 400
                }

            };
        }

        return {
            error: {
                msg: "Something went wrong with user creation",
                status: 400
            }

        };
    };

    registerUser = async ( data ) => {
        let res = await new Api('users').create(
            data
        );

        return res.data;
    };

    registerCompany = async ( data ) => {
        let res = await new Api('companies').create(
            data
        );

        return res.data;
    };

    sendOTP = (contact , token) => {
        const message = `Your code is: ${token}. Please enter it.`;

        return new SmsService(contact , message).sendSMS();
    };

    logout = () => {
        // clear local storage
        // call logout on auth0
    }
}