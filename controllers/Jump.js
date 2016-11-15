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


    /*********************前端*********************/


    /*********************后台*********************/

    //后台登陆页面
    router.get('/', function (req, res) {
        res.render('Backstage/login',{code:0,text:""});
    });
    //后台登陆页面
    router.get('/login', function (req, res) {
        res.render('Backstage/login',{code:0,text:""});
    });
    //退出后台登录
    router.get('/logout', function (req, res) {
        req.session.destroy();
        res.render('Backstage/login',{code:0,text:""});
    });
    //后台首页
    router.post('/login', function (req, res) {
        userInfo = req.body;
        knex.select('*').from('account').where('account_id', userInfo.username).where('password', userInfo.password).then(function (reply) {
           if(reply.length == 1){
               req.session.account_id = userInfo.username;
               res.render('Backstage/index',{login_account_id:req.session.account_id,username:'超级管理员',mm_dd:'10月26日',Week:'周三',role_name:'哈哈哈',_id:123});
           }else{
               res.redirect('/');
           }
        }).catch(function (err) {
            next(err);
        });
    });
    //后台首页
    router.get('/index',filter.authorize, function (req, res) {
        res.render('Backstage/index',{username:'超级管理员',mm_dd:'10月26日',Week:'周三',role_name:'哈哈哈',_id:123});
    });
        //后台首页
    router.get('/account_manage',filter.authorize, function (req, res) {
        res.render('Backstage/account_manage',{code:0,text:""});
    });
    //权限管理
    router.get('/role_manage',filter.authorize, function (req, res) {
        res.render('Backstage/role_manage',{code:0,text:""});
    });
    //数据字典
    router.get('/value_mapping',filter.authorize, function (req, res) {
        res.render('Backstage/value_mapping',{code:0,text:""});
    });
    //数据字典
    router.get('/course_manage',filter.authorize, function (req, res) {
        res.render('Backstage/course_manage',{code:0,text:""});
    });
    //操作日志
    router.get('/operation_record',filter.authorize, function (req, res) {
        res.render('Backstage/operation_record',{code:0,text:""});
    });
    //题目管理
    router.get('/questions_manage',filter.authorize, function (req, res) {
        res.render('Backstage/questions_manage',{code:0,text:""});
    });
    //题目管理
    router.get('/TLquestions_manage',filter.authorize, function (req, res) {
        res.render('Backstage/TLquestions_manage',{seq_no:req.query.seq_no});
    });
    //课程管理
    router.get('/course_add',filter.authorize, function (req, res) {
        res.render('Backstage/course_add',{seq_no:req.query.seq_no});
    });
    //课堂音频管理
    router.get('/class_audio',filter.authorize, function (req, res) {
        res.render('Backstage/class_audio',{seq_no:req.query.seq_no});
    });
    //学生分组管理
    router.get('/grouping',filter.authorize, function (req, res) {
        res.render('Backstage/grouping',{seq_no:req.query.seq_no});
    });
    //学生分组管理
    router.get('/grouping',filter.authorize, function (req, res) {
        res.render('Backstage/grouping',{seq_no:req.query.seq_no});
    });
    //公共资料管理
    router.get('/public_information',filter.authorize, function (req, res) {
        res.render('Backstage/public_information',{seq_no:req.query.seq_no});
    });
    //个人资料管理
    router.get('/personal_information',filter.authorize, function (req, res) {
        res.render('Backstage/personal_information',{seq_no:req.query.seq_no});
    });


};