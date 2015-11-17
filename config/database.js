/**
 * Created by davidhoverson on 11/6/15.
 */
module.exports = {
    'connection': {
        'host': process.env.host,
        'user': process.env.dbuser,
        'password': process.env.dbpass
    },
    'database': process.env.database,
    'users_table': 'users'
};