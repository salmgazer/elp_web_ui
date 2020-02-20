import axios from 'axios';

export default axios.create({
    baseURL: `https://elparah.store`
});



class Api {
    static get basePath() {
        return "";
    }


    index(basePath = this.constructor.basePath, queryParams={})
}