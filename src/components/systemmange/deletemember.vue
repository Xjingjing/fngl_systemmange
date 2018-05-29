<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">移除成员</div>
                </div>
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-input">
                        <input disabled placeholder="请输入成员名称" type="text" v-model="membername"> 
                        <input onfocus="this.blur()" placeholder="请选择成员分组" type="text" v-model="membergroup" id="trigger"> 
                        <div class="mint-msgbox-errormsg">{{error}}</div>
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="$router.go(-1)">取消</button> 
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="deletemember">确定</button>
                </div>
            </div>
        </div>
        <div class="v-modal" style="z-index: 2054;"></div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import MobileSelect from 'mobile-select'
    import { Toast } from 'mint-ui';
    export default {
        name: 'datamange',
        data(){
            return {
                isshow:true,
                membername:this.$route.query.memname,
                groupoldid:this.$route.query.groupoldid,
                memid:this.$route.query.memid,
                membergroup:'',
                groupnewid:'',
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

            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            var that = this;
            this.$axios({
                method:'get',
                url:'/index.php?g=landpush&m=landpush&a=allGroupOptions',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                that.$indicator.close();
                // console.log(res.data.data)
                var arr = [];
                for(var i = 0; i < res.data.data.length;i++){
                    arr[i] = {};
                    arr[i].id = res.data.data[i].groupid;
                    arr[i].value = res.data.data[i].name;
                }
                if(arr.length==0){
                    that.error = '没有可选分组';
                }else{
                that.$nextTick(function(){
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#trigger',
                        title: '请选择分组',
                        wheels: [
                                    {data:arr}
                                ],
                        position:[], //初始化定位
                        callback:function(indexArr, data){
                            that.membergroup = data[0].value;
                            that.groupnewid = data[0].id; //返回选中的json数据
                        }
                    });            
                })
                }
            })
        },
        methods:{
            deletemember(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                console.log(this.groupoldid)
                console.log(this.groupnewid)
                console.log(this.memid)
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=groupUserRemove',
                    data:{
                        removeGroupId:that.groupoldid,
                        removeUserId:that.memid,
                        addGroupId:that.groupnewid
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    if(res.data.code == 0){
                        that.$router.go(-1);
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
