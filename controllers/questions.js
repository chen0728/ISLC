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
    router.get('/questions/list', function (req, res,next) {
        var sql = knex.select('*').from('questions_bank').where('public',1).where('status',1);
        var params = req.query;
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no);
        }
        if(params.question_name){
            sql = sql.where('question_name','like', '%'+params.question_name+'%');
        }
        if(params.score){
            sql = sql.where('score',params.score);
        }
        if(params.type){
            sql = sql.where('type','like', '%'+params.type+'%');
        }
        if(params.account_id){
            sql = sql.where('account_id','like', '%'+params.account_id+'%');
        }
        if(params.public){
            sql = sql.where('public',params.public);
        }
        if(params.status){
            sql = sql.where('status',params.status);
        }
        sql = sql.orWhere('account_id', params.login_account_id);
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no);
        }
        if(params.question_name){
            sql = sql.where('question_name','like', '%'+params.question_name+'%');
        }
        if(params.score){
            sql = sql.where('score',params.score);
        }
        if(params.remarks){
            sql = sql.where('remarks','like', '%'+params.remarks+'%');
        }
        if(params.account_id){
            sql = sql.where('account_id','like', '%'+params.account_id+'%');
        }
        if(params.public){
            sql = sql.where('public',params.public);
        }
        if(params.status){
            sql = sql.where('status',params.status);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].creat_time = moment(reply[i].creat_time).format('YYYY-MM-DD');
                    reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });

    //修改或新建题目
    router.get('/questions/new', function (req, res,next) {
        var params = req.query.params;
        var sql = knex('questions_bank');

        //修改
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no).update(params);
        } else {
            sql = sql.insert(params);
        }

        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //逻辑删除题目
    router.get('/questions/del', function (req, res,next) {
        var sql = knex('questions_bank').where('seq_no',req.query.seq_no).update('status',2);

        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};