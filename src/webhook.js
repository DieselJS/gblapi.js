const express = require("express");
const EventEmitter = require('eventemitter3');
const http = require('http');
class GBLWebhook extends EventEmitter {
    /**
    * Main Class
    * @param {string} webhookPort Port for the webhook default is 3001
    * @param {string} webhookPath Path for webhook default is /GBLWebhook
    * @param {string} webhookAuth Password for webhook
    */
    constructor(webhookPort, webhookPath, webhookAuth) {
        if (!webhookAuth) throw new TypeError("Missing Webhook Authentication");
        super();
        this._webhookPort = webhookPort;
        this._webhookPath = webhookPath;
        this._webhookAuth = webhookAuth;
        if (!this._webhookPort) webhookPort = 3001;
        if (!this._webhookPath) webhookPath = "/GBLWebhook";
        this.app = new express();

        this.app.use(express.json());
        let port = normalizePort(webhookPort);
        this.app.set('port', port);
        let server = http.createServer(this.app);
        this.router = express.Router()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        /**
         * Listen on provided port, on all network interfaces.
         */

        server.listen(port);
        server.on('error', onError);
        server.on('listening', () => {
            this.emit("ready", `Glenn Bot List Webhook is running on port ${webhookPort} with path ${webhookPath}. Direct link: 0.0.0.0:${webhookPort}${webhookPath}`)
        })
        /**
         * Normalize a port into a number, string, or false.
         */
        this.app.use(webhookPath, (req, res) => {
            if (req.body.auth !== webhookAuth) {
                res.status(401)
                delete req.body.auth
                return res.json({ invalidauth: true })
            }
            delete req.body.auth
            this.emit("vote", req.body)
            res.status(200)
            return res.json({ good: true })
        })
        function normalizePort(val) {
            let port = parseInt(val, 10);

            if (isNaN(port)) {
                // named pipe
                return val;
            }

            if (port >= 0) {
                // port number
                return port;
            }

            return false;
        }

        /**
         * Event listener for HTTP server "error" event.
         */

        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
    }


}

module.exports = GBLWebhook;