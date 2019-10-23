const EventEmitter = require('eventemitter3');
const phin = require('phin');
const GBLAPIError = require('./GBLAPIError');

class GBLAPI extends EventEmitter {
    /**
     * Main Class
     * @param {string} id Client ID
     * @param {string} token GlennBotList Client Token
     * @param {object} options Client Options
     */
    constructor(id, token, options) {
        if (!id) throw new TypeError("Missing Client ID");
        if (!token) throw new TypeError("Missing Token");
        if (!options) options = {};

        super();

        this._id = id;
        this._token = token;
        this._options = options;
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    get options() {
        return this._options;
    }

    /**
     * Post server count
     * @param {number} serverCount The number of servers your bot is in
     * @param {number} shardCount The number of shards your bot has
     * @param {string} [id] The ID to post the stats to, if changed
     * @param {token} [auth] The token used to post the stats, if needed
     * @returns {Promis<{ message: string, success: boolean }>}
     */
    async updateStats(serverCount = 0, shardCount = 0, id = this.id, auth = this.token) {
        console.log(`[GlennBotList] Posting Stats...`);
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
                    break;
				case 401:
                    throw new GBLAPIError({
                        statusCode: p.statusCode,
                        body: p.body,
                        type: "Unauthorized"
                    });
                    break;
				case 403:
                    throw new GBLAPIError({
                        statusCode: p.statusCode,
                        body: p.body,
                        type: "Bad Request"
                    });
				    break;
				case 404:
                    throw new GBLAPIError({
                        statusCode: p.statusCode,
                        body: p.body,
                        type: "Not Found"
                    });
                    break;
				case 500:
				case 502:
					throw new GBLAPIError({
						statusCode: p.statusCode,
						body: p.body,
						type: "Server Error"
					});
					break;
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
}

module.exports = GBLAPI;

/**
 * @prop {string} token The current API token
 * @prop {object} options The options for the current instance
 */