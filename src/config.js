module.exports = {
    domain: 'api.glennbotlist.xyz',
    endpoints: {
        get_bot: '/bot/:id',
        get_user: '/profile/:id',
        get_votes: '/bot/:id/votes',
        has_voted: '/bot/:id/votes',
        update_stats: '/bot/:id/stats'
    }   
};