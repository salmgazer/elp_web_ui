import constraints from "../utilities/validation/constraints";
const validate = require("validate.js");

export default class ValidationService {
    constructor(){
        this.rules = constraints;
    }

    validateOne(fieldName , value) {
        return validate.single(value , this.rules[fieldName]);
    }

    validatePassword(fieldName , values) {
        return validate.single(JSON.stringify(values) , this.rules[fieldName]);
    }
}
