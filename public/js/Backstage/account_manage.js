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
    var new_account_id;//新数据的编号（最大+1)
    var classOption = '';
    var $p_id = $("#account_manage_page");


    function init() {
        var params = { // 查询查询参数
            name: $p_id.find('#name_q').val(), // 名字
            sex: $p_id.find('#sex_q').val(), // 性别
            account_id: $p_id.find('#account_id_q').val(), // 帐号
            part: $p_id.find('#part_q').val(), // 角色
            status: $p_id.find('#status_q').val(), // 状态
        };

        var table_src = $('#account_Table'); // 定义指向
        var ajax_url = '/account/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "account_id"},
            {"col_id": "name"},
            {"col_id": "sex"},
            {"col_id": "part"},
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
                if(data == 3){
                    return '<td><div class="text-center">管理员</div></td>';
                }
                if(data == 1){
                    return '<td><div class="text-center">教师</div></td>';
                }
                if(data == 2){
                    return '<td><div class="text-center">学生</div></td>';
                }
            }
        },{
            "colIndex": 4,
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
            "colIndex": 5,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.account_id == 'P10000') {
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
        //定义new_account_id为最新唯一ID
        if(!new_account_id){
            new_account_id = data.data[0].account_id;
            var str = new_account_id.split("P");
            str = parseInt(str[1])+1;
            new_account_id = 'P' + str;
        }

        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }

    //添加用户弹窗
    $('#addStaffModal').on('click', function () {
        $("input[name='part']:eq(1)").attr("checked",'checked');
        $("#account_id").val(new_account_id);
        $("#name").val('');
        $("#sex").val('男');
        $("#password").val(new_account_id);
        $('#addclass').show();
        $p_id.find("#img_url").val('');
        $('#addAccountModal').modal('show');
        $('#seq_no').val('0');
        $('#addclassbtn').hide();
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
        if (addpart == 2) { //学生
            $('#addclass').show();
            $('#addclassbtn').hide();
            $('#class').empty();
            add_class();
        } else if (addpart == 1) {  //教师
            $('#addclass').show();
            $('#addclassbtn').show();
            $('#class').empty();
            add_class();
        } else if (addpart == 3) {  //管理员
            $('#addclass').hide();
            $('#addclassbtn').hide();
            $('#class').empty();
        }
    });

    //确认添加按钮
    $('#save_account').on('click', function () {
        // 默认允许提交
        var holdSubmit = true;
        if(!$p_id.find("#img_url").val()){
            alert('请上传头像');
            return;
        }
        if ($('#add_account_form').isValid()) {
            if (holdSubmit) {
                // 只提交一次
                holdSubmit = false;
                var params = {
                    img_url:$p_id.find("#img_url").val(),
                    part:$("input[name='part']:checked").val(),
                    account_id:$("#account_id").val(),
                    name:$("#name").val(),
                    sex:$("#sex").val(),
                    password:$("#password").val()
                };
                params.class = '';
                $p_id.find('#class [name="class"]').each(function(){
                    params.class += $(this).val()+';';
                });
                params.class = params.class.substring(0,(params.class.length-1));
                //新建
                if($('#seq_no').val() == 0){

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
    // 动态绑定编辑事件
    $(document).on("click", ".employee_edit", function () {
        $('#seq_no').val($(this).attr('data-id'));
        //请求数据自动填充
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/account/list?seq_no=' + $('#seq_no').val(),
            "data": {},
            "success": function (data) {
                add_top_img(data.data[0].img_url);
                $p_id.find("#img_url").val(data.data[0].img_url);
                $("input[name='part']:eq("+(data.data[0].part-1)+")").attr("checked",'checked');
                $("#account_id").val(data.data[0].account_id);
                $("#name").val(data.data[0].name);
                $("#sex").val(data.data[0].sex);
                $("#password").val(data.data[0].password);
                if(data.data[0].part == 3){ //学生
                    $('#addclass').hide();
                } else {
                    $('#addclass').show();
                    var class_info = data.data[0].class.split(';');
                    debugger;
                    $p_id.find('#class').empty();
                    for(var i=0; i<class_info.length; i++){
                        add_class();
                    }
                    var num = 0;
                    $p_id.find('#class [name="class"]').each(function(){
                        $(this).val(class_info[num]);
                        num++;
                    });
                }
            },
            "error": function (data) {
                console.log(data);
            }
        });
        // 显示成功对话框
        $('#addAccountModal').modal('show');
    });

    // 动态绑定重置密码事件
    $(document).on("click", ".employee_resetpass", function () {
        $('#seq_no').val($(this).attr('data-id'));
        // 显示成功对话框
        $("#sureReset").modal('show');
    });
    // 确认修改密码
    $("#resetPassword").click(function () {
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/account/resetPassword?seq_no=' + $('#seq_no').val(),
            "data": {},
            "success": function (data) {
                window.location.reload();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    });


    // 添加班级按钮
    $("#addclassbtn").click(function () {
        add_class();
    });
    // 获取班级列表
    $.ajax({
        "dataType": 'json',
        "type": "get",
        "timeout": 20000,
        "url": '/grouping/classOther',
        async:false,
        "data": {},
        "success": function (data) {
            classOption += '<div class="class j_theme_choose w-40" style="height: 50px;">' +
            '<select class="form-control mt-1 w-40" name="class" data-rule="班级:required;">' +
                '<option value="">请选择</option>';
            for(var i=0; i<data.length; i++){
                classOption += '<option value="'+data[i].num1+'">'+data[i].key_val_cn+'</option>';
            }
            classOption += '</select>' +
                '<button type="button" class="close closefirst" data-dismiss="alert" data-id="1" style="display:none;position: inherit;margin: -48px -12px 0 0;"></button> ' +
                '</div>';
            debugger;
        },
        "error": function (data) {
            console.log(data);
        }
    });
    // 添加班级方法
    function add_class(){
        $p_id.find("#class").append(classOption);
        $p_id.find(".class").mouseenter(function(){
            $(this).find(".closefirst").css("display","inherit");
        });
        $p_id.find(".class").mouseleave(function(){
            $(this).find(".closefirst").css("display","none");
        });
        $p_id.find(".closefirst").click(function(){
            if($p_id.find('#class').children('div').length>1){
                $(this).parent().remove();
            }
        });
    }
    add_class();


    var picClient =new PicClient();

    //添加头部图片
    function add_top_img(top_img_url){
        $p_id.find("#img_cover_ul").empty();
        $p_id.find("#img_cover_ul").append('<li class="alert alert-dismissable"> ' +
            '<strong> ' +
            '<img id="img_cover1" src="'+top_img_url+'" alt="" width="120" height="160"> ' +
            '</strong> ' +
            '</li>');
    }

    picClient.addsingles(['add_top_img'],function callback(date1,date2,date3){
        setTimeout(function () {
            add_top_img('');
            $p_id.find('#img_cover1').attr('src','upload/'+JSON.parse(date2).date);
            $p_id.find("#img_url").val('upload/'+JSON.parse(date2).date);
        }, 1000);
    });

    $(".uploadify-button-text").attr("style","margin:0");
    $("#add_top_img-queue").attr("id","add_top__img-queue");

});





