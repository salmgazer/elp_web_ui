import axios from 'axios';
const resources = require('./resources.json');
const apis = require('../config/apis.json');
const env = require('../config/environments.json');

export default class Api {
    constructor(resourceName) {
        //console.log(resources);
        const resourceConfig = resources[resourceName];
        const { resource, primaryKeyName, parentResources } = resourceConfig;
        this.resource = resource;
        //console.log(this.resource);
        this.primaryKeyName = primaryKeyName;
        this.parentResources = parentResources || [];

        // get env
        this.environment = env.NODE_ENV;
        this.apiConfig = apis["elp-core-api"][this.environment]['v1'];
    }

    /*
    * @todo
    * remove querystring package...
    * */
    fullUrl(parentParams = {}) {
      // companies/{company_id}/branches/{branch_id}/products
        const {protocol, basePath, prefix } = this.apiConfig;
        let fullPath = `${protocol}://${basePath}/v1/${prefix}`;

        this.parentResources.forEach(parentResource => {
            fullPath = `${fullPath}/${parentResource}/${parentParams[parentResource]}`;
        });

        return fullPath;
    }

    static get headers() {
      const envHeaders = env.headers;
        return Object.assign(envHeaders,{
            "Content-Type" : "application/json",
            "Accept" : "application/json",
        });
    }

    static apiDomain() {
      return apis["elp-core-api"][env.NODE_ENV].v1.basePath;
    }

    async index(parentResources = {} , config = {}, requestPath = `${this.fullUrl(parentResources)}/${this.resource}`, name = "",  queryParams= {}) {
        return axios.get(requestPath, {
            headers: {...this.constructor.headers, ...config},
            onDownloadProgress: function (progressEvent) {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

                localStorage.setItem('currentRequestName' , name);
                localStorage.setItem('currentRequestProgress' , percentCompleted);
            },
        });
    }

    async show(requestPath = `${this.fullUrl(parentResources)}/${this.resource}`, primaryKeyValue, parentResources = {}) {
        const params = {};
        params[this.primaryKeyName] = primaryKeyValue;
        return axios.get(requestPath, { params });
    }

    async getUserByPhone(phone , requestPath = `${this.fullUrl(parentResources)}/${this.resource}` , parentResources = {}) {
        const params = {phone , $limit:1};
        const result = await axios.get(requestPath, { params });

        return result.data.data[0];
    }

    async create(data = {} , config = {} , parentResources = {}, requestPath = `${this.fullUrl(parentResources)}/${this.resource}` , name = "") {
        return axios.post(
            requestPath,
            data  ,
            {
                headers: {...this.constructor.headers, ...config},
                onUploadProgress: function (progressEvent) {
                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

                    localStorage.setItem('currentRequestName' , name);
                    localStorage.setItem('currentRequestProgress' , percentCompleted);
                },
            }
        );
    }

    async options(config = {} , requestPath = `${this.fullUrl(parentResources)}/${this.resource}` , parentResources = {}) {
        console.log(requestPath);
        console.log(config);
        return axios.options(requestPath,  config);
    }


    async update(data = {} , config = {} , parentResources = {}, requestPath = `${this.fullUrl(parentResources)}/${this.resource}`) {
        return axios.put(
            requestPath,
            data  ,
            {
                headers: {...this.constructor.headers, ...config}
            }
        );
    }

    async destroy(config = {} , parentResources = {}, requestPath = `${this.fullUrl(parentResources)}/${this.resource}` , primaryKeyValue = null) {
        return axios.delete(
            requestPath,
            {
                headers: {...this.constructor.headers, ...config}
            }
        );
    }
    /*async destroy(requestPath = `${this.fullUrl(parentResources)}/${this.resource}`, primaryKeyValue , parentResources = {}) {
        const params = {};
        params[this.primaryKeyName] = primaryKeyValue;

        return axios.delete(requestPath, { params });
    }*/
}
