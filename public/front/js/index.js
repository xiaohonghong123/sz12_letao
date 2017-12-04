$(function(){
    var currentPage = 1;
    var pageSize = 100;
    $.ajax({
        url: "/product/queryProduct",
        data:{
           page: currentPage,
           pageSize:pageSize
        },
        success:function(data1){
            console.log(data1);
          $(".lt_product").html(template("tpl",data1));  
        }
    })
})
