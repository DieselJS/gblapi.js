const phin = require('phin');
const GBLAPIError = require('./GBLAPIError');

module.exports = async function (uid, id) {
    return phin({
        url: `https://glennbotlist.xyz/api/bot/${id}`,
        parse: "json"
    }).then((b) => {
        if (b.statusCode !== 200) switch (b.statusCode) {
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
                    statusCode: b.statusCode,
                    body: b.body,
                    type: "Unkown"
                });
        }
        let voted = b.body.votes.map(i => i.id == uid);
        if (voted) { return true } else { return false }
    }).catch(err => { throw err; });
}