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

    function init() {
        debugger;
        var params = { // 查询查询参数
            seq_no: $p_id.find('#seq_no_q').val(), // 编号
            question: $p_id.find('#question_q').val(), // 题目
            score: $p_id.find('#score_q').val(), // 分值
            remarks: $p_id.find('#remarks_q').val(), // 题目类型：听说题目，听力题目
            account_id: $p_id.find('#account_id_q').val(), // 上传帐号
            public: $p_id.find('#public_q').val(), // 是否公开
            status: $p_id.find('#status_q').val() // 状态
        };
        var table_src = $('#questions_Table'); // 定义指向
        var ajax_url = '/questions/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},
            {"col_id": "question"},
            {"col_id": "score"},
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
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 5,
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
            "colIndex": 6,
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
            "colIndex": 7,
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
    //搜索后列表重构
    $("#employeeSeatchBut").on('click',function(){
        init();
    });
    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        debugger;
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }
    init();


    //$("select").select2({
    //    minimumResultsForSearch: Infinity   //隐藏下拉列表搜索框。Infinity可以数字替换，下拉列表项的最少条目数等于该数字时出现搜索框。
    //}); // 美化下拉列表
    //$(document).on("click", ".employee_edit", function () {
    //    debugger;
    //    seq_no = $(this).attr('data-id');
    //    //查询详情 并自动填充
    //    $.ajax({
    //        type: "get",
    //        url: "/course_info/get?seq_no="+seq_no,
    //        dataType: "json",
    //        data: {},
    //        success: function (data) {
    //            debugger;
    //            var $p_id = $("#course_add_page");
    //            $p_id.find("#class_name").val(data[0].name);
    //            $p_id.find("#take_lass").val(data[0].class);
    //            $p_id.find("#class_Time").val(data[0].class_time);
    //            debugger;
    //            window.location.href="course_add"
    //        },
    //        error: function (data) {
    //            alert("系统错误");
    //        }
    //    });
    //});
    ////删除
    //$(document).on("click", ".employee_del", function () {
    //    $("#delclassModal").modal('show');
    //    seq_no = $(this).attr('data-id');
    //    $('#del_class').on('click', function () {
    //        $.ajax({
    //            type: "post",
    //            url: '/course_info/del?seq_no='+seq_no,
    //            dataType: "json",
    //            data:{},
    //            success: function (data) {
    //                debugger;
    //                alert("删除成功！");
    //                window.location.reload();
    //            },
    //            error: function (data) {
    //                alert("系统错误");
    //                debugger;
    //            }
    //        })
    //    });
    //});
    ////弹出框居中
    //$('.modal').on('show.bs.modal', function () {
    //    $(this).addClass('modal-outer');
    //}).on('hidden.bs.modal', function () {
    //    $(this).removeClass('modal-outer');
    //});
})





