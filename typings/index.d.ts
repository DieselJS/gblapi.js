declare module 'gblapi.js';
export = GBLAPI;
import EventEmitter = require('eventemitter3');

declare class GBLAPI extends EventEmitter {
    constructor(id: string, token: string, options: object);
    constructor(id: string, token: string);

    public updateStats(serverCount: number, shardCount: number): Promise<object>

    public token?: string;
    public id?: string;
}