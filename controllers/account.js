var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');
var Promise = require("bluebird");
var knex = require('../lib/common/mysqlClient').knex;
var BusinessError = require('../lib/common/errors/businessError');
var util = require('../lib/util.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filter = require('../lib/filter');
module.exports = function (app) {
    app.use('/', router);

    //查询用户列表
    router.get('/account/list', function (req, res,next) {
        var sql = knex.select('*').from('account');
        var params = req.query;
        if(params.name){
            sql = sql.where('name',params.name);
        }
        if(params.sex){
            sql = sql.where('sex',params.sex);
        }
        if(params.username){
            sql = sql.where('username',params.username);
        }
        if(params.part){
            sql = sql.where('part',params.part);
        }
        if(params.class){
            sql = sql.where('class',params.class);
        }
        if(params.status){
            sql = sql.where('status',params.status);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql);
        }).then(function (reply) {
            if (reply) {
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });




};