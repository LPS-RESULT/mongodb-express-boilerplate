/**
 *  All common processes during DB connection are executed here.
 *
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function(env) {
    if (env === 'development') {
        mongoose.set('debug', true)
    }

    return mongoose.connect('mongodb://'+process.env.DB_HOST + ':' + process.env.DB_PORT+'/' + process.env.DB_NAME,{ useNewUrlParser: true });
};