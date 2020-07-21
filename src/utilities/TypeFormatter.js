export default class TypeFormatter {
    constructor(type){
        this.type = type;
    }

    dataType(value) {
        switch (this.type) {
            case 'number':
                return new Intl.NumberFormat().format(parseFloat(value));
            case 'currency':
                console.log(parseFloat(value).toFixed(2))
                return new Intl.NumberFormat().format(parseFloat(value).toFixed(2));
            case 'string':
                return JSON.stringify(value);
            default:
                return false;
        }
    }
}
