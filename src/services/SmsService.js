import SMSconfig from '../config/SMS.json';
import axios from "axios";


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
        const contact = (this.contact).replace(/-/g , "");
        const params = {
            id : this.id,
            to : [contact],
            body : this.message,
            sender_mask : this.sender_mask,
        };

        const headers =  {
            "Authorization" : this.token,
        };
        return axios.post(
            this.url,
            params  ,
            {
                headers: {
                    'Authorization' : this.token,
                }
            }
        );
    };
}


