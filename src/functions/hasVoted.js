const fetch = require('node-fetch');
const config = require('../config');

module.exports = async function (uid, id, authorization) {
    return fetch(`https://${config.domain}${config.endpoints.get_votes.replace(':id', `${id}`)}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then(res => res.json()).then(async json => {
        return await json.current_votes.current_users.map(u => u == uid).filter(i => i)[0] || false;
    }).catch(async error => {
        console.log(error);
    });
};