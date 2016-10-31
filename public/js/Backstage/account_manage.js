/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });

    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });
    var tempObj;
    var tempEmpObj;
    var $p_id = $("#account_manage_page");
    var usernameList = []; //保存所有帐号


    function init() {
        var params = { // 查询查询参数
            name: $p_id.find('#name_q').val(), // 名字
            sex: $p_id.find('#sex_q').val(), // 性别
            username: $p_id.find('#username_q').val(), // 帐号
            part: $p_id.find('#part_q').val(), // 角色
            year: $p_id.find('#year_q').val(), // 年级
            class: $p_id.find('#class_q').val(), // 班级
            status: $p_id.find('#status_q').val(), // 状态
        };

        var table_src = $('#account_Table'); // 定义指向
        var ajax_url = '/account/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "username"},
            {"col_id": "name"},
            {"col_id": "sex"},
            {"col_id": "part"},
            {"col_id": "year"},
            {"col_id": "class"},
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
                return '<td><div class="text-center">' + data + '</div></td>';
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
        }, {
            "colIndex": 4,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                var text = '';
                /*for (var i = 0; i < fnemployeePage.stautss.length; i++) {
                 if (fnemployeePage.stautss[i].key_id == data) {
                 text = fnemployeePage.stautss[i].key_val_cn;
                 }
                 }*/
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 5,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                var text = '';
                /*for (var i = 0; i < fnemployeePage.stautss.length; i++) {
                 if (fnemployeePage.stautss[i].key_id == data) {
                 text = fnemployeePage.stautss[i].key_val_cn;
                 }
                 }*/
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 6,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                var text = '';
                if(data == 1){
                    return '<td><div class="text-center">正常</div></td>';
                }else if(data == 2){

                    return '<td><div class="text-center">删除</div></td>';
                }
                /*for (var i = 0; i < fnemployeePage.stautss.length; i++) {
                 if (fnemployeePage.stautss[i].key_id == data) {
                 text = fnemployeePage.stautss[i].key_val_cn;
                 }
                 }*/
            }
        }, {
            "colIndex": 7,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.username == 'admin') {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_resetpass" href="javascript:void(0)">重置密码</a></li>' +
                        '</ul>' +
                        '</div>';
                } else {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">编辑</a></li>' +
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>' +
                        '<li><a class="employee_resetpass" data-id="'+full.seq_no+'" href="javascript:void(0)">重置密码</a></li>' +
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


    init();

    //搜索后列表重构
    $("#employeeSeatchBut").on('click',function(){
        init();
    });

    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        debugger;
        for(var i=0; i<data.data.length ;i++){
            usernameList[i] = data.data[i].username;
        }
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }

    //添加用户弹窗
    $('#addStaffModal').on('click', function () {
        $('#addAccountModal').modal('show');
        $('#seq_no').val('0');
    });

    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

    //根据添加用户类型，来显示（隐藏）班级信息
    $("input[name='part']").change(function() {
        var addpart = $("input[name='part']:checked").val();
        if (addpart == 1) { //学生
            $('#addclass').show();
            $('#class').attr('data-rule','班级:required;');
            $('#year').attr('data-rule','年级:required;');
        } else if (addpart == 2) {  //教师
            $('#addclass').hide();
            $('#class').attr('data-rule','班级;');
            $('#year').attr('data-rule','年级;');
        } else if (addpart == 3) {  //管理员
            $('#addclass').hide();
            $('#class').attr('data-rule','班级;');
            $('#year').attr('data-rule','年级;');
        }
    });

    //确认添加按钮
    $('#save_account').on('click', function () {
        // 默认允许提交
        var holdSubmit = true;
        for(var i=0; i<usernameList.length ;i++){
            if(usernameList[i] == $('#username').val()){
                $('#username').attr('class','form-control n-invalid');
                return;
            }
        }

        debugger;
        if ($('#add_account_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var params = {
                    part:$("input[name='part']:checked").val(),
                    account_id:$("#account_id").val(),
                    name:$("#name").val(),
                    sex:$("#sex").val(),
                    username:$("#username").val(),
                    password:$("#password").val()
                };
                //新建
                if($('#seq_no').val() == 0){
                    if(params.part == 1){//学生
                        params.year = $("#year").val();
                        params.class = $("#class").val();
                    }
                    params.status = 1;
                    params.regTime = new Date();
                    $.ajax({
                        "dataType": 'json',
                        "type": "get",
                        "timeout": 20000,
                        "url": '/account/new',
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
                        "url": '/account/new',
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
        debugger;
        $('#seq_no').val($(this).attr('data-id'));
        // 显示成功对话框
        $("#sureDel").modal('show');
        //if(confirm("确认要删除该员工信息吗？")){
        //    fnemployeePage.delEmployee($(this));
        //}
    });

    $("#confirmDialog").click(function () {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/account/del?seq_no=' + $('#seq_no').val(),
            "data": {},
            "success": function (data) {
                window.location.reload();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    });


});





