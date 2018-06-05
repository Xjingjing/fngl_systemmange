<template>
     <div style="padding-bottom:14%;">
            <!--顶部  -->
            <mt-header fixed title="分组列表">
                <span slot="left" @click="$router.push({path:'/index1'})">
                    <mt-button icon="back"></mt-button>
                </span>
            </mt-header>
            <!-- 搜索 -->
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i> 
                    <input type="search" placeholder="请输入您想要搜索的小组名称" class="mint-searchbar-core" v-model="searchvalue">
                </div> 
                <a class="mint-searchbar-cancel" @click="search">搜索</a>
            </div>
            <!-- 统计总数 -->
            <ul class="clearfix count">
                <li class="fl">共计 : <span>{{count.groupCount}}</span>组</li>
                <li class="fl">总成员 : <span>{{count.userCount}}</span>人</li>
                <li class="fl">小组成员 : <span>{{count.inGroupUserCount}}</span>人</li>
            </ul>
            <!-- 小组列表 -->
            <ul class="grouplist">
                <li v-if="grouplist.length == 0" style="margin-top:10px;">暂无数据</li>
                <li v-else v-for="item in grouplist">
                    <div class="list-left">
                        <h3>{{item.name}}</h3>
                        <span>现有成员 : <span class="nownumber">{{item.usercounts}}</span>名</span><br>
                        <span>创建时间 : <span class="created_at">{{item.createtime}}</span></span>
                    </div>
                    <mt-button type="primary" class="is-plain" @click="groupdetail(item)">查看详情</mt-button>
                </li>
            </ul>
            <!-- 新增 -->
            <ul class="add">
                <li class="fl" @click="addgroup">新增分组</li>
                <li class="fl" @click="addmember">新增成员</li>
                <!-- <li class="fl"><mt-button type="primary" class="is-plain">查看详情</mt-button></li>
                <li class="fl"><mt-button type="primary" class="is-plain">查看详情</mt-button></li> -->
            </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'grouplist',
        data(){
            return {
                searchvalue:'',
                isshow:true,
                grouplist:[],
                count:[]
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
            this.getallgroup();
            
        },
        methods:{
            getallgroup(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'get',
                    url:'/index.php?g=landpush&m=landpush&a=allGroup',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res)
                    if(res.data.code == 0){
                        that.grouplist = res.data.data.grouplist;
                        that.count = res.data.data.count;
                    }else{
                        Toast(res.data.message)
                    }
                    
                })
            },
            search(){
                if(this.searchvalue == ''){
                    Toast('请输入小组名称搜索');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=groupSearch',
                    data:{
                        search:that.searchvalue
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    Toast(res.data.message)
                    if(res.data.code == 0){
                        that.grouplist = res.data.data.grouplist;
                        that.count = res.data.data.count;
                    }
                })
                // console.log(this.searchvalue)
            },
            addgroup(){
                this.$router.push({
                    path:'/addgroup'
                })
            },
            addmember(){
               this.$router.push({
                    path:'/addmember'
                })
            },
            groupdetail(e){
                // console.log(e)
                var obj = {};
                obj.id = e.groupid;
                this.$router.push({
                    path:'/groupdetail',
                    query:obj
                })
            }
        },
        watch:{
            searchvalue:function(){
                if(this.searchvalue == ''){
                    this.getallgroup();
                }
            }
        }
    }
</script>

<style scoped>
    html,body{
        padding-bottom:7%;
    }
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
    .count{
        border-bottom:1px solid #ddd;
    }
    .count li{
        margin-top:0.8rem;
        margin-bottom:0.8rem;
        text-align:center;
        border-right:1px solid #ddd;
    }
    .count li:first-child{
        width:25%;
    }
    .count li:nth-child(2){
        width:37%;
    }
    .count li:last-child{
        width:37%;
        border:none;
    }
    .grouplist{
        padding-bottom:15%;
    }
    .grouplist h3{
        color:#666;
        margin:0.7rem 0;
    }
    .grouplist li{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding-left:3%;
        padding-right:3%;
        width: 100%;
        position: relative;
        border-top:1px solid #ddd;
    }
    .grouplist li:first-child{
        border:none;
    }
    .grouplist .mint-button{
        position:absolute;
        bottom:0.4rem;
        right:0.5rem;
        font-size:0.9rem;
        height:auto;
        padding:0.4rem 0.8rem;
    }
    .list-left{
        margin-bottom:10px;
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
        width: 49%;
        height: 100%;
        font-size: 1.1rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .add li:active{
        background-color: #ddd;
    }
    .add li:first-child{
        border-right:1px solid #ddd;
    }
    /* .add .mint-button{
        padding: 0.3rem 0.5rem;
        font-size:1rem;
    } */
</style>
