const EventEmitter = require('eventemitter3');
const phin = require('phin');
const GBLAPIError = require('./GBLAPIError');
const util = require('util');

class GBLAPI extends EventEmitter {
    /**
     * Main Class
     * @param {string} id Client ID
     * @param {string} token GlennBotList Client Token
     * @param {boolean} logs Automatic logs?
     * @param {object} options Client Options
     */
    constructor(id, token, logs, options) {
        if (!id) throw new TypeError("Missing Client ID");
        if (!token) throw new TypeError("Missing Token");
        if (logs !== false && logs !== true) throw new TypeError("Logs is neither true or false");
        if (!options) options = {};

        super();

        this._id = id;
        this._token = token;
        this._logging = logs;
        this._options = options || {};

        // if (this._options.webhookPort || this._options.webhookServer) {
        //     const GBLWebhook = require('./webhook');
        //     this.webhook = new GBLWebhook(this._options.webhookPort, this._options.webhookPath, this._options.webhookAuth, this._options.webhookServer);
        // }
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    get logging() {
        return !!this._logging;
    }

    get options() {
        return this._options;
    }

    /**
     * Get bot stats
     * @param {string} [id] The ID of the bot to gain stats from.
     * @returns {Promise<{}>}
     */
    async getBot(id = this.id) {
        if (!id) throw new TypeError("Missing Bot ID");
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

    /**
     * Get user stats
     * @param {string} [id] The ID of the user to gain stats from.
     * @returns {Promise<{}>}
     */
    async getUser(id = this.id) {
        if (!id) throw new TypeError("Missing User ID");
        return phin({
            url: `https://glennbotlist.xyz/api/profiles/${id}`,
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

    /**
     * Get votes of a bot
     * @param {string} [id] The ID of the bot to gain votes from.
     * @param {token} [auth] The token used to gain the votes, if needed. The token used in the constructor will most likely work.
     * @returns {Promise<{}>}
     */
    async getVotes(id = this.id, auth = this.token) {
        return console.log("[GlennBotList](Client#getVotes) This function has not been completed, therefor it has been disabled.")
        // if (!id) throw new TypeError("Missing Bot ID");
        // if (!auth) throw new TypeError("Missing Authentication Token");
        // return phin({
        //     method: "GET",
        //     url: `https://glennbotlist.xyz/api/upvotes/bot/${id}`,
        //     parse: "json",
        //     data: {
        //         auth
        //     },
        //     headers: {
        //         "Content-Type": 'application/json'
        //     },
        // }).then((b) => {
        //     if (b.statusCode !== 200) switch (b.statusCode) {
        // 		case 400:
        //             throw new GBLAPIError({
        //                 statusCode: p.statusCode,
        //                 body: p.body,
        //                 type: "Bad Request"
        //             });
        //             
        // 		case 401:
        //             throw new GBLAPIError({
        //                 statusCode: p.statusCode,
        //                 body: p.body,
        //                 type: "Unauthorized"
        //             });
        //             
        // 		case 403:
        //             throw new GBLAPIError({
        //                 statusCode: p.statusCode,
        //                 body: p.body,
        //                 type: "Bad Request"
        //             });
        // 		    
        // 		case 404:
        //             throw new GBLAPIError({
        //                 statusCode: p.statusCode,
        //                 body: p.body,
        //                 type: "Not Found"
        //             });
        //             
        // 		case 500:
        // 		case 502:
        // 			throw new GBLAPIError({
        // 				statusCode: p.statusCode,
        // 				body: p.body,
        // 				type: "Server Error"
        // 			});
        // 			
        // 		default:
        // 			throw new GBLAPIError({
        // 				statusCode: b.statusCode,
        // 				body: b.body,
        // 				type: "Unkown"
        // 			});
        //     }
        //     return {
        //         id: b.body.id || id,
        //         upvotes: b.body.upvotes || null,
        //         total_votes: b.body.totalUpvotes || 0
        //     }
        // }).catch(err => { throw err; });
    }

    /**
     * Post server count
     * @param {number} serverCount The number of servers your bot is in
     * @param {number} shardCount The number of shards your bot has
     * @param {string} [id] The ID to post the stats to, if changed
     * @param {token} [auth] The token used to post the stats, if needed
     * @returns {Promise<{ message: string, success: boolean }>}
     */
    async updateStats(serverCount = 0, shardCount = 0, id = this.id, auth = this.token) {
        if (this._logging === true) {
            console.log(`[GlennBotList] Posting Stats...`);
        }
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

    /**
     * If user has voted
     * @param {string} [uid] The ID of the user to see if they voted.
     * @param {string} [id] The ID of the bot to gain stats from.
     * @returns {Boolean}
     * @example
     * Glenn.hasVoted('414713250832449536')
     *   .then(d => {
     *     if (d) console.log("User has voted!")
     *     else console.log("User has not voted.")
     *   }).catch(console.error);
     */
    async hasVoted(uid, id = this.id) {
        if (!uid) throw new TypeError("Missing User ID");
        if (!id) {
            if (!this._id) throw new TypeError("Missing Bot ID");
        }
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
}

GBLAPI.prototype.getBotVotes = util.deprecate(GBLAPI.prototype.getBotVotes, 'GBL#getBotVotes: use GBL#hasVoted instead');

module.exports = GBLAPI;

/**
 * @prop {string} token The current API token
 * @prop {object} options The options for the current instance
 */