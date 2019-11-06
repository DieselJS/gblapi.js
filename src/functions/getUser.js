const phin = require('phin');
const GBLAPIError = require('./GBLAPIError');

module.exports = async function (id) {
    return phin({
        url: `https://glennbotlist.xyz/api/profiles/${id}`,
        parse: "json"
    }).then((b) => {
        if (b.statusCode !== 200) switch (b.statusCode) {
            case 400:
                throw new GBLAPIError({
                    statusCode: b.statusCode,
                    body: b.body,
                    type: "Bad Request"
                });
            case 401:
                throw new GBLAPIError({
                    statusCode: b.statusCode,
                    body: b.body,
                    type: "Unauthorized"
                });
            case 403:
                throw new GBLAPIError({
                    statusCode: b.statusCode,
                    body: b.body,
                    type: "Bad Request"
                });
            case 404:
                throw new GBLAPIError({
                    statusCode: b.statusCode,
                    body: b.body,
                    type: "Not Found"
                });
            case 500:
            case 502:
                throw new GBLAPIError({
                    statusCode: b.statusCode,
                    body: b.body,
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
            username: b.body.username || "Unknown",
            discriminator: b.body.discriminator || "0000",
            avatar: b.body.avatar,
            background: b.body.background || null,
            bio: b.body.bio,
            isVerified: b.body.verified || false,
            isMod: b.body.mod || false,
            isAdmin: b.body.admin || false,
            karma: b.body.karma || 0,
            totalKarma: b.body.totalKarma || 0,
        }
    }).catch(err => { throw err; });
}