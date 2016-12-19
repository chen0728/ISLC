/**
 * Created by admin on 2015/3/24.
 * 员工管理页面js
 */

$(function () {

    var tempObj;
    var tempEmpObj;
    var new_num;
    var question_list = [];
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
    $p_id.find("#add_question").on('click',function(){
        $p_id.find("#package_step1Form").append('<div class="timu w-76 alert alert-dismissable alert-policy-01 pull-left clearfix clearfix form-group j_theme_choose">' +
            '<label class="control-label w-9">题目：</label>' +
            '<input name="Q_T" class="form-control w-40 required" data-rule="required;" type="text" maxlength="256" placeholder="问题描述">' +
            '<label class="control-label w-9">分值：</label>' +
            '<input name="Q_S" class="form-control w-12 required" data-rule="required;" type="text" maxlength="256" placeholder="不填则默认5分">' +
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
        $(".timu").mouseenter(function(){
            $(this).css("border","2px solid #E9E9E4");
            $(this).find(".close").css("display","inherit");
        });
        $(".timu").mouseleave(function(){
            $(this).css("border","2px solid #FFF");
            $(this).find(".close").css("display","none");
        });
    });
    $("#save_question").on('click',function() {
        var pass = true;
        $p_id.find("#package_step1Form .required").each(function(){
            if($(this).val() == '') {
                $(this).focus();
                pass = false;
            }
        });
        if(pass){
            for(var i=0; i<$p_id.find('#package_step1Form').children('div').length - 4; i++){
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
            var data = {
                question_list:question_list,
                question:{
                    question_name: $p_id.find("#question_name").val(),
                    audio_url: $p_id.find("#audio_url").val(),
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
            debugger;
            $.ajax({
                "dataType": 'json',
                "type": "get",
                "timeout": 20000,
                "url": '/questions/TLNew',
                "data": data,
                "success": function (data) {

                },
                "error": function (data) {
                    console.log(data);
                }
            });
        }
    });

});