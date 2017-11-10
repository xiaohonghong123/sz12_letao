$(function (){
    var currentPage = 1;
    var pageSize = 5;
 function render(){
     $.ajax({
         url:"/category/querySecondCategoryPaging",
         data:{
             page:currentPage,
             pageSize:pageSize
         },
         success:function (data){
             //console.log(data);
             $("tbody").html(template("temp1",data));

             //    生成分页
             $("#paginator").bootstrapPaginator({
                 bootstrapMajorVersion:3,
                 currentPage:currentPage,
                 totalPages:Math.ceil(data.total /pageSize),
                 //拿到页码
                 onPageClicked:function (a,b,c,page){
                     //console.log(page);
                     currentPage = page;
                     render();
                 }
             })
         }
     })
 }
    render();

//    弹出模态框
    $(".btn_add").on("click",function (){
        $("#add2Modal").modal("show");
    //    点击的时候获取一级分类的数据
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function (data){
                console.log(data);
                $(".dropdown-menu").html(template("temp2",data));
            //    给生成的li 注册一个单击事件拿到 id  并显示在button的位子

                $(".dropdown-menu").off().on("click","a",function (){
                    //console.log();
                    $(".dropdownText").text($(this).text());
                    $("#categoryId").val($(this).data("categoryid"));
                })
            }
        })
    })


    //使用本地预览插件
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //console.log(data.result.picAddr);
            $("#upload_img").attr("src",data.result.picAddr);
            $("#brandLogo").val(data.result.picAddr);
        }
    });

//    表单校验
    $("#form").bootstrapValidator({
        //设置不校验的内容，所有的都校验
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请输入品牌logo"
                    }
                }
            },

        }
    })

//    校验成功  获取ajax  数据
    $("#form").on("success.form.bv",function (){

    })

})