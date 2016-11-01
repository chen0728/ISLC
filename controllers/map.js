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

    //查询角色权限列表
    router.get('/value_mapping/list', function (req, res,next) {
        var sql = knex.select('*').from('value_mapping').where('data_status','!=',2)
        var params = req.query;
        if(params.num1){
            sql = sql.where('num1', params.num1);
        }
        if(params.type){
            sql = sql.where('type','like','%'+params.type+'%');
        }
        if(params.key_id){
            sql = sql.where('key_id',params.key_id);
        }
        if(params.key_val_cn){
            sql = sql.where('key_val_cn','like','%'+params.key_val_cn+'%');
        }
        if(params.date1S){
            sql = sql.where('date1','>=',params.date1S);
        }
        if(params.date1E){
            sql = sql.where('date1','<=',params.date1E);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].date1 = moment(reply[i].date1).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
};