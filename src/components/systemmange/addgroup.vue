<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">新增分组</div>
                </div>
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-input">
                        <input placeholder="请输入分组名称" type="text" v-model="groupname"> 
                        <div class="mint-msgbox-errormsg">{{adderror}}</div>
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="$router.go(-1)">取消</button> 
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="addgroup">确定</button>
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
        name: 'datamange',
        data(){
            return {
                isshow:true,
                groupname:'',
                adderror:''
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
            addgroup(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=addGroup',
                    data:{
                        name:this.groupname.trim()
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res)
                    if(res.data.code == 0){
                        Toast('添加成功');
                        that.$router.push({
                            path:'/grouplist'
                        }) 
                    }else{
                        that.adderror = res.data.message;
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
    }
    .mint-msgbox-errormsg{
        text-align:center;
    }
</style>
