const phin = require('phin');
const GBLAPIError = require('./GBLAPIError');

module.exports = async function (serverCount, shardCount, id, auth) {
    let authorization = auth;
    return phin({
        method: "POST",
        url: `https://glennbotlist.xyz/api/stats/bot/${id}`,
        data: {
            serverCount,
            shardCount,
            authorization
        },
        headers: {
            "Content-Type": 'application/json'
        },
        parse: "json"
    }).then((p) => {
        if (p.statusCode !== 200) switch (p.statusCode) {
            case 400:
                throw new GBLAPIError({
                    statusCode: p.statusCode,
                    body: p.body,
                    type: "Bad Request"
                });

            case 401:
                throw new GBLAPIError({
                    statusCode: p.statusCode,
                    body: p.body,
                    type: "Unauthorized"
                });

            case 403:
                throw new GBLAPIError({
                    statusCode: p.statusCode,
                    body: p.body,
                    type: "Bad Request"
                });

            case 404:
                throw new GBLAPIError({
                    statusCode: p.statusCode,
                    body: p.body,
                    type: "Not Found"
                });

            case 500:
            case 502:
                throw new GBLAPIError({
                    statusCode: p.statusCode,
                    body: p.body,
                    type: "Server Error"
                });

            default:
                throw new GBLAPIError({
                    statusCode: p.statusCode,
                    body: p.body,
                    type: "Unkown"
                });
        }
        return {
            message: p.body.message || "Successful request.",
            success: p.statusCode === 200
        };
    }).catch(err => {
        throw err;
    });
}