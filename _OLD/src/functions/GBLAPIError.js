module.exports = class GBLAPIError extends Error {
    /**
     * GlennBotList API Error
     * @param {any} message Error Message
     */
    constructor(message) {
        if (typeof message !== "string") {
            if (typeof message === "object") message = JSON.stringify(message);
            if (message instanceof Buffer || message instanceof Function) message = message.toString();
        }
        super(message);
    }
}