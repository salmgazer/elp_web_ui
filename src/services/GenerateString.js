/*
* Class to generate characters
* @var {length}
*
* */

export default class generateString {
    constructor(length){
        this.charLength = length;
        this.results = '';
    }

    /*
    * function to generate numbers
    *
    * */
    generateNumber = () => {
        const characters = '0123456789';

        for(let i=1; i<= this.charLength; i++){
            let index = Math.floor(Math.random()*(characters.length));

            this.results = this.results + characters[index];
        }

        return this.results;
    };
}