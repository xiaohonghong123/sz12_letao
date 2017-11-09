$(function (){
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

    //判断是否登录  如果登录继续访问 没有登录则 回到 登录页面
    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            url:"/employee/checkRootLogin",
            success:function (data){
                //console.log(data)
                console.log(data.error);
                if(data.error == 400){
                    location.href = "login.html";
                }
            }
        })
    }

    //首页部分  点击侧边栏  是否显示一 二级分类
    $(".fenlei").on("click",function (){
        $(this).next().slideToggle();
    })


    /*侧边栏的显示和隐藏*/
    $(".btn_menu").on("click",function (){
        $(".lt_aside").toggleClass("aside_left");
        $(".lt_main").toggleClass("main_left");
    })

    /*退出登录功能*/
    $(".btn_logout").on("click",function (){
       $(".modal").modal('show');
        //$('#myModal').modal('show')
    });
    $(".btn_sure").on("click",function (){
        /*跳转到登录页*/
        $.ajax({
            url:"/employee/employeeLogout",
            success:function (data){
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    });









});





