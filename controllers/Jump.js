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
    //后台首页
    router.post('/login', function (req, res) {
        res.render('Backstage/index',{username:'超级管理员',mm_dd:'10月26日',Week:'周三',role_name:'哈哈哈',_id:123});
    });
    //后台首页
    router.get('/index', function (req, res) {
        res.render('Backstage/index',{username:'超级管理员',mm_dd:'10月26日',Week:'周三',role_name:'哈哈哈',_id:123});
    });
        //后台首页
    router.get('/account_manage', function (req, res) {
        res.render('Backstage/account_manage',{code:0,text:""});
    });
    //权限管理
    router.get('/role_manage', function (req, res) {
        res.render('Backstage/role_manage',{code:0,text:""});
    });



};