const EventEmitter = require('eventemitter3');
const util = require('util');
const getBot = require('./functions/getBot');
const getUser = require('./functions/getUser');
const updateStats = require('./functions/updateStats');
const hasVoted = require('./functions/hasVoted');
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
        this._logging = logs || true;
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
        getBot(id);
    }

    /**
     * Get user stats
     * @param {string} [id] The ID of the user to gain stats from.
     * @returns {Promise<{}>}
     */
    async getUser(id = this.id) {
        if (!id) throw new TypeError("Missing User ID");
        getUser(id);
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
        updateStats(serverCount, shardCount, id, auth);
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
        hasVoted(uid, id)
    }
}

module.exports = GBLAPI;

/**
 * @prop {string} token The current API token
 * @prop {object} options The options for the current instance
 */