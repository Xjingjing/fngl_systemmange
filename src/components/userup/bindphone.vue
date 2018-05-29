<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">绑定手机号</div>
                </div>
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-input">
                        <input placeholder="请输入手机号" type="text" v-model="phone"> 
                        <input placeholder="请输入验证码" type="text" v-model="testcode" class="codetext"> 
                        <mt-button type="primary" plain class="code" @click="getcode">{{num}}</mt-button>
                        <div class="mint-msgbox-errormsg">{{error}}</div>
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="$router.go(-1)">取消</button> 
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="addmember">确定</button>
                </div>
            </div>
        </div>
        <div class="v-modal" style="z-index: 2054;"></div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: 'bindphone',
        data(){
            return {
                isshow:true,
                phone:'',
                testcode:'',
                groupid:'',
                error:'',
                num:'获取验证码',
                yzm:''
            }
        },
        created(){
            var that = this;
        
            // 判断有没有权限访问
            this.isshow = window.localStorage.getItem('power');
            if(this.isshow == 'false'){
                MessageBox('访问被拒绝', '您暂无权限使用此功能,如有需要请联系部门主管开通该服务').then(function(){
                  that.$router.go(-1);
                });
            }
        },
        methods:{
            getcode(){
                var that = this;
                $('.code').prop('disabled',true).addClass('code1');

                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=sendverifycode',
                    data:{
                        phone:Number(that.phone)
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.yzm = res.data.data.yzm;
                })

                that.num = '60s';
                var num = 60;
                var interval = setInterval(function(){
                    num--;
                    that.num = num + 's';
                    if(num == 0){
                        clearInterval(interval);
                        that.num = '获取验证码';
                        $('.code').prop('disabled',false).removeClass('code1');
                    }
                    console.log(num)
                },1000)
            },
            addmember(){
                console.log(this.phone);
                console.log(this.testcode);
                if(this.phone == ''){
                    this.error = '请输入手机号';
                    return
                }else if(this.testcode == ''){
                    this.error = '请输入验证码';
                    return
                }else if(this.yzm != this.testcode){
                    this.error = '验证码不正确';
                    return
                }else{
                    this.error = '';
                }
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=phoneBind',
                    data:{
                        openid:window.localStorage.getItem('openid'),
                        phone:Number(that.phone),
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    console.log(res)
                    that.error = res.data.message;   
                    that.$router.push({
                        path:'/userup'
                    })             
                })
            }
        }
    }
</script>

<style scoped>
    .mint-msgbox-input input{
        padding: 0.6rem 0;
        text-align: center;
        margin-bottom:0.5rem;
    }
    .mint-msgbox-errormsg{
        text-align:center;
    }
    .picker {
        height: 100%;
        background-color: rgba(0,0,0,.3);
        overflow: hidden;
        z-index: 2057;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0,0,0,.4);
    }
    .codetext{
        width:60%;
    }
    .code{
        width:37%;
        font-size:1rem;
        padding:0.5rem 0;
        height:auto;
    }
    .code1{
        background-color: #aaa;
        color:#fff;
        border:none;
    }
</style>
