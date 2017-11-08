/**
 * Created by z on 2017/11/8.
 */
/*生成进度条的效果*/
//需要通过ajax的全局事件监听数据的提交情况
//加载环  去掉
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function(){
    NProgress.start();
});
$(document).ajaxStop(function (){
    setInterval(function (){
        NProgress.done();
    },500);

});

