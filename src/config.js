module.exports = {
    domain: 'glennbotlist.xyz',
    endpoints: {
        get_bot: '/bot/:id',
        get_user: '/user/:id',
        get_votes: '/bot/:id/votes',
        has_voted: '/bot/:id/votes',
        update_stats: '/bot/:id/stats'
    }   
};