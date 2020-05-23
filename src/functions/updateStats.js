const fetch = require('node-fetch');
const config = require('../config');
const GBLError = require('../error');

module.exports = async function (serverCount, shardCount, id, authorization, logs) {
    const data = {
        "serverCount": serverCount,
        "shardCount": shardCount
    };
    return fetch(`https://glennbotlist.xyz/api/v2/bot/${id}/stats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(async json => {
        if (json['code'] == 200 && logs) console.log(`[GlennBotList] Sucessfully posted ${serverCount} servers and ${shardCount} shards to GlennBotList`);
        else console.log(`[GlennBotList] There was an error while trying to post: ${json}`);
        return await json;
    }).catch(async error => {
        console.log(error);
    });
};