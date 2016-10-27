/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var $p_id = $("#account_manage_page");
    function init() {
        var params = { // 查询查询参数
            name: $p_id.find('#name_q').val(), // 员工工号
            sex: $p_id.find('#sex_q').val(), // 员工工号
            username: $p_id.find('#username_q').val(), // 员工工号
            part: $p_id.find('#part_q').val(), // 员工工号
            class: $p_id.find('#class_q').val(), // 员工工号
            status: $p_id.find('#status_q').val(), // 员工工号
        };

        var table_src = $('#account_Table'); // 定义指向
        var ajax_url = '/account/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "name"},
            {"col_id": "sex"},
            {"col_id": "username"},
            {"col_id": "part"},
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
                return '<td><div class="text-center">' + text + '</div></td>';
            }
        }, {
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
                return '<td><div class="text-center">' + text + '</div></td>';
            }
        }, {
            "colIndex": 6,
            "html": function (data, type, full) {
                var html = '<li><a class="change_stauts_up" href="javascript:void(0)">解禁</a></li>';
                if (full.status == 0) { // 正常
                    html = '<li><a class="change_stauts_down" href="javascript:void(0)">禁用</a></li>';
                }
                var retHtml = '';
                if (full.user_no == 'admin') {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_resetpass" href="javascript:void(0)">重置密码</a></li>' +
                        '</ul>' +
                        '</div>';
                } else {
                    if (full.user_no == $("#emp_id").val()) {
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                            '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                            '<li><a class="employee_edit" href="javascript:void(0)" data-toggle="modal">编辑</a></li>' +
                            '<li><a class="employee_resetpass" href="javascript:void(0)">重置密码</a></li>' +
                            '</ul>' +
                            '</div>';
                    } else {
                        retHtml = retHtml + '<div class="drop-opt">' +
                            '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                            '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                            '<li><a class="employee_edit" href="javascript:void(0)" data-toggle="modal">编辑</a></li>' + html +
                            '<li><a class="employee_del" href="javascript:void(0)">删除</a></li>' +
                            '<li><a class="employee_resetpass" href="javascript:void(0)">重置密码</a></li>' +
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
    //获取到数据的回调函数，需要更该时可定义
    function fnChangeDataCallback(data){
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }
    init();


    $("select").select2({
        minimumResultsForSearch: Infinity   //隐藏下拉列表搜索框。Infinity可以数字替换，下拉列表项的最少条目数等于该数字时出现搜索框。
    }); // 美化下拉列表

    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });
})





