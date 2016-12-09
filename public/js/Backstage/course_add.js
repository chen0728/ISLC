/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */
$(function () {
    var seq_class_arr = [];
    var seq_data_chec;
    var seq_data_arrIn = [];
    var seq_data_arr = [];
    var seq_question_arr = [];
    var new_seq_no;
    var new_num;

    var $p_id = $("#course_add_page");
    //修改课程
    if($p_id.find("#seq_no").val() != ''){
        seq_no = $p_id.find("#seq_no").val()
        //查询详情 并自动填充
        $.ajax({
            type: "get",
            url: "/course_info/get?seq_no="+seq_no,
            dataType: "json",
            data: {},
            success: function (data) {
                $p_id.find("#class_name_").val(data[0].name);//填充课程名
                $p_id.find("#class_Time_").val(data[0].class_time);//填充上课时间
                //填充上课班级
                var seq_class = data[0].class.split(";");
                for(var i=0;i<seq_class.length;i++){
                    seq_class_arr.push(seq_class[i]);
                    var seq_noName = seq_class[i];
                    $.ajax({
                        type: "post",
                        url: '/grouping/className?seq_no='+seq_noName,
                        dataType: "json",
                        data:{},
                        success: function (data) {
                            if(data.length >0){
                                $p_id.find("#class_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].key_val_cn+
                                    '<button type="button" class="close closefirst" data-dismiss="alert" data-id="'+data[0].num1+'" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                                $(document).ready(function(){
                                    $(".guanlian").mouseenter(function(){
                                        $(this).find(".close").css("display","inherit");
                                    });
                                    $(".guanlian").mouseleave(function(){
                                        $(this).find(".close").css("display","none");
                                    });
                                    $(".close").on('click',function(){
                                        for( var i=0;i<seq_class_arr.length;i++){
                                            if($(this).attr('data-id') == seq_class_arr[i]){
                                                seq_class_arr.splice(i,1);
                                            }
                                        }
                                        $(this).parent().remove();
                                    });
                                });
                            }
                        },
                        error: function (data) {
                            alert("系统错误");
                        }
                    });
                }
                //填充关联资料
                var seq_data = data[0].related_data.split(";");
                for(var i=0;i<seq_data.length;i++){
                    seq_data_arr.push(seq_data[i]);
                    var seq_nol=seq_data[i];
                    $.ajax({
                        type: "get",
                        url: "/course_info/getl?seq_nol="+seq_nol,
                        dataType: "json",
                        data: {},
                        success: function (data) {
                            $p_id.find("#data_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].name+
                                '<button type="button" class="close closefirst" data-dismiss="alert" data-id="'+data[0].seq_no+'" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                            $(document).ready(function(){
                                $(".guanlian").mouseenter(function(){
                                    $(this).find(".close").css("display","inherit");
                                });
                                $(".guanlian").mouseleave(function(){
                                    $(this).find(".close").css("display","none");
                                });
                                $(".close").on('click',function(){
                                    for( var i=0;i<seq_data_arr.length;i++){
                                        if($(this).attr('data-id') == seq_data_arr[i]){
                                            seq_data_arr.splice(i,1);
                                        }
                                    }
                                    $(this).parent().remove();
                                });
                            });
                        },
                        error: function (data) {
                            alert("系统错误");
                        }
                    });
                }
                //填充关联题库
                var seq_question = data[0].related_question.split(";");
                for(var i=0;i<seq_question.length;i++){
                    seq_question_arr.push(seq_question[i]);
                    var seq_no=seq_question[i];
                    $.ajax({
                        type: "get",
                        url: "/course_info/qusetion?seq_no="+seq_no,
                        dataType: "json",
                        data: {},
                        success: function (data) {
                            $p_id.find("#question_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].question_name+
                                '<button type="button" class="close closefirst" data-dismiss="alert" data-id="'+data[0].seq_no+'" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                            $(document).ready(function(){
                                $(".guanlian").mouseenter(function(){
                                    $(this).find(".close").css("display","inherit");
                                });
                                $(".guanlian").mouseleave(function(){
                                    $(this).find(".close").css("display","none");
                                });
                                $(".close").on('click',function(){
                                    for( var i=0;i<seq_question_arr.length;i++){
                                        if($(this).attr('data-id') == seq_question_arr[i]){
                                            seq_question_arr.splice(i,1);
                                        }
                                    }
                                    $(this).parent().remove();
                                });
                            });
                        },
                        error: function (data) {
                            alert("系统错误");
                        }
                    });
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        });

        $('.j_bubble').click(function (event) {
            event.stopPropagation();
        });

        // 阻止回车触发表格填充事件
        $('.j_bubble').keypress(function (e) {
            e.stopPropagation();
        });
        //创建课程
    }else{

    }


    $("select").select2({
        minimumResultsForSearch: Infinity   //隐藏下拉列表搜索框。Infinity可以数字替换，下拉列表项的最少条目数等于该数字时出现搜索框。
    });
    //添加班级弹窗
    $p_id.find("#addClass").on('click',function(){
        //填充班级下拉菜单
        $("#classelect").empty();
        $("#classelect").append('<option value="1" select="true">请选择班级</option>');
        $("#add_class_form .select2-chosen").html('请选择班级');
        seq_no = $('#login_account_id').val();
        $.ajax({
            type: "post",
            url: '/grouping/class?seq_no='+seq_no,
            dataType: "json",
            data:{},
            success: function (data) {
                var clas_seq = data[0].class.split(";");
                for(var i=0;i<clas_seq.length;i++){
                    var seq_noName = clas_seq[i];
                    $.ajax({
                        type: "post",
                        url: '/grouping/className?seq_no='+seq_noName,
                        dataType: "json",
                        data:{},
                        success: function (data) {
                            if(data.length >0){
                                var option;
                                for( var i=0;i<seq_class_arr.length;i++){
                                    if(data[0].num1 == seq_class_arr[i]){
                                        debugger;
                                        option = 1;
                                    };
                                }
                                if(option != 1){
                                    $("#classelect").append('<option value="'+data[0].key_id+'">'+data[0].key_val_cn+'</option>')
                                };
                            };
                        },
                        error: function (data) {
                            alert("系统错误");
                        }
                    });
                }
            },
            error: function (data) {
                alert("系统错误");
            }
        });
        $p_id.find("#addClassModal").modal('show');
    });
    //添加班级
    $p_id.find("#classelect").on('change',function(){
        var seq_class_no = $p_id.find("#classelect").val();
        seq_class_arr.push(seq_class_no);
        debugger;
            $.ajax({
                type: "post",
                url: '/grouping/className?seq_no='+seq_class_no,
                dataType: "json",
                data:{},
                success: function (data) {
                    if(data.length >0){
                        $p_id.find("#class_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].key_val_cn+
                            '<button type="button" class="close closefirst" data-dismiss="alert" data-id="'+data[0].num1+'" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                        $(document).ready(function(){
                            $(".guanlian").mouseenter(function(){
                                $(this).find(".close").css("display","inherit");
                            });
                            $(".guanlian").mouseleave(function(){
                                $(this).find(".close").css("display","none");
                            });
                            $(".close").on('click',function(){
                                for( var i=0;i<seq_class_arr.length;i++){
                                    if($(this).attr('data-id') == seq_class_arr[i]){
                                        debugger;
                                        seq_class_arr.splice(i,1);
                                    }
                                }
                                $(this).parent().remove();
                            });
                        });
                    }
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        $p_id.find("#addClassModal").modal('hide');
    });
    //点击确定
    $p_id.find("#save_class").on('click',function(){
        alert("您还未选择任何班级！");
    });
    //添加资料弹窗
    $p_id.find("#addData").on('click',function(){
        //弹出框列表查询
        function init() {
            var params = { // 查询查询参数
                accouat_id:$("#login_account_id").val(),
                name: $p_id.find('#nameIn_').val(),
                public: $p_id.find('#public_').val(),
                up_timeS: $p_id.find('#search_s_').val(),
                up_timeE: $p_id.find('#search_e_').val(),
                seq_data_arr:seq_data_arr
            };
            var table_src = $('#course_add_Table'); // 定义指向
            var ajax_url = '/course_add/list'; // 定义数据请求路径
            var pageSize = 5 ;// 定义每页长度默认为10
            var aoColumns = [
                {"col_id": "name"},
                {"col_id": "public"},
                {"col_id": "up_time"},
            ]; // 定义表格数据列id
            var aoColumnDefs = [{
                "colIndex": 0,
                "html": function (data, type, full) {
                    if (!data) {
                        return '';
                    }
                    return '<td><div class="text-center" style="padding: 0px 10px;">' + data + '</div></td>';
                }
            }, {
                "colIndex": 1,
                "html": function (data, type, full) {
                    debugger;
                    if (!data) {
                        return '';
                    }
                    if(data == 1){
                        return '<td><div class="text-center" style="padding: 0px 5px;">公开</div></td>';
                    }else{
                        return '<td><div class="text-center" style="padding: 0px 5px;">个人</div></td>';
                    }
                }
            }, {
                "colIndex": 2,
                "html": function (data, type, full) {
                    if (!data) {
                        return '';
                    }
                    return '<td><div class="text-center" style="padding: 0px 5px;">' + data + '</div></td>';
                }
            }, {
                "colIndex": 3,
                "html": function (data, type, full) {
                    var retHtml = '';
                    if (full.seq_no) {
                        var check;
                        for( var i=0;i<seq_data_arrIn.length;i++){
                            if(full.seq_no == seq_data_arrIn[i]){
                                check = 1;
                            };
                        };
                        if(check == 1){
                            retHtml = retHtml + "<td><div class='text-center' style='padding: 0px 5px;' data-id='"+full.seq_no+"'><input id='"+full.seq_no+"' name='related_data_qwe' type='checkbox' class='add_zl' value='"+full.seq_no+"'checked='checked'></div></td>";
                        }else{
                            retHtml = retHtml + "<td><div class='text-center' style='padding: 0px 5px;' data-id='"+full.seq_no+"'><input id='"+full.seq_no+"' name='related_data_qwe' type='checkbox' class='add_zl' value='"+full.seq_no+"'></div></td>";
                        }
                    };
                    return retHtml;
                }

            }]; // 定义需要改变的列

            // 列表为空时的数据
            var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';
            // 绘画表格
            TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
        };
        //搜索后列表重构
        $("#SeatchBut").on('click',function(){
            init();
        });
        //获取到数据的回调函数，需要更该时可定义
        function fnChangeDataCallback(data){
            return data;
        }
        //绘画完成之后的回调函数
        function fnDrawCallback(data){
            //列表checkbox点击事件
            $p_id.find(".add_zl").on('click',function(){
                var seq_no = $(this).attr('value');
                seq_data_chec = $(this).attr('checked');
                //勾选事件
                if(seq_data_chec && seq_data_chec == 'checked'){
                    seq_data_arrIn.push(seq_no);
                }else{
                //去勾选事件
                    for( var i=0;i<seq_data_arrIn.length;i++){
                        if(seq_no == seq_data_arrIn[i]){
                            seq_data_arrIn.splice(i,1);
                        }
                    }
                }
            });
            return data;
        }
        init();
        $p_id.find("#addDataModal").modal('show');
    });
    //弹窗确定
    $p_id.find("#new_data").on('click',function(){
        for(var i=0;i<seq_data_arrIn.length;i++){
            seq_nol=seq_data_arrIn[i];
            $.ajax({
                type: "get",
                url: "/course_info/getl?seq_nol="+seq_nol,
                dataType: "json",
                data: {},
                success: function (data) {
                    $p_id.find("#data_tbody_").append('<div class="guanlian form-control alert-dismissable alert-policy-01 pull-left clearfix j_theme_choose" style="padding:6px 12px;width: auto; background: #e6e6e6;margin-right:10px;margin-bottom: 10px;"> ' +data[0].name+
                        '<button type="button" class="close closefirst" data-dismiss="alert" data-id="'+data[0].seq_no+'" style="position: inherit;margin: -20px -25px 0px -13px;"></button></div>');
                    $(document).ready(function(){
                        $(".guanlian").mouseenter(function(){
                            $(this).find(".close").css("display","inherit");
                        } );
                        $(".guanlian").mouseleave(function(){
                            $(this).find(".close").css("display","none");
                        });
                        $(".close").on('click',function(){
                            for( var i=0;i<seq_question_arr.length;i++){
                                if($(this).attr('data-id') == seq_question_arr[i]){
                                    seq_question_arr.splice(i,1);
                                }
                            }
                            $(this).parent().remove();
                        });
                    });
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
        }
        debugger;
        seq_data_arr = seq_data_arr.concat(seq_data_arrIn);
        seq_data_arrIn = [];
        $p_id.find("#addDataModal").modal('hide');
    });
    //添加题库弹窗
    $p_id.find("#addQuestion").on('click',function(){
        //弹出框列表查询
        function initS() {
            var params = { // 查询查询参数
                accouat_id:$("#login_account_id").val(),
                name: $p_id.find('#QnameIn').val(),
                public: $p_id.find('#public_').val(),
                up_timeS: $p_id.find('#search_s_').val(),
                up_timeE: $p_id.find('#search_e_').val(),
                seq_data_arr:seq_data_arr
            };
            var table_src = $('#course_add_Table'); // 定义指向
            var ajax_url = '/course_add/list'; // 定义数据请求路径
            var pageSize = 5 ;// 定义每页长度默认为10
            var aoColumns = [
                {"col_id": "name"},
                {"col_id": "public"},
                {"col_id": "up_time"},
            ]; // 定义表格数据列id
            var aoColumnDefs = [{
                "colIndex": 0,
                "html": function (data, type, full) {
                    if (!data) {
                        return '';
                    }
                    return '<td><div class="text-center" style="padding: 0px 10px;">' + data + '</div></td>';
                }
            }, {
                "colIndex": 1,
                "html": function (data, type, full) {
                    if (!data) {
                        return '';
                    }
                    if(data == 1){
                        return '<td><div class="text-center" style="padding: 0px 5px;">公开</div></td>';
                    }else{
                        return '<td><div class="text-center" style="padding: 0px 5px;">个人</div></td>';
                    }
                }
            }, {
                "colIndex": 2,
                "html": function (data, type, full) {
                    if (!data) {
                        return '';
                    }
                    return '<td><div class="text-center" style="padding: 0px 5px;">' + data + '</div></td>';
                }
            }, {
                "colIndex": 3,
                "html": function (data, type, full) {
                    var retHtml = '';
                    if (full.seq_no) {
                        var check;
                        for( var i=0;i<seq_data_arrIn.length;i++){
                            if(full.seq_no == seq_data_arrIn[i]){
                                check = 1;
                            };
                        };
                        if(check == 1){
                            retHtml = retHtml + "<td><div class='text-center' style='padding: 0px 5px;' data-id='"+full.seq_no+"'><input id='"+full.seq_no+"' name='related_data_qwe' type='checkbox' class='add_zl' value='"+full.seq_no+"'checked='checked'></div></td>";
                        }else{
                            retHtml = retHtml + "<td><div class='text-center' style='padding: 0px 5px;' data-id='"+full.seq_no+"'><input id='"+full.seq_no+"' name='related_data_qwe' type='checkbox' class='add_zl' value='"+full.seq_no+"'></div></td>";
                        }
                    };
                    return retHtml;
                }

            }]; // 定义需要改变的列

            // 列表为空时的数据
            var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';
            // 绘画表格
            TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
        };
        //搜索后列表重构
        $("#SeatchBut").on('click',function(){
            initS();
        });
        //获取到数据的回调函数，需要更该时可定义
        function fnChangeDataCallback(data){
            return data;
        }
        //绘画完成之后的回调函数
        function fnDrawCallback(data){
            //列表checkbox点击事件
            $p_id.find(".add_zl").on('click',function(){
                var seq_no = $(this).attr('value');
                seq_data_chec = $(this).attr('checked');
                //勾选事件
                if(seq_data_chec && seq_data_chec == 'checked'){
                    seq_data_arrIn.push(seq_no);
                }else{
                    //去勾选事件
                    for( var i=0;i<seq_data_arrIn.length;i++){
                        if(seq_no == seq_data_arrIn[i]){
                            seq_data_arrIn.splice(i,1);
                        }
                    }
                }
            });
            return data;
        }
        initS();
        $p_id.find("#addDataModal").modal('show');
    });
    //保存
    $p_id.find("#save_data").on('click',function(){
        if($p_id.find("#seq_no").val() == ''){
            //查询课堂seq_no
            $.ajax({
                type: "get",
                url: '/course_info/course_seq',
                async: false,
                dataType: "json",
                data:{},
                success: function (data) {
                    new_seq_no = parseInt(data[0].seq_no)+1;//新建seq_no
                    new_num = 'A'+(parseInt(data[0].number.split("A")[1])+1);//新建编号
                },
                error: function (data) {
                    alert("系统错误");
                }
            });
            var data = {
                seq_no:new_seq_no,
                name:$p_id.find('#class_name_').val(),
                number:new_num,
                class:seq_class_arr.join(";"),
                class_status:2,
                class_time:$p_id.find('#class_Time_').val(),
                status:1,
            };
            //$.ajax({
            //    type: "post",
            //    url: '/grouping/newGroup',
            //    dataType: "json",
            //    data: data,
            //    success: function (data) {
            //        $("#scene").val('');
            //        alert("提交成功！");
            //    },
            //    error: function (data) {
            //        alert("系统错误");
            //    }
            //});
        }

    });

});










