import axios from 'axios';
const resources = require('./resources.json');

export default class Api {
    constructor(resourceName) {
        //console.log(resources);
        const resourceConfig = resources[resourceName];
        const { resource, primaryKeyName, parentResources } = resourceConfig;
        this.resource = resource;
        //console.log(this.resource);
        this.primaryKeyName = primaryKeyName;
        this.parentResources = parentResources;
    }

    /* @todo put base url here when new api is ready */
    static get basePath() {
        return 'http://elpfakeapi-env.unhavpij3f.us-east-2.elasticbeanstalk.com';
    }

    get constructUrl(params) {
      // companies/{company_id}/branches/{branch_id}/products
      let fullPath = '';
      this.parentResources.forEach(parentResource => {
        fullPath = `${fullPath}/${parentResource}/${params[parentResource]}`;
      });
    }

    async index(requestPath = `${this.constructor.basePath}/${this.resource}`, queryParams= {}, params={}) {
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

    async getUserByPhone(phone , requestPath = `${this.constructor.basePath}/${this.resource}`) {
        const params = {phone , $limit:1};
        const result = await axios.get(requestPath, { params });

        return result.data.data[0];
    }

    async create(data = {} , config = {} , requestPath = `${this.constructor.basePath}/${this.resource}`) {
        console.log(requestPath);
        console.log(data);
        return axios.post(requestPath,  data  , config);
    }

    async options(config = {} , requestPath = `${this.constructor.basePath}/${this.resource}`) {
        console.log(requestPath);
        console.log(config);
        return axios.options(requestPath,  config);
    }

    async update(data = {} , primaryKeyValue, requestPath = `${this.constructor.basePath}/${this.resource}`) {
        return axios.put(`${requestPath}/${primaryKeyValue}`, data );
    }

    async destroy(requestPath = `${this.constructor.basePath}/${this.resource}`, primaryKeyValue) {
        const params = {};
        params[this.primaryKeyName] = primaryKeyValue;

        return axios.delete(requestPath, { params });
    }
}
