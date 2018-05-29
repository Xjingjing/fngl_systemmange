<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">修改成员信息</div>
                </div>
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-input">
                        <input placeholder="请输入成员名称" type="search" v-model="membername"> 
                        <input placeholder="请输入成员手机号" type="search" v-model="memberphone">  
                        <div class="mint-msgbox-errormsg">{{error}}</div>
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="$router.go(-1)">取消</button> 
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="changemember">确定</button>
                </div>
            </div>
        </div>
        <div class="v-modal" style="z-index: 2054;"></div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import MobileSelect from 'mobile-select';
    import { Toast } from 'mint-ui';
    export default {
        name: 'changemember',
        data(){
            return {
                isshow:true,
                memberid:this.$route.query.memberid,
                membername:this.$route.query.memname,
                memberphone:this.$route.query.memphone,
                error:''
            }
        },
        created(){
             var power = window.localStorage.getItem('syspower');
            // 判断有没有权限访问
            if(power == 'false' || power == null){
                this.$router.push({
                    path:'/power'
                })
                return
            }
        },
        methods:{
            changemember(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=editPusher',
                    data:{
                        pusherId:that.memberid,
                        pusherName:that.membername,
                        pusherPhone:that.memberphone
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res);
                    if(res.data.code == 0){
                        Toast(res.data.message);
                        that.$router.go(-1);
                    }else if(res.data.code == 1){
                        Toast(res.data.message);
                        that.$router.go(-1);
                    }else if(res.data.code == 2){
                        Toast(res.data.message);
                        that.$router.go(-1);
                    }else if(res.data.code == -3001){
                        that.error = '没有修改信息';
                    }else{
                        that.error = res.data.message;
                    }          
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
</style>
