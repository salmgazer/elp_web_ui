const axios = require('axios');

const resources = require('./resources.json');


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

    async create(requestPath = this.constructor.basePath, data = {}) {
        return axios.post(requestPath, { data });
    }

    async update(requestPath = this.constructor.basePath, primaryKeyValue, data = {}) {
        return axios.put(`${requestPath}/${primaryKeyValue}`, { data });
    }

    async destroy(requestPath = this.constructor.basePath, primaryKeyValue) {
        const params = {};
        params[this.primaryKeyName] = primaryKeyValue;

        return axios.delete(requestPath, { params });
    }
}

new Api('others').show('https://elparah.store/onboarding/addProducts/store_type_products.php?q=4')
    .then((res) => {
        console.log(res);
    });
