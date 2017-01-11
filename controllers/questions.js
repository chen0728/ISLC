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

    //查询题目列表
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
            sql = sql.where('type',params.type);
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
        sql = sql.orWhere('account_id', req.session.account_id);
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
        if(params.type){
            sql = sql.where('type',params.type);
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

    //修改或新建听说题目
    router.get('/questions/TSnew', function (req, res,next) {
        var params = req.query.params;
        var sql = knex('questions_bank');

        var time = new Date();
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        var record_info = {
            operator_id: req.session.account_id,
            operator_name: req.session.username,
            record_id: params.seq_no,
            operat_time: time,
            status: 1,
            source: 1
        };

        //修改
        if(params.seq_no){
            sql = sql.where('seq_no',params.seq_no).update(params);
            record_info.operation_type = '修改题目信息';
        } else {
            sql = sql.insert(params);
            record_info.operation_type = '添加题目信息';
        }

        sql.then(function (reply) {
            return knex('operation_record').insert(record_info);
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //逻辑删除题目
    router.get('/questions/del', function (req, res,next) {
        var sql = knex('questions_bank').where('seq_no',req.query.seq_no).update('status',2);

        sql.then(function (reply) {
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex.raw("INSERT INTO operation_record (operator_id,operator_name,operation_type,record_id,operat_time,status,source)" +
                " VALUES ('"+req.session.account_id+"','"+req.session.username+"','删除题目信息','"+req.query.seq_no+"','"+time+"',1,1)")
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //逻辑恢复题目
    router.get('/questions/recovery', function (req, res,next) {
        var sql = knex('questions_bank').where('seq_no',req.query.seq_no).update('status',1);

        sql.then(function (reply) {
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex.raw("INSERT INTO operation_record (operator_id,operator_name,operation_type,record_id,operat_time,status,source)" +
                " VALUES ('"+req.session.account_id+"','"+req.session.username+"','恢复题目信息','"+req.query.seq_no+"','"+time+"',1,1)")
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //修改或新建听力试题
    router.get('/questions/TLNew', function (req, res,next) {
        var question = req.query.question;
        var question_list = req.query.question_list;
        var related_bank ;

        question.account_id = req.session.account_id;
        question.date1 = new Date();
        question.date1 = moment().format('YYYY-MM-DD HH:mm:ss');

        var time = new Date();
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        var record_info = {
            operator_id: req.session.account_id,
            operator_name: req.session.username,
            operat_time: time,
            status: 1,
            source: 1
        };

        if(question.seq_no){//更新
            var sql = knex('questions_bank').where('seq_no',question.seq_no).update(question);
            record_info.operation_type = '修改题目信息';
        }else{ //新增
            var sql = knex('questions_bank').insert(question);
            record_info.operation_type = '添加题目信息';
        }

        sql.then(function (reply) {
            related_bank = reply[0];
            if(question.seq_no){
                record_info.record_id = question.seq_no;
                return knex('questions_info').where('related_bank',question.seq_no).delete();
            }else{
                record_info.record_id = related_bank;
                return Promise;
            }
        }).then(function (reply) {
            return Promise.map(question_list, function (question_info) {
                if(question.seq_no){
                    question_info.related_bank = question.seq_no;
                }else{
                    question_info.related_bank = related_bank;
                }
                question_info.account_id = req.session.account_id;
                return knex('questions_info').insert(question_info);
            });
        }).then(function (reply) {
            return knex('operation_record').insert(record_info);
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });

    //根据听力题目id查询附表小题内容
    router.get('/questions_info/select', function (req, res,next) {
        var related_bank = req.query.related_bank;

        knex('questions_info').select('*').where('related_bank',related_bank).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
};