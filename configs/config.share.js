module.exports = {
    systemBearerToken: '0UfZ7V4W6S80tJ0TKP7N',
    cacheType: {
        global: "global"
    },
    cacheExpireTime: {
        seconds_10: 10 ,
        seconds_30: 30 ,
        seconds_60: 60 ,
        minutes_5: 5 * 60 ,
        minutes_30: 30 * 60 ,
        minutes_60: 60 * 60 ,
        hours_5: 5 * 60 * 60 ,
        hours_10: 10 * 60 * 60 ,
        hours_24: 24 * 60 * 60
    },

    mysql: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '1234',
        database: 'fig-web',
        charset: 'utf8'
    },
    mongo: {
        query_db_full_conn_string: 'mongodb://112.124.127.54:27117/fzr',
        type: 'mongodb',
        host: '112.124.127.54',
        port: 27117
        /* username: 'mylexin',
         password: 'mylexin'*/
    },
    rememberMeTimeoutLong: 5 * 60,
    thisClientUrl: 'http://112.124.127.54:3005'
};