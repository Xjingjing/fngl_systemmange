<template>
     <div>
            <!-- 头部 -->
            <mt-header fixed title="共享详情">
                <span slot="left" @click="$router.go(-1)">
                    <mt-button icon="back"></mt-button>
                </span>
            </mt-header>

            <!-- 搜索 -->
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i> 
                    <input type="search" placeholder="请输入您想要搜索的姓名或手机号" class="mint-searchbar-core" v-model="searchvalue">
                </div> 
                <a class="mint-searchbar-cancel" @click="search">搜索</a>
            </div>

            <!-- 上报详细信息 -->
            <div>
                <div class="list-left" style="padding-top:0.8rem;" v-for="item in sharedetaillist">
                    <span>共享人 : <span class="reportdate info">{{item.pushername}}</span></span><br>
                    <span>共享日期 : <span class="reportdate info">{{item.createtime}}</span></span><br>
                    <span>共享所在组 : <span class="reportgroup info">{{item.groupname}}</span></span><br>
                    <div style="height:0.5rem"></div>
                    <div class="clearfix">
                        <span class="meminfo">姓名 : <span class="reportname info">{{item.landusername}}</span></span><br>
                        <span class="meminfo">性别 : <span class="reportsex info">{{item.sexname}}</span></span>
                        <span class="meminfo">类别 : <span class="reportcate info">{{item.typename}}</span></span><br>
                        <span class="meminfo">手机 : <span class="reportphone info">{{item.landuserphone}}</span></span><br>
                        <span class="meminfo">地址 : <span class="reportarea info">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span></span>
                    </div>
                    <ul class="clearfix result selectdate">
                        <li class="fl"><mt-button type="primary" size="small" @click="manageresult(item.manageInfo)" class="is-plain datebutton">经营成果</mt-button></li>
                        <li class="fl"><mt-button type="primary" size="small" @click="extendsresult(item.developmentInfo)" class="is-plain datebutton">扩展成果</mt-button></li>
                        <li class="fl"><mt-button type="primary" size="small" class="is-plain datebutton" @click="reamrkinfo(item.content)">备注信息</mt-button></li>
                    </ul>
                </div>
            </div>

    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: 'sharedetail',
        data(){
            return {
                searchvalue:'',
                isshow:true,
                groupobj:this.$route.query,  // 获取路由传值
                sharedetaillist:[]
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

            this.getalldetail();
        },
        methods:{
            getalldetail(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=shareDetails',
                    data:{
                        pusherId:Number(window.localStorage.getItem('pusherId')),
                        actionType:3,
                        currentSec:that.groupobj.day
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    that.sharedetaillist = res.data.data;
                })
            },
            search(){
                if(this.searchvalue == ''){
                    Toast('请输入姓名或手机号进行搜索');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=shareDetails',
                    data:{
                        actionType:2,
                        currentSec:that.groupobj.day,
                        search:that.searchvalue
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    if(res.data.data.length == 0){
                        Toast('没有查询到匹配数据');
                    }
                    that.sharedetaillist = res.data.data;
                })
            },
            manageresult(e){
                var arr = [];
                for(var i = 0; i < e.length;i++){
                    arr.push(e[i].manageid);
                }
                this.$router.push({
                    path:'/manageresult',
                    query:arr
                })
            },
            extendsresult(e){
                var arr = [];
                for(var i = 0; i < e.length;i++){
                    arr.push(e[i].developmentid);
                }
                this.$router.push({
                    path:'/extendsresult',
                    query:arr
                })
            },
            reamrkinfo(e){
                console.log(e)
                this.$router.push({
                    path:'/remarkinfo',
                    query:e
                })
            }
        },
        watch:{
            searchvalue:function(){
                if(this.searchvalue == ''){
                    this.getalldetail();
                }
            }
        }
    }
</script>

<style scoped>
    .mint-searchbar-inner{
        height:auto;
        padding:3px;
        border-radius: 0.3rem;
    }
    .mint-searchbar{
        border-radius: 0.5rem;
        background-color: #eee;
        margin-top:10px;
    }
    .list-left{
        padding-left:3%;
        padding-bottom:0.8rem;
        border-bottom:1px solid #eee;
    }
    .list-left h3{
        color:#666;
        margin:0.7rem 0;
    }
    .add{
        width: 100%;
        height: 7%;
        background-color: #eee;
        position:fixed;
        bottom:0;
        left:0;
    }
    .add li{
        width: 33%;
        height: 100%;
        font-size: 1.1rem;
        text-align: center;
        display: flex;
        display:-webkit-box;
        justify-content: center;
        align-items: center;
        border-right:1px solid #ddd;
    }
    .add li:active{
        background-color: #ddd;
    }
    .add li:last-child{
        border-right:none;
    }
    .info{
        color:#555;
    }
    .meminfo{
        float:left;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .meminfo:nth-child(2){
        width:50%;
    }
    .meminfo:nth-child(3){
        width:50%;
    }
    .result li{
        width:30%;
    }
    .selectdate li{
        width: 33.3%;
        margin:0.8rem 0 0 0;
        text-align:left;
    }
    .selectdate .mint-button--small{
        height:1.8rem;
        font-size:0.8rem;
    }
    .info{
        color:#888;
    }
</style>
