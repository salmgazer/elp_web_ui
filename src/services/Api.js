const axios = require('axios');

const resources = require('resources.json');


class Api {
    /* @todo put base url here when new api is ready */
    static get basePath() {
        return "";
    }

    constructor(resourceName) {
        const resourceConfig = resources[resourceName];
        const { resource, primaryKeyName } = resourceConfig;
        this.resource = resource;
        this.primaryKeyName = primaryKeyName;
    }

    async index(requestPath = this.constructor.basePath, queryParams= {}) {
        return axios.get(requestPath, {
            params: queryParams
        });
    }


    async show(requestPath = this.constructor.basePath, primaryKeyValue) {
        const params = {};
        params[this.primaryKeyName] = primaryKeyValue;
        return axios.get(requestPath, { params });
    }
}

new Api('others').index('https://elparah.store/onboarding/addProducts/getProductsType.php?q=4')
    .then((res) => {
        console.log(res);
    });
