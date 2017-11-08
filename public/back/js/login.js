/**
 * Created by z on 2017/11/8.
 */
$(function (){

    //验证登录信

    $("form").bootstrapValidator({
        /*登录时校验 的字体图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //规则
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名输入错误"
                    },
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    callback:{
                        message:"密码错误"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度是6-12"
                    }
                }
            }
        }
    })

    //校验成功实践
    $("form").on("success.form.bv",function (e){
       e.preventDefault();
        //console.log("heh");

        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:$("form").serialize(),
            success:function (data){
                console.log(data);

                if(data.success){
                    location.href = "index.html";
                }
            //    登录失败的时候 需要 调用一个方法
                if(data.error===1000){
                    //用户名错误
                    $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error===1001){
                    //用户名错误
                    $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        })
    });

    /*点击重置按钮的时候需要将bootstrop 的字体图标及样式也发生变化*/
    $("[type='reset']").on("click",function (){
        $("form").data("bootstrapValidator").resetForm();
    })

})