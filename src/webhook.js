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

        this._webhookPort = webhookPort || 3001;
        this._webhookPath = webhookPath || "/GBLWebhook";
        this._webhookAuth = webhookAuth;

        this.app = new express();

        this.app.use(express.json());
        var port = normalizePort(webhookPort);
        this.app.set('port', port);
        var server = http.createServer(this.app);
        this.router = express.Router()
        /**
         * Listen on provided port, on all network interfaces.
         */

        server.listen(port);
        server.on('error', onError);
        /**
         * Normalize a port into a number, string, or false.
         */
        this.app.use(webhookPath, () => {
            console.log("testing works")
            let testObj = {
                user: "test"
            }
            this.emit("vote", testObj)
        })
        function normalizePort(val) {
            var port = parseInt(val, 10);

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