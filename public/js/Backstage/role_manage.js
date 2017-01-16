/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {
    var seq_no;
    var new_seq_no;
    var $p_id = $("#role_manage_page");

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
            seq_no: $p_id.find('#seq_q').val(), // 编号
            role_name: $p_id.find('#name_n').val(), // 员工工号
            date1s: $p_id.find('#search_s').val(), // 员工工号
            date1e: $p_id.find('#search_e').val(), // 员工工号
            date2s: $p_id.find('#new_s').val(), // 员工工号
            date2e: $p_id.find('#new_e').val(), // 员工工号
            menu_id: $p_id.find('#status_q').val(), // 员工工号
        };

        var table_src = $('#role_Table'); // 定义指向
        var ajax_url = '/role_info/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},
            {"col_id": "role_name"},
            {"col_id": "date1"},
            {"col_id": "date2"},
            {"col_id": "seq_no"},
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
                }
                if(full.menu_id == ';'){
                    return '<td><div class="text-center">未添加权限</div></td>';
                }else{
                    return '<td><div class="text-center">已添加权限</div></td>';
                }
            }
        }, {
            "colIndex": 5,
            "html": function (data, type, full) {
                var retHtml = '';
                retHtml = retHtml + '<div class="drop-opt">' +
                    '<a href="javascript:void(0)" class="employee_edit" id="dropLabel-2" data-id="'+full.seq_no+'" aria-haspopup="true" aria-expanded="false">查看</a>' +
                    //'<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                    //'<li><a class="employee_edit" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">编辑</a></li>' +
                    //'<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>' +
                    //'</ul>' +
                    '</div>';
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
                var chk2 = document.getElementById('check2');
                var chk3 = document.getElementById('check3');
                var chk4 = document.getElementById('check4');
                var chk5 = document.getElementById('check5');
                var chk6 = document.getElementById('check6');
                if(data[0].menu_id.indexOf(';1;') >= 0){
                    chk1.checked = true;
                    chk2.checked = true;
                    chk3.checked = true;
                    chk4.checked = true;
                    chk5.checked = true;
                }else{
                    chk1.checked = false;
                    chk2.checked = false;
                    chk3.checked = false;
                    chk4.checked = false;
                    chk5.checked = false;
                }
                if(data[0].menu_id.indexOf(';5;') >= 0){
                    chk5.checked = true;
                }else{
                    chk5.checked = false;
                }
                if(data[0].menu_id.indexOf(';6;') >= 0){
                    chk6.checked = true;
                }else{
                    chk6.checked = false;
                }

            },
            error: function (data) {
                alert("系统错误");
            }
        });
        // 显示成功对话框
        $("#addAccountModal").modal('show');
        //保存
        //$('#save_account').on('click', function () {
        //    var chk7 = document.getElementById('check1');
        //    var chk8 = document.getElementById('check2');
        //    var chk9 = document.getElementById('check3');
        //    var chk10 = document.getElementById('check4');
        //    var chk11 = document.getElementById('check5');
        //    var chk12 = document.getElementById('check6');
        //    debugger;
        //    var menu_id = ';';
        //    if(chk7.checked == true){
        //        menu_id += 1+';';
        //    }
        //    if(chk8.checked == true){
        //        menu_id += 2+';';
        //    }
        //    if(chk9.checked == true){
        //        menu_id += 3+';';
        //    }
        //    if(chk10.checked == true){
        //        menu_id += 4+';';
        //    }
        //    if(chk11.checked == true){
        //        menu_id += 5+';';
        //    }
        //    if(chk12.checked == true){
        //        menu_id += 6+';';
        //    }
        //    debugger;
        //    var data = {
        //        menu_id:menu_id,
        //        role_name:$("#nameLab").val(),
        //    };
        //    $.ajax({
        //        type: "post",
        //        url: '/role_info/insert?seq_no='+seq_no,
        //        dataType: "json",
        //        data: data,
        //        success: function (data) {
        //            debugger;
        //            alert("提交成功！");
        //            window.location.reload();
        //        },
        //        error: function (data) {
        //            alert("系统错误");
        //        }
        //    })
        //});
    });
    //删除
    $(document).on("click", ".employee_del", function () {
        $("#delAccountModal").modal('show');
        seq_no = $(this).attr('data-id');
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
    //添加角色弹窗
    $('#addStaffModal').on('click', function () {
        $('#newAccountModal').modal('show');
        $('#new_account').on('click', function () {
            var chka = document.getElementById('Ncheck1');
            var chkb = document.getElementById('Ncheck2');
            var chkc = document.getElementById('Ncheck3');
            var chkd = document.getElementById('Ncheck4');
            var chke = document.getElementById('Ncheck5');
            var chkf = document.getElementById('Ncheck6');
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
            if(chkf.checked == true){
                menu_id += 6+';';
            }
            debugger;
            $.ajax({
                type: "get",
                url: '/role_info/select',
                dataType: "json",
                async: false,
                data:{},
                success: function (data) {
                    debugger;
                    new_seq_no = parseInt(data[0].seq_no);
                },
                error: function (data) {
                    debugger;
                    alert("系统错误");
                }
            });
            var data = {
                menu_id:menu_id,
                role_name:$("#newnameLab").val(),
                seq_no:new_seq_no+1,
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





