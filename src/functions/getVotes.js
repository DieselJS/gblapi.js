const axios = require('axios');
const GBLAPIError = require('./GBLAPIError');

module.exports = async function (id, authorization) {
    return axios({
        url: `https://glennbotlist.xyz/api/v2/bot/${id}/votes`,
        headers: {
            'Content-Type': 'application/json',
            'authorization': authorization
        },
    }).then(async p => {
        console.log(p)
        return await p.data.votes.map(i => i);
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
                    type: "Unkown"
                });
        }
    })

}