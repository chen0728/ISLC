/**
 * Created by Administrator on 2015/11/17.
 */

//function loadExtentFile(filePath, fileType){
//
//    if(fileType == "js"){
//        var oJs = document.createElement('script');
//        oJs.setAttribute("type","text/javascript");
//        oJs.setAttribute("src", filePath);//文件的地址 ,可为绝对及相对路径
//        document.getElementsByTagName("head")[0].appendChild(oJs);//绑定
//    }else if(fileType == "css"){
//        var oCss = document.createElement("link");
//        oCss.setAttribute("rel", "stylesheet");
//        oCss.setAttribute("type", "text/css");
//        oCss.setAttribute("href", filePath);
//        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
//    }
//}
//loadExtentFile("/js/jquery-1.11.1.min.js", "js");
//loadExtentFile("/js/uploadify/jquery.uploadify.min.js", "js");
//loadExtentFile("/js/uploadify/uploadify.css", "css");

 function uploadify(id,callback){
    $('#'+id).uploadify({
        'swf'      : '/js/uploadify/uploadify.swf',
        'uploader' : '/upload',
        'fileSizeLimit' : '1MB',
        'multi':false,
        // Put your options here
        'onUploadSuccess':function(file, data, response){
            callback(file,data,response);
        },
        'onUploadError' : function(file, errorCode, errorMsg, errorString) {
            callback(file,errorCode,errorMsg);
        }
    });
}




 var PicClient = function(){
     this.addsingles =function(arr,callback){
            for(var i=0 ;i<arr.length;i++){
                uploadify(arr[i],callback);
            }
     }
     this.addgroups = function(arr,callback){
         for(var i=0 ;i<arr.length;i++){

         }
     }

 }