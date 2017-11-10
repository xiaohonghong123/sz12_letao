$(function (){
    var $form = $("form");

    $form.bootstrapValidator({
        /*登录时校验 的字体图标*/
        feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
        },
    //    规则
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名输入错误"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码的长度是6-12"
                    },
                    callback:{
                        message:"密码输入错误"
                    }
                }
            }
        }

    });

    // 点击登录  提交登录信息到后台
    //需要调用插件的一个success.form.bv校验成功事件
    $form.on("success.form.bv",function (e){
        e.preventDefault();
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:$form.serialize(),
            success:function (data){
                console.log(data);
            //    对拿到的数据进行判断
                if(data.error ===1000){
                    //alert("用户名错误")
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                };
                if(data.error ===1001){
                    //提高用户体验  调用一个方法 来提示信息
                    //alert("密码错误")
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
                if(data.success){
                    location.href = "index.html";
                }
            }
        })
    });

//    点击重置按钮的时候 连插件提供的图标一起去掉
    $("[type='reset']").on("click",function (){
        $form.data("bootstrapValidator").resetForm();
    });
});