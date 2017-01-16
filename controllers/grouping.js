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

    //查询账号班级
    router.post('/grouping/class', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('account').where('account_id',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联查询班级名
    router.post('/grouping/className', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('value_mapping').where('num1',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //查询所有班级
    router.get('/grouping/classOther', function (req, res, next) {
        var sql = knex.select('*').from('value_mapping');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //查询班级下拉列表
    router.get('/grouping/select', function (req, res, next) {
        var account_id = req.query.account_id;
        var sql = knex.select('class').from('account').where('account_id',account_id);
        sql.then(function (reply) {
            var list =[];
            if(reply.length>0){
                list = reply[0].class.split(";");
            }
            return knex.select('key_val_cn','num1').from('value_mapping').whereIn('num1', list);
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联查询组名(教师）
    router.post('/grouping/group', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var account_id = req.query.account_id;
        var sql = knex.select('*').from('grouping_info').where('class',seq_no).where('account_id',account_id);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联class查询组
    router.post('/grouping/group_seq', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('grouping_info').where('class',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联查询学生
    router.post('/grouping/name', function (req, res, next) {
        var seq_no_name =[];
        seq_no_name = req.query.seq_no_name.split(',')
        var sql = knex.select('*').from('account').whereIn('seq_no',seq_no_name);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联查询组
    router.post('/grouping/remarks', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('grouping_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //查询未分组学生
    router.post('/grouping/groupOut', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var account_id = req.query.account_id;
        var sql = knex.select('student').from('grouping_info').where('class',seq_no).where('account_id',account_id);
        sql.then(function (reply) {
            var list =[];
            if(reply.length>0){
                for(var i=0;i<reply.length;i++){
                    list = list.concat(reply[i].student.split(",")) ;
                }
            }
            return knex.select('*').from('account').where('class',seq_no).whereNotIn('seq_no',list);
        }).then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //新建组
    router.post('/grouping/new', function (req, res, next) {
        var pro = req.body;
        var mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        pro.date1 = mydate;
        var sql = knex('grouping_info').insert(pro);
        var data_reply;
        sql.then(function (reply) {
            data_reply = reply;
            return knex('operation_record').insert({
                operator_id: req.session.account_id,
                operator_name: req.session.username,
                operation_type: '新建分组',
                operat_time: mydate,
                record_id: reply,
                status: 1,
            });
        }).then(function (reply) {
            res.json({data: data_reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //删除组
    router.post('/grouping/delGroup', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('grouping_info').where('seq_no',seq_no).update({class:'',account_id:'',student:'',status:2});
        var data_reply;
        sql.then(function (reply) {
            data_reply = reply;
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex('operation_record').insert({
                operator_id: req.session.account_id,
                operator_name: req.session.username,
                operation_type: '删除分组',
                operat_time: time,
                record_id: seq_no,
                status: 1,
            });
        }).then(function (reply) {
            res.json(data_reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //保存
    router.get('/grouping/save', function (req, res, next) {
        var pro = req.query;
        if(pro.in_group){
            var sql = knex('grouping_info').update({student:pro.in_group,remarks:pro.remarks}).where('seq_no',pro.seq_no);
        }else{
            var sql = knex('grouping_info').update('remarks',pro.remarks).where('seq_no',pro.seq_no);
        }
        var data_reply;
        sql.then(function (reply) {
            data_reply = reply;
            var time = new Date();
            time = moment().format('YYYY-MM-DD HH:mm:ss');
            return knex('operation_record').insert({
                operator_id: req.session.account_id,
                operator_name: req.session.username,
                operation_type: '更改分组',
                operat_time: time,
                record_id: pro.seq_no,
                status: 1,
            });
        }).then(function (reply) {
            res.json(data_reply);
        }).catch(function (err) {
            next(err);
        });
    });
};