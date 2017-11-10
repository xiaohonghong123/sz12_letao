$(function (){

    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data){
                console.log(data);
                $("tbody").html(template("temp1",data));
            //    分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total / pageSize),
                    onPageClicked:function(a,b,c,page){
                        console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };

    render();

//    弹出模态框
    $("#addBtn").on("click",function (){
        $("#addModal").modal("show");
    })

//    表单校验
    $("form").bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
        }
    });
    //表单校验成功后ajax
    $("form").on("success.form.bv",function (e){
        e.preventDefault();
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:$("form").serialize(),
            success:function (data){
                console.log(data);
            //    成功之后需要关闭模态框  诚信渲染页面
                currentPage = 1;
                render();
            }
        })
    })

});
