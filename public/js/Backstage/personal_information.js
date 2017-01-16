/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var data_url;
    var new_seq;
    var new_seq_no;
    var new_num;
    var new_numb;
    var new_number;
    var $p_id = $("#personal_information_page");

    //数据表格筛选处事件冒泡
    $('.j_bubble').click(function (event) {
        event.stopPropagation();
    });

    // 阻止回车触发表格填充事件
    $('.j_bubble').keypress(function (e) {
        e.stopPropagation();
    });
    debugger;
    function init() {
        debugger;
        var params = { // 查询查询参数
            name: $p_id.find('#name').val(),
            number: $p_id.find('#number').val(),
            data_type: $p_id.find('#data_type').val(),
            account_id: $('#login_account_id').val(),
            up_timeS: $p_id.find('#up_timeS').val(),
            up_timeE: $p_id.find('#up_timeE').val(),
        };
        var table_src = $('#personal_Table'); // 定义指向
        var ajax_url = '/personal/list'; // 定义数据请求路径
        var pageSize = 10 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "name"},
            {"col_id": "number"},
            {"col_id": "data_type"},
            {"col_id": "up_time"},
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
                if(full.data_type == 1){
                    return '<td><div class="text-center">文档</div></td>';
                }else if(full.data_type == 2){
                    return '<td><div class="text-center">音频</div></td>';
                }else{
                    return '<td><div class="text-center">视屏</div></td>';
                }

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
                var retHtml = '';
                if (full.seq_no) {
                    retHtml = retHtml + '<div class="drop-opt">' +
                        '<a href="javascript:;" id="dropLabel-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">详情<span class="icon-chevron-down"></span></a>' +
                        '<ul class="drop-cnt in" role="menu" aria-labelledby="dropLabel-1">' +
                        '<li><a class="employee_edit" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">编辑</a></li>' +
                        '<li><a class="employee_del" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">删除</a></li>' +
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


    $("select").select2({
        minimumResultsForSearch: Infinity   //隐藏下拉列表搜索框。Infinity可以数字替换，下拉列表项的最少条目数等于该数字时出现搜索框。
    }); // 美化下拉列表

    // 动态绑定编辑事件
    $(document).on("click", ".employee_edit", function () {
        debugger;
        var seq_no = $(this).attr('data-id');
        new_seq = seq_no;
        //查询详情 并自动填充
        $.ajax({
            type: "get",
            url: "/Pinformation/get?seq_no="+seq_no,
            dataType: "json",
            data: {},
            success: function (data) {
                debugger;
                var chosen;
                var format_url;
                var filedata
                $p_id.find("#type_detail").empty();
                $p_id.find("#img_cover_ul").empty();
                if(data[0].data_type == 1){chosen = '文档'}else{$("#type_detail").append('<option value="1">文档</option>')};
                if(data[0].data_type == 2){chosen = '音频'}else{$("#type_detail").append('<option value="2">音频</option>')};
                if(data[0].data_type == 3){chosen = '视屏'}else{$("#type_detail").append('<option value="3">视屏</option>')};
                $("#add_Pinforma_form .select2-chosen").html(chosen);
                $p_id.find("#name_detail").val(data[0].name);
                $("#add_top_img").hide();
                $p_id.find("#unknow").empty();
                filedata = data[0].data_url.split(".")[data[0].data_url.split(".").length-1];
                if('avi,AVI'.indexOf(filedata) > -1){format_url = 'avi'
                }else if('css,CSS'.indexOf(filedata) > -1){format_url = 'css'
                }else if('csv,CSV'.indexOf(filedata) > -1){format_url = 'csv'
                }else if('doc,DOC,docx,DOCX'.indexOf(filedata) > -1){format_url = 'doc'
                }else if('eml,EML'.indexOf(filedata) > -1){format_url = 'eml'
                }else if('eps,EPS'.indexOf(filedata) > -1){format_url = 'eps'
                }else if('html,HTML'.indexOf(filedata) > -1){format_url = 'html'
                }else if('jpg,JPG,jpeg,JPEG'.indexOf(filedata) > -1){format_url = 'jpg'
                }else if('mov,MOV'.indexOf(filedata) > -1){format_url = 'mov'
                }else if('mp3,MP3'.indexOf(filedata) > -1){format_url = 'mp3'
                }else if('pdf,PDF'.indexOf(filedata) > -1){format_url = 'pdf'
                }else if('png,PNG'.indexOf(filedata) > -1){format_url = 'png'
                }else if('ppt,PPT'.indexOf(filedata) > -1){format_url = 'ppt'
                }else if('rar,RAR'.indexOf(filedata) > -1){format_url = 'rar'
                }else if('raw,RAW'.indexOf(filedata) > -1){format_url = 'raw'
                }else if('ttf,TTF'.indexOf(filedata) > -1){format_url = 'ttf'
                }else if('txt,TXT'.indexOf(filedata) > -1){format_url = 'txt'
                }else if('wav,WAV'.indexOf(filedata) > -1){format_url = 'wav'
                }else if('xls,XLS,xlsx,XLSX'.indexOf(filedata) > -1) {format_url = 'xls'
                }else{
                    format_url = 'unknow';
                    $p_id.find("#unknow").css('margin','-14px 0px 0px -56px');
                    $p_id.find("#unknow").html(filedata);
                    $p_id.find("#unknow").show();
                };
                $p_id.find("#img_cover_ul").append('<li class="alert alert-dismissable"> ' +
                    '<strong> ' +
                    '<img src="images/format_img/'+format_url+'.jpg" alt="" width="42" height="58"> ' +
                    '</strong> ' +
                    '</li>');

            },
            error: function (data) {
                alert("系统错误");
            }
        });
        //填充标题
        $("#areaLab").html('资料详情');
        // 显示成功对话框
        $("#detail").modal('show');
    });
    //删除
    $(document).on("click", ".employee_del", function () {
        var seq_no = $(this).attr('data-id');
        $("#delMapModal").modal('show');
        debugger;
        $('#del_infor').on('click', function () {
            debugger
            $.ajax({
                type: "post",
                url: '/Pinformation/del?seq_no='+seq_no,
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
    //添加资料弹窗
    $('#addData').on('click', function () {
        debugger;
        $("#areaLab").html('添加资料');
        $p_id.find("#type_detail").empty();
        $p_id.find("#name_detail").val('');
        $p_id.find("#img_cover_ul").empty();
        $p_id.find("#add_top_img").show();
        $("#add_Pinforma_form .select2-chosen").html('请选择');
        $p_id.find("#type_detail").append('<option value="1">文档</option>'+'<option value="2">音频</option>'+'<option value="3">视屏</option>');
        $('#detail').modal('show');;
    });
//保存
    $('#save_map').on('click', function () {
        debugger;
        var pub;
        var radio1 = document.getElementById('radio1');
        var radio2 = document.getElementById('radio2');
        if(radio1.checked == true){
            pub = 2;
        }
        debugger;
        if(radio2.checked == true){
            pub = 1;
        }
        if($("#areaLab").html() == '资料详情'){
            var data = {
                seq_no:new_seq,
                public:pub,
                data_type: $p_id.find('#type_detail').val(),
                name: $p_id.find('#name_detail').val(),
            };

        }else{
            $.ajax({
                type: "get",
                url: '/Pinformation/select',
                async: false,
                dataType: "json",
                data:{},
                success: function (data) {
                    debugger;
                    new_seq_no = parseInt(data[0].seq_no)+1;//新建seq_no
                    new_num = 'A'+(parseInt(data[0].number.split("A")[1])+1);//新建编号
                },
                error: function (data) {
                    debugger;
                    alert("系统错误");
                }
            });
            var data = {
                seq_no:new_seq_no,
                number:new_num,
                public:pub,
                data_type: $p_id.find('#type_detail').val(),
                name: $p_id.find('#name_detail').val(),
                data_url:data_url,
                account_id:$('#login_account_id').val(),
                status:1,
            };
        };
        debugger;
        $.ajax({
            type: "post",
            url: '/Pinformation/insert',
            dataType: "json",
            data: data,
            success: function (data) {
                debugger;
                alert("提交成功！");
                window.location.reload();
            },
            error: function (data) {
                debugger;
                alert("系统错误");
            }
        })
    });
    //弹出框居中
    $('.modal').on('show.bs.modal', function () {
        $(this).addClass('modal-outer');
    }).on('hidden.bs.modal', function () {
        $(this).removeClass('modal-outer');
    });

    var picClient =new PicClient();
    debugger;
    //添加头部图片
    function add_top_img(top_img_url){
        debugger;
        $p_id.find("#img_cover_ul").empty();
        $p_id.find("#img_cover_ul").append('<li class="alert alert-dismissable"> ' +
            '<strong> ' +
            '<img id="img_cover" src="'+top_img_url+'" alt="" width="42" height="58"> ' +
                //'<input id="add_img_cover'+add_top_num+'" name="img_cover" value="'+top_img_url+'"> ' +
            '</strong> ' +
            '</li>');
        debugger;
    }

    picClient.addsingles(['add_top_img'],function callback(date1,date2,date3){
        setTimeout(function () {
            debugger;
            add_top_img('');
            var format_url;
            var filedata = JSON.parse(date2).date.split(".")[JSON.parse(date2).date.split(".").length-1];
            if('avi,AVI'.indexOf(filedata) > -1){format_url = 'avi'
            }else if('css,CSS'.indexOf(filedata) > -1){format_url = 'css'
            }else if('csv,CSV'.indexOf(filedata) > -1){format_url = 'csv'
            }else if('doc,DOC,docx,DOCX'.indexOf(filedata) > -1){format_url = 'doc'
            }else if('eml,EML'.indexOf(filedata) > -1){format_url = 'eml'
            }else if('eps,EPS'.indexOf(filedata) > -1){format_url = 'eps'
            }else if('html,HTML'.indexOf(filedata) > -1){format_url = 'html'
            }else if('jpg,JPG,jpeg,JPEG'.indexOf(filedata) > -1){format_url = 'jpg'
            }else if('mov,MOV'.indexOf(filedata) > -1){format_url = 'mov'
            }else if('mp3,MP3'.indexOf(filedata) > -1){format_url = 'mp3'
            }else if('pdf,PDF'.indexOf(filedata) > -1){format_url = 'pdf'
            }else if('png,PNG'.indexOf(filedata) > -1){format_url = 'png'
            }else if('ppt,PPT'.indexOf(filedata) > -1){format_url = 'ppt'
            }else if('rar,RAR'.indexOf(filedata) > -1){format_url = 'rar'
            }else if('raw,RAW'.indexOf(filedata) > -1){format_url = 'raw'
            }else if('ttf,TTF'.indexOf(filedata) > -1){format_url = 'ttf'
            }else if('txt,TXT'.indexOf(filedata) > -1){format_url = 'txt'
            }else if('wav,WAV'.indexOf(filedata) > -1){format_url = 'wav'
            }else if('xls,XLS,xlsx,XLSX'.indexOf(filedata) > -1) {format_url = 'xls'
            }else{
                format_url = 'unknow';
                $p_id.find("#unknow").css('margin','-44px 0px 0px -56px');
                $p_id.find("#unknow").html(filedata);
                $p_id.find("#unknow").show();
            };
            $p_id.find('#img_cover').attr('src','images/format_img/'+format_url+'.jpg');
            //$p_id.find("#add_img_cover"+add_top_num).val('upload/'+JSON.parse(date2).date);
            data_url =JSON.parse(date2).date;
            debugger;
        }, 1000);
    })

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





