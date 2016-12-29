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

    //查询课堂列表(教师）
    router.get('/course_manage/list', function (req, res,next) {
        var sql = knex.select('*').from('course_info').where('status','!=',2)
        var params = req.query;
        if(params.account_id){
            sql = sql.where('account_id', params.account_id);
        }
        if(params.name){
            sql = sql.where('name','like','%'+params.name+'%');
        }
        if(params.number){
            sql = sql.where('number', params.number);
        }
        if(params.creat_timeS){
            sql = sql.where('creat_time','>=',params.creat_timeS);
        }
        if(params.creat_timeE){
            sql = sql.where('creat_time','<=',params.creat_timeE);
        }
        if(params.class_timeS){
            sql = sql.where('class_time','>=',params.class_timeS);
        }
        if(params.class_timeE){
            sql = sql.where('class_time','<=',params.class_timeE);
        }
        if(params.class_status){
            sql = sql.where('class_status', params.class_status);
        }
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].creat_time = moment(reply[i].creat_time).format('YYYY-MM-DD');
                    reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD HH:MM');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //查询课堂列表(学生）
    router.get('/course_manage/media', function (req, res,next) {
        var params = req.query;
        var infos={};
        knex.select('*').from('account').where('account_id',params.account_id).then(function (reply) {
            var sql = knex.select('*').from('course_info').where('status','!=',2)
            if(reply[0].class){
                sql = sql.where('class','like','%'+ reply[0].class+'%');
            }
            if(params.name){
                sql = sql.where('name','like','%'+params.name+'%');
            }
            if(params.number){
                sql = sql.where('number', params.number);
            }
            if(params.creat_timeS){
                sql = sql.where('creat_time','>=',params.creat_timeS);
            }
            if(params.creat_timeE){
                sql = sql.where('creat_time','<=',params.creat_timeE);
            }
            if(params.class_timeS){
                sql = sql.where('class_time','>=',params.class_timeS);
            }
            if(params.class_timeE){
                sql = sql.where('class_time','<=',params.class_timeE);
            }
            if(params.class_status){
                sql = sql.where('class_status', params.class_status);
            }
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].creat_time = moment(reply[i].creat_time).format('YYYY-MM-DD');
                    reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD HH:MM');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //删除
    router.post('/course_info/del', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex('course_info').update('status',2).where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json({data: reply});
        }).catch(function (err) {
            next(err);
        });
    });
    //查询详情
    router.get('/course_info/get', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('course_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            for(var i =0;i<reply.length;i++){
                reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD HH:MM:SS');
            }
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联资料查询
    router.get('/course_info/getl', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('data_info').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联题库查询
    router.get('/course_info/qusetion', function (req, res, next) {
        var seq_no = req.query.seq_no;
        var sql = knex.select('*').from('questions_bank').where('seq_no',seq_no);
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //资料列表弹窗查询
    router.get('/data_add/list', function (req, res,next) {
        var params = req.query;
        var sql = knex.select('*').from('data_info');
        sql.where('status',1)
        if(params.name){
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if(params.public) {
            sql = sql.where('public', params.public);
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        if(params.seq_data_arr){
            for(var i = 0; i<params.seq_data_arr.length; i++ ){
                sql = sql.where('seq_no','!=',params.seq_data_arr[i]);
            }
        };
        sql = sql.where('account_id',params.account_id).orWhere('public',1);
        sql.where('status',1)
        if(params.name){
            sql = sql.where('name','like', '%'+params.name+'%');
        }
        if(params.public) {
            sql = sql.where('public', params.public);
        }
        if (params.up_timeS) {
            sql = sql.where('up_time', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('up_time', '<=', params.up_timeE);
        }
        if(params.seq_data_arr){
            for(var i = 0; i<params.seq_data_arr.length; i++ ){
                sql = sql.where('seq_no','!=',params.seq_data_arr[i]);
            }
        };
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].up_time = moment(reply[i].up_time).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //题库列表弹窗查询
    router.get('/questions_add/list', function (req, res,next) {
        var params = req.query;
        var sql = knex.select('*').from('questions_bank');
        sql.where('status',1)
        if(params.question_name){
            sql = sql.where('question_name','like', '%'+params.question_name+'%');
        }
        if(params.public) {
            sql = sql.where('public', params.public);
        }
        if (params.up_timeS) {
            sql = sql.where('date1', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('date1', '<=', params.up_timeE);
        }
        if(params.seq_question_arr){
            for(var i = 0; i<params.seq_question_arr.length; i++ ){
                sql = sql.where('seq_no','!=',params.seq_question_arr[i]);
            }
        };
        sql = sql.where('account_id',params.account_id).orWhere('public',1);
        sql.where('status',1)
        if(params.question_name){
            sql = sql.where('question_name','like', '%'+params.question_name+'%');
        }
        if(params.public) {
            sql = sql.where('public', params.public);
        }
        if (params.up_timeS) {
            sql = sql.where('date1', '>=', params.up_timeS);
        }
        if (params.up_timeE) {
            sql = sql.where('date1', '<=', params.up_timeE);
        }
        if(params.seq_question_arr){
            for(var i = 0; i<params.seq_question_arr.length; i++ ){
                sql = sql.where('seq_no','!=',params.seq_question_arr[i]);
            }
        };
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].date1 = moment(reply[i].up_time).format('YYYY-MM-DD');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
    //查询seq_no
    router.get('/course_info/course_seq', function (req, res, next) {
        var sql = knex.select('*').from('course_info').orderBy('seq_no','desc');
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //新建课程
    router.post('/grouping/newGroup', function (req, res, next) {
        var pro = req.body;
        mydate = moment().format('YYYY-MM-DD HH:mm:ss');
        if(pro.number){
            pro.creat_time = mydate;
            var sql = knex('course_info').insert(pro);
        }else{
            var sql = knex('course_info').update(pro).where('seq_no',pro.seq_no);
        }
        // 执行sql
        sql.then(function (reply) {
            res.json(reply);
        }).catch(function (err) {
            next(err);
        });
    });
    //关联查询课堂与资料
    router.get('/course_manage/list', function (req, res,next) {
        var sql = knex.select('*').from('course_info').where('status','!=',2)
        var infos={};
        sql.then(function (reply) {
            infos.totalSize = reply.length;
            return sql = util.queryAppend(req.query, sql)
        }).then(function (reply) {
            if (reply) {
                for(var i =0;i<reply.length;i++){
                    reply[i].creat_time = moment(reply[i].creat_time).format('YYYY-MM-DD');
                    reply[i].class_time = moment(reply[i].class_time).format('YYYY-MM-DD HH:MM');
                }
                infos.data = reply;
                res.json(infos);
            }
        }).catch(function (err) {
            next(err);
        });
    });
};