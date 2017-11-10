$(function (){
    $(".btn_fl").on("click",function (){
        $(this).next().slideToggle();
    });
})