<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">备注</div>
                </div>
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-input">
                        <textarea placeholder="请输入备注" rows="4" class="mint-field-core" v-model="remark"></textarea>
                        <!-- <div class="mint-msgbox-errormsg">11111</div> -->
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="$router.go(-1)">取消</button> 
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="addremark">确定</button>
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
                remark:''
            }
        },
        created(){
            var power = window.localStorage.getItem('userpower');
            // 判断有没有权限访问
            if(power == null){
                this.$router.push({
                    path:'/power'
                })
                return
            }else if(power == '2'){
                this.$router.push({
                    path:'/bindphone'
                })
                return
            }else if(power == '3'){
                this.$router.push({
                    path:'/power'
                })
                return
            }
        },
        methods:{
            addremark(){
                var that = this;
                // console.log(this.remark);
                 that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=addContent',
                    data:{
                        landuserStrId:that.$route.query.arr,
                        content:that.remark,
                        pusherId:Number(window.localStorage.getItem('pusherId'))
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    Toast(res.data.message);
                    that.$router.go(-1);
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
    .mint-field-core{
        border-radius: 0.5rem;
        border:1px solid #ddd;
    }
</style>
