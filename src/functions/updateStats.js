const axios = require('axios');
const GBLAPIError = require('./GBLAPIError');

module.exports = async function (serverCount, shardCount, id, authorization) {

    return axios({
        method: "post",
        url: `https://glennbotlist.xyz/api/v2/bot/${id}/stats`,
        headers: {
            'Content-Type': 'application/json',
            'authorization': authorization
        },
        data: {
            'serverCount': serverCount,
            'shardCount': shardCount,
        }
    }).then(p => {
        return {
            message: p.data.message || "Successful request.",
            success: p.status === 200
        };
    }).catch(err => {
        if (err.response.status !== 200) switch (err.response.status) {
            case 400:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Bad Request"
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
                return axios({
                    method: "post",
                    url: `https://api.glennbotlist.xyz/bot/${id}/stats`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    },
                    data: {
                        'serverCount': serverCount,
                        'shardCount': shardCount,
                    }
                }).then(p => {
                    return {
                        message: p.data.message || "Successful request.",
                        success: p.status === 200
                    };
                }).catch(err => {
                    if (err.response.status !== 200) switch (err.response.status) {
                        case 400:
                            throw new GBLAPIError({
                                statusCode: err.response.status,
                                body: err.body,
                                type: "Bad Request"
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
            default:
                throw new GBLAPIError({
                    statusCode: err.response.status,
                    body: err.body,
                    type: "Unknown"
                });
        }
    });
}