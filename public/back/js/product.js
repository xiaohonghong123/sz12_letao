$(function (){

    var currentPage = 1;
    var pageSize = 5;


    function render(){
        $.ajax({
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data){
                //console.log(data);
                $("tbody").html(template("tpl1",data));
            //    分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total / pageSize),
                    onPageClicked:function (a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };
    render();

    //弹出模态框

    $(".btn_add").on("click",function (){
         $("#add2Modal").modal("show");

        //生成模态框中的下拉菜单部分
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function (data){
                //console.log(data);
                $(".dropdown-menu").html( template("tpl2",data) );

            }
        })
    })

//    给生成的二级分类注册单击事件
    $(".dropdown-menu").on("click","a",function (){
        //console.log($(this).data("id"));

        $("#brandId").val($(this).data("id"));
        $(".dropdownText").text($(this).text());

    //    手动设置$("#brandId") 校验成功
        $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
    })


//    表单校验
    $("form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商铺名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入正确的数据"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入尺码,例如:30-40"
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:"请输入三张图片"
                    }
                }
            },
        }
    })

//    上传图片 使用fileupload插件
    $('#fileupload').fileupload({
        dataType:"json",
        done:function (e,data){
            //console.log(data.result);
            if($(".img_box").find("img").length >= 3){
                return false;
            }
            $(".img_box").append('<img data-name="'+data.result.picName+'" data-src="'+data.result.picAddr+'"  id="upload_img" src="'+data.result.picAddr+'" width="100" height="100" alt=""/>')

            //判断 校验结果
            if($(".img_box").find("img").length == 3){
                $("form").data("bootstrapValidator").updateStatus("productLogo","VALID");
            }else {
                $("form").data("bootstrapValidator").updateStatus("productLogo","INVALID");
            }

            //实现双击删除选中的照片
            $(".img_box").find("img").off().on("dblclick",function (){
                $(this).remove();
                //判断 校验结果
                if($(".img_box").find("img").length == 3){
                    $("form").data("bootstrapValidator").updateStatus("productLogo","VALID");
                }else {
                    $("form").data("bootstrapValidator").updateStatus("productLogo","INVALID");
                }
            })
        }
    })

//    注册表单校验成功事件
    $("form").on("success.form.bv",function (){
        //console.log(11);
        var data = $("form").serialize();
        //console.log(data);
        var $img = $(".img_box img");
        data += "&picName1=" + $img[0].dataset.name + "&picAddr1=" + $img[0].dataset.src;
        data += "&picName2=" + $img[1].dataset.name + "&picAddr2=" + $img[1].dataset.src;
        data += "&picName3=" + $img[2].dataset.name + "&picAddr3=" + $img[2].dataset.src;


        $.ajax({
            url:"/product/addProduct",
            data:data,
            type:"post",
            success:function (data){
                console.log(data);
                if(data.success){
                    $("#add2Modal").modal("hide");
                    currentPage = 1;
                    render();
                // 初始化控件
                    $("form")[0].reset();
                    $("form").data("bootstrapValidator").resetForm();

                    $(".dropdownText").text("请选择二级分类");
                    $("#brandId").val("");
                    $("#productLogo").val("");
                    $(".img_box img").remove();
                }
            }
        })
    })

})