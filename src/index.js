const EventEmitter = require('eventemitter3');
const { getBot, getUser, getVotes, updateStats, hasVoted } = require('./functions');

class GBLAPI extends EventEmitter {
    /**
     * Main Class
     * @param {String} id Client ID
     * @param {String} token GlennBotList Client Token
     * @param {Boolean} logs Automatic Logging
     * @param {Object} options Client Options
     */
    constructor(id, token, logs, options) {
        if (!id) throw new TypeError('Missing Client ID');
        if (!token) throw new TypeError('Missing GBL Token');
        if (!logs) throw new TypeError('Logs boolean is not set');
        if (options) {
            if (options.webhookAuth || !options == false || !options) {
                if (options.webhookAuth) {
                    options = options;
                }
                logs = true;
            }
        }
        super();
        this._id = id;
        this._token = token;
        this._logs = logs;
        this._options = options;
        if (options) {
            if (!options.webhookPort) options.webhookPort = 3001;
            if (!options.webhookPath) options.webhookPath = '/GBLWebhook';
            if (options.webhookAuth) {
                const GBLWebhook = require('./webhook');
                this.webhook = new GBLWebhook(options.webhookPort, options.webhookPath, options.webhookAuth);
            } else {
                throw new TypeError('You must provide GBL Authentication.');
            }
        }
    }

    get version() {
        return require('../package.json').version;
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    get logs() {
        return !!this._logs;
    }

    get options() {
        return this._options;
    }
}

module.exports = GBLAPI;

/**
 * @property {String} token GBL API Token
 * @property {Object} options Current options
 */