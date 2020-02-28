import Api from './Api';
import SMSconfig from '../config/SMS.json';

/*const Api = require('./Api.js');
const SMSconfig = require('../config/SMS.json');*/

export default class SmsService{
    constructor(contact , message){
        const { accountId , senderMask , id , apiToken} = SMSconfig;
        this.id = id;
        this.sender_mask = senderMask;
        this.contact = `233${contact}`;
        this.message = message;
        this.token = apiToken;
        this.url = `https://konnect.kirusa.com/api/v1/Accounts/${accountId}/Messages`
    }

    sendSMS = async() => {
        const requestFields = {
            id : this.id,
            to : [this.contact],
            body : this.message,
            sender_mask : this.sender_mask,
        };

        const headers =  {
            "Authorization" : this.token,
            "Content-Type" : "application/json"
        };

        new Api('others').create(requestFields, {
            headers: {
                ...headers
            },
        },
        this.url
        );
        //console.log(contact , message);
    };
}


