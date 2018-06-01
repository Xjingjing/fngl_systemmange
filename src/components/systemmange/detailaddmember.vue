<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">添加成员</div>
                </div>
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-input">
                        <input onfocus="this.blur()" placeholder="请选择成员" type="text" v-model="membername" id="trigger"> 
                        <input onfocus="this.blur()" placeholder="请选择成员分组" type="text" v-model="membergroup" disabled> 
                        
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
    import MobileSelect from 'mobile-select';
    import { Toast } from 'mint-ui';
    export default {
        name: 'detailaddmember',
        data(){
            return {
                isshow:true,
                membername:'',
                memberid:'',
                membergroup:this.$route.query.membergroup,
                groupid:this.$route.query.groupid,
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

            var that = this;
            this.$axios({
                method:'post',
                url:'/index.php?g=landpush&m=landpush&a=selectUserName',
                data:{
                    groupId:that.groupid
                },
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                // console.log(res.data.data)
                var arr = [];
                for(var i = 0; i < res.data.data.length;i++){
                    arr[i] = {};
                    arr[i].id = res.data.data[i].id;
                    arr[i].value = res.data.data[i].name;
                    arr[i].phone = res.data.data[i].phone;
                }
                if(arr.length==0){
                    that.error = '没有可选成员';
                }else{
                    that.$nextTick(function(){
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#trigger',
                        title: '请选择成员',
                        wheels: [
                                    {data:arr}
                                ],
                        position:[], //初始化定位
                        callback:function(indexArr, data){
                            that.membername = data[0].value;
                            that.memberid = data[0].id; //返回选中的json数据
                        }
                    });            
                })
                }

            })
        
        },
        methods:{
            addmember(){
                var that = this;
                // console.log(that.memberid)
                // console.log(that.groupid)
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=groupUserAdd',
                    data:{
                        currrentGroupId:that.groupid,
                        addUserId:that.memberid
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    // console.log(res)
                    Toast(res.data.message);
                    that.$router.go(-1)
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
