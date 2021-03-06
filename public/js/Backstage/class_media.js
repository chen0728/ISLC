/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var $p_id = $("#class_media_page");
    var part = $("#menu_id").val();
    debugger;
    if(part.indexOf("5")> -1){
        var ajax_url_ = '/course_manage/list'
    }else if(part.indexOf("6")> -1){
        var ajax_url_ = '/course_manage/media'
    }else{
        var ajax_url_ = '/course_manage/other'
    }
    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });
    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });
    function init() {
        var params = { // 查询查询参数
            account_id:$("#login_account_id").val(),//账号
            name: $p_id.find('#nameIn').val(), // 课程名
            number: $p_id.find('#numIn').val(), // 编号
            creat_timeS: $p_id.find('#search_s').val(), // 创建时间起
            creat_timeE: $p_id.find('#search_e').val(), // 创建时间止
            class_timeS: $p_id.find('#class_s').val(), // 上课时间起
            class_timeE: $p_id.find('#class_e').val(), // 上课时间止
            class_status: $p_id.find('#status_q').val(), // 已上
        };
        var table_src = $('#class_media_Table'); // 定义指向
        var ajax_url = ajax_url_; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "name"},
            {"col_id": "number"},
            {"col_id": "creat_time"},
            {"col_id": "class_time"},
            {"col_id": "class_status"},
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
        },{
            "colIndex": 4,
            "html": function (data, type, full) {
                if (!data) {
                    return '';
                }
                if(full.class_status == 1){
                    return '<td><div class="text-center">已上</div></td>';
                }
                return '<td><div class="text-center">未上</div></td>';
            }
        },{
            "colIndex": 5,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.seq_no) {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="media_player?seq_no='+full.seq_no+'" target="_blank" data-title="资料查看" id="dropLabel-2" aria-expanded="false" class="classLimit" >查看</a>' +
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
    //限制添加更改页面
    $('.classLimit').on('click',function(){
        debugger;
        $(".nav-main ul li").each(function(){
            if($(this).html().indexOf('资料查看') > -1){
                $(this).find(".close-page").trigger("click");
            }
        });
    });;
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

    //日历控件
    //var nowTemp = new Date();
    //var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    $('.form_datetime').each(function (i, n) {
        var $date = $(n).find('.datepicker');

        var checkout = $date.eq(1).datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            language: 'zh-TW',
            autoclose: true
        }).data('datetimepicker');

        var checkin = $date.eq(0).datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            language: 'zh-TW',
            autoclose: true
        }).on('changeDate', function (ev) {
            //if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate());
            debugger;
            checkout.setDate(newDate);
            checkout.setStartDate(newDate);
            //}
            $date.eq(1).focus();
        }).data('datetimepicker');
    });
//日历控件
//    var nowTemp = new Date();
//    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    $('.j_datebetween').each(function (i, n) {
        var $date = $(n).find('.j_datepicker');
        var checkin = $date.eq(0).datepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            autoclose: true
        }).on('changeDate', function (ev) {
            //if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.setDate(newDate);
            checkout.setStartDate(newDate);
            //}
            $date.eq(1).focus();
        }).data('datepicker');

        var checkout = $date.eq(1).datepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            autoclose: true
        }).data('datepicker');
    });

})





