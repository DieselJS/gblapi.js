const phin = require('phin');
const GBLAPIError = require('./GBLAPIError');

module.exports = async function (id) {
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
        return {
            id: b.body.id || id,
            name: b.body.name || "Unknown",
            owner: b.body.owner,
            owners: b.body.owners,
            library: b.body.library,
            monthly_upvotes: b.body.monthlyUpvotes || 0,
            all_time_upvotes: b.body.allTimeUpvotes || 0,
            website: b.body.website || "None",
            github: b.body.githubUrl || "None",
            short_desc: b.body.shortDesc,
            support_server: b.body.supportServerInvite || "",
            prefix: b.body.prefix,
            verified: b.body.verified || false,
            trusted: b.body.trusted || false,
            vanity_url: b.body.vanityUrl || "",
            featured: b.body.featured || false,
            invite: b.body.inviteUrl || `https://discordapp.com/oauth2/authorize?client_id=${b.body.id || id}&scope=bot`,
            server_count: b.body.serverCount || 0,
            shard_count: b.body.shardCount || 0,
            tags: b.body.tags,
            votes: b.body.votes,
            rates: b.body.rates
        }
    }).catch(err => { throw err; });
}