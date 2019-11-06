const GBLAPIError = require('./GBLAPIError');

module.exports = async function (id, auth) {
    return phin({
        method: "GET",
        url: `https://glennbotlist.xyz/api/upvotes/bot/${id}`,
        parse: "json",
        data: {
            auth
        },
        headers: {
            "Content-Type": 'application/json'
        },
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
        return {
            id: b.body.id || id,
            upvotes: b.body.upvotes || null,
            total_votes: b.body.totalUpvotes || 0
        }
    }).catch(err => { throw err; });
}