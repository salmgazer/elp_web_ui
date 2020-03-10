import localInfo from './LocalInfo';
import Api from './Api';
import GenerateOTP from './GenerateString';
import SmsService from './SmsService';

export default class AuthService {
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
        let user , company , branch = '';
        const params = {
            user: {
                "password": data.password,
                "firstName": data.firstName,
                "otherNames": data.otherNames,
                "phone": data.phone,
                "username": data.username,
                "whatsAppPhone": data.phone,
                "otp": new GenerateOTP(4).generateNumber(),
            },
            company: {
                "name": data.companyName,
                "businessCategoryId": data.storeCategory,
            },
            branch: {
                "name": data.companyName,
                "startDate": "",
                "location": data.companyName,
                "gps": "",
                "logo": "",
                "phone": data.phone,
                "whatsAppPhone": data.phone,
                "type": data.storeType,
            },
        };
        user = await new Api('others').create(
            params,
            {},
            'https://elp-core-api-staging.herokuapp.com/v1/client/users/register'
        );

        if( user ){
            console.log(user);
            const response = await this.sendOTP(user.phone , user.otp);

            return {
                user,
                response,
            };
            /*const companyData = {
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
            }*/
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