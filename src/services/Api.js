const axios = require('axios');

const resources = require('./resources.json');


class Api {
    constructor(resourceName) {
        //console.log(resources);
        const resourceConfig = resources[resourceName];
        const { resource, primaryKeyName } = resourceConfig;
        this.resource = resource;
        //console.log(this.resource);
        this.primaryKeyName = primaryKeyName;
    }

    /* @todo put base url here when new api is ready */
    static get basePath() {
        return 'http://elpfakeapi-env.unhavpij3f.us-east-2.elasticbeanstalk.com';
    }

    async index(requestPath = `${this.constructor.basePath}/${this.resource}`, queryParams= {}) {
        console.log(requestPath);
        return axios.get(requestPath, {
            params: queryParams
        });
    }

    async show(requestPath = `${this.constructor.basePath}/${this.resource}`, primaryKeyValue) {
        const params = {};
        params[this.primaryKeyName] = primaryKeyValue;
        return axios.get(requestPath, { params });
    }

    async create(requestPath = `${this.constructor.basePath}/${this.resource}`, data = {}) {
        console.log(requestPath);
        console.log(data);
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

new Api('brands').create('http://elpfakeapi-env.unhavpij3f.us-east-2.elasticbeanstalk.com/brands' , {
    "name": "Testers"
})
    .then((res) => {
        console.log(res);
    });
