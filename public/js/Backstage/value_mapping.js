/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var seq_no;
    var new_seq_no;
    var $p_id = $("#value_mapping_page");

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
            num1: $p_id.find('#seq_q').val(), // 编号
            type: $p_id.find('#type').val(), // 类型
            key_id: $p_id.find('#key_name').val(), // 关键字
            key_val_cn: $p_id.find('#name_n').val(), // 名称
            date1S: $p_id.find('#search_s').val(), // 时间起
            date1E: $p_id.find('#search_e').val(), // 时间止
        };
        var table_src = $('#account_Table'); // 定义指向
        var ajax_url = '/value_mapping/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "num1"},
            {"col_id": "type"},
            {"col_id": "key_id"},
            {"col_id": "key_val_cn"},
            {"col_id": "date1"},
        ]; // 定义表格数据列id
        debugger;
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
                return '<td><div class="text-center">' + data + '</div></td>';
            }
        },{
            "colIndex": 5,
            "html": function (data, type, full) {
                var retHtml = '';
                if (full.num1) {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="javascript:void(0)" data-id="'+full.num1+'" data-toggle="modal">编辑</a></li>' +
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.num1+'" data-toggle="modal">删除</a></li>' +
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
        new_seq_no=data.data[0].seq_no;
        debugger;
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

    // 动态绑定编辑事件
    $(document).on("click", ".employee_edit", function () {
        debugger;
        seq_no = $(this).attr('data-id');
        //查询详情 并自动填充
        $.ajax({
            type: "get",
            url: "/role_info/get?seq_no="+seq_no,
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                $p_id.find("#idLab").val(data[0].seq_no);
                $p_id.find("#nameLab").val(data[0].role_name);
                var chk1 = document.getElementById('check1');
                if(data[0].menu_id.indexOf(';1;') >= 0){
                    chk1.checked = true;
                }else{
                    chk1.checked = false;
                }
                var chk2 = document.getElementById('check2');
                if(data[0].menu_id.indexOf(';2;') >= 0){
                    chk2.checked = true;
                }else{
                    chk2.checked = false;
                }
                var chk3 = document.getElementById('check3');
                if(data[0].menu_id.indexOf(';3;') >= 0){
                    chk3.checked = true;
                }else{
                    chk3.checked = false;
                }
                var chk4 = document.getElementById('check4');
                if(data[0].menu_id.indexOf(';4;') >= 0){
                    chk4.checked = true;
                }else{
                    chk4.checked = false;
                }
                var chk5 = document.getElementById('check5');
                if(data[0].menu_id.indexOf(';5;') >= 0){
                    chk5.checked = true;
                }else{
                    chk5.checked = false;
                }

            },
            error: function (data) {
                alert("系统错误");
            }
        });
        // 显示成功对话框
        $("#addAccountModal").modal('show');
        //保存
        $('#save_account').on('click', function () {
            var chk6 = document.getElementById('check1');
            var chk7 = document.getElementById('check2');
            var chk8 = document.getElementById('check3');
            var chk9 = document.getElementById('check4');
            var chk10 = document.getElementById('check5');
            debugger;
            var menu_id = ';';
            if(chk6.checked == true){
                menu_id += 1+';';
            }
            debugger;
            if(chk7.checked == true){
                menu_id += 2+';';
            }
            if(chk8.checked == true){
                menu_id += 3+';';
            }
            if(chk9.checked == true){
                menu_id += 4+';';
            }
            if(chk10.checked == true){
                menu_id += 5+';';
            }
            debugger;
            var data = {
                menu_id:menu_id,
                role_name:$("#nameLab").val(),
            };
            $.ajax({
                type: "post",
                url: '/role_info/insert?seq_no='+seq_no,
                dataType: "json",
                data: data,
                success: function (data) {
                    debugger;
                    alert("提交成功！");
                    window.location.reload();
                },
                error: function (data) {
                    alert("系统错误");
                }
            })
        });
    });
    $(document).on("click", ".employee_del", function () {
        $("#delAccountModal").modal('show');
        $('#del_account').on('click', function () {
            $.ajax({
                type: "post",
                url: '/role_info/del?seq_no='+seq_no,
                dataType: "json",
                data:{},
                success: function (data) {
                    debugger;
                    alert("删除成功！");
                    window.location.reload();
                },
                error: function (data) {
                    alert("系统错误");
                }
            })
        });
    });
    //添加用户弹窗
    $('#addStaffModal').on('click', function () {
        $('#newAccountModal').modal('show');
        $('#new_account').on('click', function () {
            var chka = document.getElementById('Ncheck1');
            var chkb = document.getElementById('Ncheck2');
            var chkc = document.getElementById('Ncheck3');
            var chkd = document.getElementById('Ncheck4');
            var chke = document.getElementById('Ncheck5');
            debugger;
            var menu_id = ';';
            if(chka.checked == true){
                menu_id += 1+';';
            }
            debugger;
            if(chkb.checked == true){
                menu_id += 2+';';
            }
            if(chkc.checked == true){
                menu_id += 3+';';
            }
            if(chkd.checked == true){
                menu_id += 4+';';
            }
            if(chke.checked == true){
                menu_id += 5+';';
            }
            debugger;
            new_seq = parseInt(new_seq_no);
            var data = {
                menu_id:menu_id,
                role_name:$("#newnameLab").val(),
                seq_no:new_seq+1,
                status:1,
            };
            debugger;
            $.ajax({
                type: "post",
                url: '/role_info/ins',
                dataType: "json",
                data: data,
                success: function (data) {
                    debugger;
                    alert("提交成功！");
                    window.location.reload();
                },
                error: function (data) {
                    alert("系统错误");
                }
            })
        });
    });
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

})





