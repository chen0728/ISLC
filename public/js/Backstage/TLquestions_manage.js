/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var new_num;
    var question_list = [];
    var audio_url;
    var $p_id = $("#TLquestions_manage_page");
    $(document).ready(function(){
        $p_id.find(".timu").mouseenter(function(){
            $(this).css("border","2px solid #E9E9E4");
            $(this).find(".close").css("display","inherit");
        });
        $p_id.find(".timu").mouseleave(function(){
            $(this).css("border","2px solid #FFF");
            $(this).find(".close").css("display","none");
        });
    });

    //添加小题
    $p_id.find("#add_question").on('click',function(){
        $p_id.find("#package_step1Form").append('<div class="timu w-76 alert alert-dismissable alert-policy-01 pull-left clearfix clearfix form-group j_theme_choose">' +
            '<label class="control-label w-9">题目：</label>' +
            '<input name="Q_T" class="form-control w-40 required" data-rule="required;" type="text" maxlength="256" placeholder="问题描述">' +
            '<label class="control-label w-9">分值：</label>' +
            '<input name="Q_S" class="form-control w-12" type="text" maxlength="256" placeholder="不填则默认5分">' +
            '<br><br>' +
            '<button type="button" class="close closefirst" data-dismiss="alert" style="position: inherit;margin: -69px -28px 0 0;">' +
            '</button><div>' +
            '<ul class="y-theme-choose-list clearfix" id="themeChoose">' +
            '<li style="width: 310px;margin: 10px 0 0 90px">' +
            '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CA">A</label>' +
            '<input name="Q_A" class="form-control w-23 ml-1" type="text" placeholder="答案A，没有则不填"></li>' +
            '<li style="width: 310px;margin-top: 10px">' +
            '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CB">B</label>' +
            '<input name="Q_B" class="form-control w-23 ml-1" type="text" placeholder="答案B，没有则不填"></li>' +
            '<li style="width: 310px;margin: 10px 0 0 90px">' +
            '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CC">C</label>' +
            '<input name="Q_C" class="form-control w-23 ml-1" type="text" placeholder="答案C，没有则不填"></li>' +
            '<li style="width: 310px;margin-top: 10px">' +
            '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CD">D</label>' +
            '<input name="Q_D" class="form-control w-23 ml-1" type="text" placeholder="答案D，没有则不填"></li>' +
            '</ul></div></div>');
        $p_id.find(".timu").mouseenter(function(){
            $(this).css("border","2px solid #E9E9E4");
            $(this).find(".close").css("display","inherit");
        });
        $p_id.find(".timu").mouseleave(function(){
            $(this).css("border","2px solid #FFF");
            $(this).find(".close").css("display","none");
        });
        $p_id.find(".closefirst").on('click',function(){
            $p_id.find('#que_num').html('共 '+($p_id.find('#package_step1Form').children('div').length - 6)+' 题');
        });
        $p_id.find('#que_num').html('共 '+($p_id.find('#package_step1Form').children('div').length - 5)+' 题');
    });

    //查看
    if($p_id.find('#question_seq_no').val() != 0){
        if(fill_page($p_id.find('#question_seq_no').val()) != $('#login_account_id').val()){
            $p_id.find(':input').each(function(){
                $(this).attr("disabled",true);
            });
            $p_id.find('.btn').each(function(){
                debugger;
                $(this).remove();
            });
            $p_id.find('#btnn').append('<button class="close11 btn btn-success w-12 float-none" style="margin: 0 50px 0 0 ">关闭</button>');
            $p_id.find('.close11').attr("disabled",false);
            $p_id.find('.close11').on('click',function(){
                $(".nav-main ul li").each(function(){
                    if($(this).html().indexOf('听力试题') > -1){
                        $(this).find(".close-page").trigger("click");
                    }
                });
            });
        }
    }

    //添加听力题库引用弹窗
    $p_id.find('#TLTKYY').on('click', function () {
        $p_id.find('#TLTKdiv').modal('show');
        quote_question();   //填充引用题库
    });

    // 绑定引用事件
    $(document).on("click",'.yinyongTL', function () {
        fill_page($(this).attr('data-id'));
        $p_id.find("#public").attr('checked',false);
        $p_id.find('#TLTKdiv').modal('hide');
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

    //引用题库列表
    function quote_question() {
        var params = { // 查询查询参数
            seq_no: $p_id.find('#seq_no_xq').val(), // 编号
            question_name: $p_id.find('#question_xq').val(), // 题库名
            account_id: $p_id.find('#account_id_xq').val(), // 上传帐号
            status:1,
            type:'听力题'
        };
        var table_src = $p_id.find('#TLquestion_Table'); // 定义指向
        var ajax_url = '/questions/list'; // 定义数据请求路径
        var pageSize = 5 ;// 定义每页长度默认为10
        var aoColumns = [
            {"col_id": "seq_no"},
            {"col_id": "question_name"},
            {"col_id": "account_id"}
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
        },{
            "colIndex": 3,
            "html": function (data, type, full) {
                var retHtml = '<div class="drop-opt">' +
                    '<a class="yinyongTL" href="javascript:void(0)" data-id="'+full.seq_no+'" data-toggle="modal">引用</a>' +
                    '</div>';

                return retHtml;
            }

        }]; // 定义需要改变的列

        // 列表为空时的数据
        var sZeroRecords = '<p class="text-gray-light ml-2 font-18">没有满足搜索条件的结果</p>';
        // 绘画表格
        TableAjax.drawTable(table_src, ajax_url, pageSize, aoColumns, aoColumnDefs, params, sZeroRecords, fnChangeDataCallback,fnDrawCallback);
    }

    //获取听力题目信息,自动填充方法
    function fill_page(seq_no){
        var release_person_id;
        $.ajax({
            "dataType": 'json',
            "type": "get",
            "timeout": 20000,
            "async": false,
            "url": '/questions/list?seq_no=' + seq_no,
            "data": {},
            "success": function (data) {
                //填充题目数据
                release_person_id = data.data[0].account_id;
                audio_url = data.data[0].audio_url;
                $p_id.find('#question_name').val(data.data[0].question_name);
                $p_id.find('#audio_name').val(data.data[0].audio_name);
                $p_id.find('#remarks').val(data.data[0].remarks);
                if(data.data[0].public == 1){
                    $p_id.find("#public").attr('checked',true);
                }
                debugger;
                //删除原有的小题框
                $p_id.find(".timu").remove();
                //查询所有关联小题并填充
                $.ajax({
                    "dataType": 'json',
                    "type": "get",
                    "async": false,
                    "timeout": 20000,
                    "url": '/questions_info/select?related_bank=' + data.data[0].seq_no,
                    "data": {},
                    "success": function (data) {
                        var html_ = '';
                        for(var i=0; i<data.length; i++){
                            html_ += '<div class="timu w-76 alert alert-dismissable alert-policy-01 pull-left clearfix clearfix form-group j_theme_choose">' +
                                '<label class="control-label w-9">题目：</label>' +
                                '<input name="Q_T" value="'+data[i].question+'" class="form-control w-40 required" data-rule="required;" type="text" maxlength="256" placeholder="问题描述">' +
                                '<label class="control-label w-9">分值：</label>' +
                                '<input name="Q_S" value="'+data[i].score+'" class="form-control w-12" type="text" maxlength="256" placeholder="不填则默认5分">' +
                                '<br><br>' +
                                '<button type="button" class="close closefirst" data-dismiss="alert" style="position: inherit;margin: -69px -28px 0 0;">' +
                                '</button><div>' +
                                '<ul class="y-theme-choose-list clearfix" id="themeChoose">' +
                                '<li style="width: 310px;margin: 10px 0 0 90px">';
                            if(data[i].answer.indexOf('A') > -1){
                                html_ += '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CA" checked>A</label>';
                            }else{
                                html_ += '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CA">A</label>';
                            }
                            if(data[i].option1){
                                html_ += '<input name="Q_A" value="'+data[i].option1+'" class="form-control w-23 ml-1" type="text" placeholder="答案A，没有则不填"></li>'
                            }else{
                                html_ += '<input name="Q_A" class="form-control w-23 ml-1" type="text" placeholder="答案A，没有则不填"></li>'
                            }
                            if(data[i].answer.indexOf('B') > -1){
                                html_ += '<li style="width: 310px;margin-top: 10px">' +
                                    '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CB" checked>B</label>';
                            }else{
                                html_ += '<li style="width: 310px;margin-top: 10px">' +
                                    '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CB">B</label>';
                            }
                            if(data[i].option2){
                                html_ += '<input name="Q_B" value="'+data[i].option2+'" class="form-control w-23 ml-1" type="text" placeholder="答案B，没有则不填"></li>'
                            }else{
                                html_ += '<input name="Q_B" class="form-control w-23 ml-1" type="text" placeholder="答案B，没有则不填"></li>'
                            }
                            if(data[i].answer.indexOf('C') > -1){
                                html_ += '<li style="width: 310px;margin: 10px 0 0 90px">' +
                                    '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CC" checked>C</label>';
                            }else{
                                html_ += '<li style="width: 310px;margin: 10px 0 0 90px">' +
                                    '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CC">C</label>';
                            }
                            if(data[i].option3){
                                html_ += '<input name="Q_C" value="'+data[i].option3+'" class="form-control w-23 ml-1" type="text" placeholder="答案C，没有则不填"></li>'
                            }else{
                                html_ += '<input name="Q_C" class="form-control w-23 ml-1" type="text" placeholder="答案C，没有则不填"></li>'
                            }
                            if(data[i].answer.indexOf('D') > -1){
                                html_ += '<li style="width: 310px;margin-top: 10px">' +
                                    '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CD" checked>D</label>';
                            }else{
                                html_ += '<li style="width: 310px;margin-top: 10px">' +
                                    '<label style="float: left"><input style="margin-top: 10px" type="checkbox" name="Q_CD">D</label>';
                            }
                            if(data[i].option4){
                                html_ += '<input name="Q_D" value="'+data[i].option3+'" class="form-control w-23 ml-1" type="text" placeholder="答案D，没有则不填"></li>'
                            }else{
                                html_ += '<input name="Q_D" class="form-control w-23 ml-1" type="text" placeholder="答案D，没有则不填"></li>'
                            }

                            html_ += '</ul></div></div>';
                        }
                        $p_id.find("#package_step1Form").append(html_);
                        $p_id.find(".timu").mouseenter(function(){
                            $(this).css("border","2px solid #E9E9E4");
                            $(this).find(".close").css("display","inherit");
                        });
                        $p_id.find(".timu").mouseleave(function(){
                            $(this).css("border","2px solid #FFF");
                            $(this).find(".close").css("display","none");
                        });
                        $p_id.find(".closefirst").on('click',function(){
                            $p_id.find('#que_num').html('共 '+($p_id.find('#package_step1Form').children('div').length - 6)+' 题');
                        });
                        $p_id.find('#que_num').html('共 '+data.length+' 题');
                    }, "error": function (data) {
                        console.log(data);
                    }
                });
            }, "error": function (data) {
                console.log(data);
            }
        });
        return release_person_id;
    }

    //保存
    $p_id.find("#save_question").on('click',function() {
        var pass = true;
        $p_id.find("#package_step1Form .required").each(function(){
            if($(this).val() == '') {
                $(this).focus();
                pass = false;
            }
        });
        if(pass){
            question_list = [];
            for(var i=0; i<$p_id.find('#package_step1Form').children('div').length - 5; i++){
                var answer = '';
                if($p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_CA']").is(':checked')){
                    answer += 'A';
                }
                if($p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_CB']").is(':checked')){
                    answer += 'B';
                }
                if($p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_CC']").is(':checked')){
                    answer += 'C';
                }
                if($p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_CD']").is(':checked')){
                    answer += 'D';
                }
                question_list.push({
                    question: $p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_T']").val(),
                    score: $p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_S']").val() || 5,
                    option1: $p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_A']").val() || '',
                    option2: $p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_B']").val() || '',
                    option3: $p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_C']").val() || '',
                    option4: $p_id.find("#package_step1Form .timu:eq("+i+") [name='Q_D']").val() || '',
                    answer:answer
                });
            }
            debugger;
            if(question_list.length == 0){
                alert('请至少编写一道题目');
                return;
            }
            if(!audio_url){
                alert('请上传音频文件');
                return;
            }
            var data = {
                question_list:question_list,
                question:{
                    question_name: $p_id.find("#question_name").val(),
                    audio_url:audio_url,
                    audio_name:$p_id.find("#audio_name").val(),
                    status:1,
                    type:'听力题',
                    remarks: $p_id.find("#remarks").val()
                }
            };
            if($p_id.find("#public").is(':checked')){
                data.question.public = 1;
            }else{
                data.question.public = 2;
            }
            if($p_id.find("#question_seq_no").val() != 0){
                data.question.seq_no = $p_id.find("#question_seq_no").val();
            }
            $.ajax({
                "dataType": 'json',
                "type": "get",
                "timeout": 20000,
                "url": '/questions/TLNew',
                "data": data,
                "success": function (data) {
                    alert('保存成功');
                    $(".nav-main ul li").each(function(){
                        if($(this).html().indexOf('听力试题') > -1){
                            $(this).find(".close-page").trigger("click");
                        }
                    });
                },
                "error": function (data) {
                    console.log(data);
                }
            });
        }
    });

    //关闭页面
    $p_id.find(".close11").on('click',function() {
        $(".nav-main ul li").each(function(){
            if($(this).html().indexOf('听力试题') > -1){
                $(this).find(".close-page").trigger("click");
            }
        });
    });

    //音频上传
    var picClient =new PicClient();
    //添加头部图片
    picClient.addsingles(['add_top_img'],function callback(date1,date2,date3){
        setTimeout(function () {
            if('|mp3|wma|MP3|WMA|'.indexOf(JSON.parse(date2).extName) > -1){
                $p_id.find("#img_cover_ul").empty();
                $p_id.find("#img_cover_ul").append('<li class="alert alert-dismissable"> ' +
                    '<strong> ' +
                    '<img src="images/format_img/mp3.jpg" alt="" width="63" height="87"> ' +
                    '</strong> ' +
                    '</li>');
                debugger;
                $p_id.find('#audio_name').val(JSON.parse(date2).file_name);
                audio_url = JSON.parse(date2).date;
                debugger;

            }else{
                alert('请上传mp3、wma格式的音频文件');
            }

        }, 1000);
    })
});