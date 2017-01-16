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
    var $p_id = $("#operation_record_page");


    function init() {
        var params = { // 查询查询参数
            seq_no: $p_id.find('#seq_no_q').val(), // 编号
            operator_name: $p_id.find('#operator_name_q').val(), // 姓名
            operation_type: $p_id.find('#operation_type_q').val(), // 操作类型
            operat_time_s: $p_id.find('#operat_time_s').val(), // 操作时间
            operat_time_e: $p_id.find('#operat_time_e').val(), // 操作时间
        };

        var table_src = $('#operation_Table'); // 定义指向
        var ajax_url = '/operation/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},   //编号
            {"col_id": "operator_name"},    //姓名
            {"col_id": "operation_type"},   //类型
            {"col_id": "operat_time"},  //时间
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
                data = moment(data).format('YYYY-MM-DD HH:mm:ss');
                var text = '';
                /*for (var i = 0; i < fnemployeePage.stautss.length; i++) {
                 if (fnemployeePage.stautss[i].key_id == data) {
                 text = fnemployeePage.stautss[i].key_val_cn;
                 }
                 }*/
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        }, {
            "colIndex": 4,
            "html": function (data, type, full) {
                var retHtml =  '<div class="drop-opt">' +
                    '<a class="employee_edit" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">查看</a>' +
                    '</div>';

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
        return data;
    }
    //绘画完成之后的回调函数
    function fnDrawCallback(data){
        return data;
    }

    // 动态绑定查看事件
    $(document).on("click", ".employee_edit", function () {
        $('#seq_no').val($(this).attr('data-id'));
        //请求数据自动填充
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "url": '/operation/list?seq_no=' + $(this).attr('data-id'),
            "data": {},
            "success": function (data) {
                debugger;
                if(data.data[0].operat_time){
                    data.data[0].operat_time = moment(data.data[0].operat_time).format('YYYY-MM-DD HH:mm:ss');
                }
                $("#seq_no").html('日志编号：'+data.data[0].seq_no);
                $("#name").html(data.data[0].operator_name);
                $("#operat_time").html('操作时间：'+data.data[0].operat_time);
                $("#remarks").val(data.data[0].operator_name+'（'+data.data[0].operator_id+'）在 '+data.data[0].operat_time+' 对（'+data.data[0].record_id+'）进行了 '+data.data[0].operation_type+' 操作');

            },
            "error": function (data) {
                console.log(data);
            }
        });
        // 显示成功对话框
        $('#addAccountModal').modal('show');
    });

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

});





