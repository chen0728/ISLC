/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var num1;
    var new_num;
    var $p_id = $("#questions_manage_page");
    debugger;
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
            login_account_id: $('#login_account_id').val() // 状态
        };
        debugger;
        var table_src = $('#questions_Table'); // 定义指向
        var ajax_url = '/questions/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},
            {"col_id": "question_name"},
            {"col_id": "remarks"},
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
                if (full.seq_no && full.account_id == $('#login_account_id').val()) {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="javascript:void(0)" target="_blank" data-id="'+full.seq_no+'" data-toggle="modal">编辑</a></li>' +
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>' +
                        '</ul>' +
                        '</div>';
                }else if(full.seq_no){
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="javascript:void(0)" target="_blank" data-id="'+full.seq_no+'" data-toggle="modal">查看</a></li>' +
                        '</ul>' +
                        '</div>';
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
            login_account_id: $('#login_account_id').val(), // 上传帐号
            status:1,
            type:'听说题'
        };
        debugger;
        var table_src = $('#TSquestion_Table'); // 定义指向
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
                    '<a class="yinyong" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">引用</a>' +
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
    $("#employeeSeatchBut").on('click',function(){
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
    $('#addTS').on('click', function () {
        $("input[name='public']:eq(1)").attr("checked",'checked');
        $('#addTSdiv').modal('show');
        $('#seq_no').val('0');
    });

    //添加听说题库引用弹窗
    $('#TSTKYY').on('click', function () {
        $('#TSTKdiv').modal('show');
        quote_question();   //填充引用题库
    });

    // 绑定引用事件
    $(document).on("click",'.yinyong', function () {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/questions/list?seq_no='+$(this).attr('data-id'),
            "data": {},
            "success": function (data) {
                debugger;

                $('#remarks').val(data.data[0].remarks);
                $('#question_name').val(data.data[0].question_name);
                $('#audio_url').val(data.data[0].audio_url);
                $('#TSTKdiv').modal('hide');

            },
            "error": function (data) {
                console.log(data);
            }
        });
    });

    //保存听说题目按钮
    $('#save_TSquestion').on('click', function () {
        // 默认允许提交
        var holdSubmit = true;
        debugger;
        if ($('#add_account_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var params = {
                    question_name:$("#question_name").val(),    //题库名
                    remarks:$("#remarks").val(),    //题库说明
                    audio_url:$("#audio_url").val(),    //音频地址
                    public:$("input[name='public']:checked").val(),   //公开？
                    type:'听说题',  //类型为听说题
                    account_id:$('#login_account_id').val()   //类型为听说题
                };
                //新建
                if($('#seq_no').val() == 0){
                    params.status = 1;
                    $.ajax({
                        "dataType": 'json',
                        "type": "get",
                        "timeout": 20000,
                        "url": '/questions/new',
                        "data": {params:params},
                        "success": function (data) {
                            window.location.reload();
                        },
                        "error": function (data) {
                            console.log(data);
                        }
                    });
                }else{   //更新
                    params.seq_no = $('#seq_no').val();
                    $.ajax({
                        "dataType": 'json',
                        "type": "get",
                        "timeout": 20000,
                        "url": '/questions/new',
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
        $('#seq_no').val($(this).attr('data-id'));
        // 显示成功对话框
        $("#sureDel").modal('show');
        //if(confirm("确认要删除该员工信息吗？")){
        //    fnemployeePage.delEmployee($(this));
        //}
    });
    // 确认删除
    $("#confirmDialog").click(function () {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/questions/del?seq_no=' + $('#seq_no').val(),
            "data": {},
            "success": function (data) {
                window.location.reload();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    });

    // 动态绑定编辑事件
    $(document).on("click", ".employee_edit", function () {
        debugger;
        $('#seq_no').val($(this).attr('data-id'));
        //请求数据自动填充
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/account/list?seq_no=' + $('#seq_no').val(),
            "data": {},
            "success": function (data) {
                $("input[name='part']:eq("+(data.data[0].part-1)+")").attr("checked",'checked');
                $("#account_id").val(data.data[0].account_id);
                $("#name").val(data.data[0].name);
                $("#sex").val(data.data[0].sex);
                $("#password").val(data.data[0].password);
                $("#class").val(data.data[0].class);
                $("#year").val(data.data[0].year);
                if(data.data[0].part == 2){ //学生
                    $('#addclass').show();
                } else {
                    $('#addclass').hide();
                }
            },
            "error": function (data) {
                console.log(data);
            }
        });
        // 显示成功对话框
        $('#addAccountModal').modal('show');
    });
    //
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





