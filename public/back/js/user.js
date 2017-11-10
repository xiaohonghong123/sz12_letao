$(function (){
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data){
                //console.log(data);
                $("tbody").html(template("tmp",data));

                /*调用分页插件  初始化分页*/
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function (a,b,c,page){
                        //console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };
    render();

    //点击禁用和启用的时候  改变 状态值
    $("tbody").on("click",".btn",function (){
        //显示模态框
        $("#user_modal").modal("show");
        //获取点击的按钮父级的ID
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger")?0:1;

        $(".btn_edit").off().on("click",function (){
            $.ajax({
                url:"/user/updateUser",
                type:"post",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (data){
                    //console.log(data);
                    if(data.success){
                        $("#user_modal").modal("hide");
                        render();
                    }
                }
            })
        })

    });


})