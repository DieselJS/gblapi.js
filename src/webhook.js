const express = require('express');
const EventEmitter = require('eventemitter3');
const http = require('http');

class GBLWebhook extends EventEmitter {
    /**
     * Wehook Class
     * @param {String} webhookPort Port for webhook server
     * @param {String} webhookPath Path for webhook URL
     * @param {String} webhookAuth Password for webhook
     */
    constructor(webhookPort, webhookPath, webhookAuth) {
        if (!webhookPort) webhookPort = 3001;
        if (!webhookPath) webhookPath = '/GBLWebhook';
        if (!webhookAuth) throw new TypeError('Missing Webhook Authentication');
        super();
        this._webhookPort = webhookPort;
        this._webhookPath = webhookPath;
        this._webhookAuth = webhookAuth;
        this.app = express();
        this.app.use(express.json());
        let port = normalizePort(webhookPort);
        this.app.set('port', port);
        let server = http.createServer(this.app);
        this.router = express.Router();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        server.listen(port);
        server.on('error', onError);
        server.on('listening', () => {
            this.emit('ready', `Glenn Bot List Webhook is running on port ${webhookPort} with path ${webhookPath}. Direct link: 0.0.0.0:${webhookPort}${webhookPath}`);
        });
        this.app.use(webhookPath, (req, res) => {
            if (req.body.auth !== webhookAuth) {
                res.status(401);
                delete req.body.auth;
                this.emit('error', `Unauthorized. You did not specify a correct token.`);
                return res.json({ invalidauth: true });
            }
            delete req.body.auth;
            this.emit('vote', req.body);
            res.status(200);
            return res.json({ good: true });
        });

        function normalizePort(val) {
            let port = parseInt(val, 10);

            if (isNaN(port)) {
                return val;
            }

            if (port >= 0) {
                return port;
            }

            return false;
        }

        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
            
            switch (error.code) {
                case 'EACCES':
                    this.emit('error', `${bind} requires elevated privileges and cannot be used by GBLAPI.JS webhook.`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    this.emit('error', `${bind} is already in use and cannot be used by GBLAPI.JS webhook.`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
    }
};

module.exports = GBLWebhook;