/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var num1;
    var new_num;
    var audio_url;//储存音频文件地址
    var $p_id = $("#questions_manage_page");
    var login_account_id = $('#login_account_id').val();
    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });

    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });

    //题库列表
    function init() {
        var params = { // 查询查询参数
            seq_no: $p_id.find('#seq_no_q').val(), // 编号
            question_name: $p_id.find('#question_q').val(), // 题库名
            type: $p_id.find('#type_q').val(), // 题目类型：听说题目，听力题目
            account_id: $p_id.find('#account_id_q').val(), // 上传帐号
            public: $p_id.find('#public_q').val(), // 是否公开
            status: $p_id.find('#status_q').val(), // 状态
            login_account_id: login_account_id // 登录帐号
        };
        var table_src = $p_id.find('#questions_Table'); // 定义指向
        var ajax_url = '/questions/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},
            {"col_id": "question_name"},
            {"col_id": "type"},
            {"col_id": "account_id"},
            {"col_id": "public"},
            {"col_id": "status"}
        ]; // 定义表格数据列id
        var aoColumnDefs = [{
            "colIndex": 0,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 1,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-left w-15-5">' + data + '</div></td>';
            }
        }, {
            "colIndex": 2,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 3,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 4,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                if(full.public == 1){
                    return '<td><div class="text-center">公开</div></td>';
                }
                return '<td><div class="text-center">私有</div></td>';
            }
        },{
            "colIndex": 5,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                if(full.status == 1){
                    return '<td><div class="text-center">正常</div></td>';
                }
                return '<td><div class="text-center">删除</div></td>';
            }
        },{
            "colIndex": 6,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.seq_no && full.account_id == login_account_id) {
                    if(full.type == '听说题'){
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                            '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                            '<li><a class="employee_edit" href="javascript:void(0)" target="_blank" data-id="'+full.seq_no+'" data-toggle="modal">编辑</a></li>';
                        if(full.status == 1){
                            retHtml += '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>';
                        }else{
                            retHtml += '<li><a class="employee_re" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">恢复</a></li>';
                        }
                        retHtml += '</ul></div>';
                    }else if(full.type == '听力题'){
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                            '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                            '<li><a class="employee_edit newTLST" href="TLquestions_manage?seq_no='+full.seq_no+'" data-title="听力试题" target="_blank" data-toggle="modal"">编辑</a></li>';
                        if(full.status == 1){
                            retHtml += '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>';
                        }else{
                            retHtml += '<li><a class="employee_re" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">恢复</a></li>';
                        }
                        retHtml += '</ul></div>';
                    }

                }else if (full.seq_no){
                    if(full.type == '听说题'){
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                            '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                            '<li><a class="employee_edit" href="javascript:void(0)" target="_blank" data-id="'+full.seq_no+'" data-toggle="modal">查看</a></li>' +
                            '</ul>' +
                            '</div>';
                    }else if(full.type == '听力题'){
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                            '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                            '<li><a class="employee_edit newTLST" href="TLquestions_manage?seq_no='+full.seq_no+'" data-title="听力试题" target="_blank" data-toggle="modal"">查看</a></li>' +
                            '</ul>' +
                            '</div>';
                    }

                }
                return retHtml;
            }

        }]; // 定义需要改变的列

        // 列表为空时的数据
        var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';
        // 绘画表格
        TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
    };

    //引用题库列表
    function quote_question() {
        var params = { // 查询查询参数
            seq_no: $p_id.find('#seq_no_xq').val(), // 编号
            question_name: $p_id.find('#question_xq').val(), // 题库名
            account_id: $p_id.find('#account_id_xq').val(), // 上传帐号
            status:1,
            type:'听说题'
        };
        var table_src = $p_id.find('#TSquestion_Table'); // 定义指向
        var ajax_url = '/questions/list'; // 定义数据请求路径
        var pageSize = 5 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},
            {"col_id": "question_name"},
            {"col_id": "account_id"},
        ]; // 定义表格数据列id
        var aoColumnDefs = [{
            "colIndex": 0,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 1,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-left w-15-5">' + data + '</div></td>';
            }
        }, {
            "colIndex": 2,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 3,
            "html": function (data, type, full) {
                var retHtml = '<div class="drop-opt">' +
                    '<a class="yinyongTS" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">引用</a>' +
                    '</div>';

                return retHtml;
            }

        }]; // 定义需要改变的列

        // 列表为空时的数据
        var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';
        // 绘画表格
        TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
    };

    //自动填充一次
    init();

    //搜索后列表重构
    $p_id.find("#employeeSeatchBut").on('click',function(){
        init();
    });

    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }

    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

    //添加听说试题弹窗
    $p_id.find('#addTS').on('click', function () {
        $p_id.find("input[name='public']:eq(1)").attr("checked",'checked');
        $p_id.find('#seq_no').val('0');
        $p_id.find("#question_name").val('');
        $p_id.find("#remarks").val('');
        $p_id.find("#audio_url").val('');
        audio_url = '';
        $p_id.find('#addTSdiv').modal('show');
    });

    //添加听说题库引用弹窗
    $p_id.find('#TSTKYY').on('click', function () {
        $p_id.find('#TSTKdiv').modal('show');
        quote_question();   //填充引用题库
    });

    // 绑定引用事件
    $(document).on("click",'.yinyongTS', function () {
        debugger;
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/questions/list?seq_no='+$(this).attr('data-id'),
            "data": {},
            "success": function (data) {

                $p_id.find('#remarks').val(data.data[0].remarks);
                $p_id.find('#audio_name').val(data.data[0].audio_name);
                audio_url = data.data[0].audio_url;
                $p_id.find('#TSTKdiv').modal('hide');

            },
            "error": function (data) {
                console.log(data);
            }
        });
    });

    //保存听说题目按钮
    $p_id.find('#save_TSquestion').on('click', function () {
        // 默认允许提交
        debugger;
        var holdSubmit = true;
        if(!audio_url){
            alert('请上传音频文件');
            return;
        }
        if ($p_id.find('#add_account_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var params = {
                    question_name:$p_id.find("#question_name").val(),    //题库名
                    remarks:$p_id.find("#remarks").val(),    //题库说明
                    audio_url:audio_url,    //音频地址
                    audio_name:$p_id.find("#audio_name").val(),    //音频地址
                    public:$p_id.find("input[name='public']:checked").val(),   //公开？
                    type:'听说题',  //类型为听说题
                    account_id:login_account_id  //登录帐号
                };
                //新建
                if($p_id.find('#seq_no').val() == 0){
                    params.status = 1;
                    $.ajax({
                        "dataType": 'json',
                        "type": "get",
                        "timeout": 20000,
                        "url": '/questions/TSnew',
                        "data": {params:params},
                        "success": function (data) {
                            window.location.reload();
                        },
                        "error": function (data) {
                            console.log(data);
                        }
                    });
                }else{   //更新
                    params.seq_no = $p_id.find('#seq_no').val();
                    $.ajax({
                        "dataType": 'json',
                        "type": "get",
                        "timeout": 20000,
                        "url": '/questions/TSnew',
                        "data": {params:params},
                        "success": function (data) {
                            window.location.reload();
                        },
                        "error": function (data) {
                            console.log(data);
                        }
                    });
                }

            }
        }
    });


    // 动态绑定删除事件
    $(document).on("click", ".employee_del", function () {
        $p_id.find('#seq_no').val($(this).attr('data-id'));
        // 显示成功对话框
        $p_id.find("#sureDel").modal('show');
        //if(confirm("确认要删除该员工信息吗？")){
        //    fnemployeePage.delEmployee($(this));
        //}
    });

    // 确认删除
    $p_id.find("#confirmDialog").click(function () {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/questions/del?seq_no=' + $p_id.find('#seq_no').val(),
            "data": {},
            "success": function (data) {
                window.location.reload();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    });

    // 动态绑定恢复事件
    $(document).on("click", ".employee_re", function () {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/questions/recovery?seq_no=' + $(this).attr('data-id'),
            "data": {},
            "success": function (data) {
                window.location.reload();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    });

    // 动态绑定编辑-查看事件
    $(document).on("click", ".employee_edit", function () {
        $p_id.find('#seq_no').val($(this).attr('data-id'));
        //请求数据自动填充
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/questions/list?seq_no=' + $('#seq_no').val(),
            "data": {},
            "success": function (data) {
                //听说题弹窗
                if(data.data[0].type == '听说题'){
                    $p_id.find("input[name='public']:eq("+(data.data[0].public-1)+")").attr("checked",'checked');
                    $p_id.find("#question_name").val(data.data[0].question_name);
                    $p_id.find("#remarks").val(data.data[0].remarks);
                    $p_id.find("#audio_name").val(data.data[0].audio_name);
                    audio_url = data.data[0].audio_url;
                    debugger;
                    if(data.data[0].account_id == $('#login_account_id').val()){
                        $(document).ready(function(){
                            $p_id.find("#add_account_form").find("*").remove('disabled');
                        });
                    } else {//他人的题目不可编辑
                        $(document).ready(function(){
                            $p_id.find("#add_account_form").find("*").attr('disabled','true');
                        });
                    }
                    // 显示成功对话框
                    $p_id.find('#addTSdiv').modal('show');
                }
            },
            "error": function (data) {
                console.log(data);
            }
        });

    });
    //保证听力试题页面唯一
    $('.newTLST').on('click',function(){
        $(".nav-main ul li").each(function(){
            if($(this).html().indexOf('听力试题') > -1){
                $(this).find(".close-page").trigger("click");
            }
        });
    });

    //音频上传
    var picClient_T =new PicClient();
    //音频
    picClient_T.addsingles(['asdasdj'],function callback(date1,date2,date3){
        setTimeout(function () {
            if('|mp3|wma|MP3|WMA|'.indexOf(JSON.parse(date2).extName) > -1){
                $p_id.find("#img_cover_ul").empty();
                $p_id.find("#img_cover_ul").append('<li class="alert alert-dismissable"> ' +
                    '<strong> ' +
                    '<img src="images/format_img/mp3.jpg" alt="" width="63" height="87"> ' +
                    '</strong> ' +
                    '</li>');
                debugger;
                $p_id.find('#audio_name').val(JSON.parse(date2).file_name);
                audio_url = JSON.parse(date2).date;
                debugger;

            }else{
                alert('请上传mp3、wma格式的音频文件');
            }

        }, 1000);
    });
    //// 动态绑定重置密码事件
    //$(document).on("click", ".employee_resetpass", function () {
    //    $('#seq_no').val($(this).attr('data-id'));
    //    // 显示成功对话框
    //    $("#sureReset").modal('show');
    //});
    //// 确认
    //$("#resetPassword").click(function () {
    //    $.ajax({
    //        "dataType": 'json',
    //        "type": "get",
    //        "timeout": 20000,
    //        "url": '/account/resetPassword?seq_no=' + $('#seq_no').val(),
    //        "data": {},
    //        "success": function (data) {
    //            debugger;
    //            window.location.reload();
    //        },
    //        "error": function (data) {
    //            console.log(data);
    //        }
    //    });
    //});



});





