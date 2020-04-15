const axios = require('axios');
const config = require('../config');
const GBLError = require('../error');

module.exports = async function (serverCount, shardCount, logs, id, authorization) {
    return axios({
        method: 'post',
        url: `https://${config.domain}${config.endpoints.update_stats.replace(':id', `${id}`)}`,
        headers: {
            'Content-Type': 'application/json',
            'authorization': authorization
        },
        data: {
            'serverCount': serverCount,
            'shardCount': shardCount,
        }
    }).then(async p => {
        return await p.data;
    }).catch(err => {
        if (err.response.status !== 200) switch (err.response.status) {
            case 400:
                throw new GBLError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: 'Bad Request'
                });
            case 401:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Unauthorized"
                });

            case 403:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Bad Request"
                });

            case 404:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Not Found"
                });

            case 500:
            case 502:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Server Error"
                });

            default:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Unknown"
                });
        }
    });
};