<template>
     <div>
            <!-- 头部 -->
            <mt-header fixed title="小组详情">
                <span slot="left" @click="$router.push({path:'/grouplist'})">
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

            <!-- 小组信息 -->
            <div class="list-left">
                <h3>{{groupinfo.groupname}}</h3>
                <span>现有成员 : <span class="nownumber">{{groupinfo.usercounts}}</span>名</span><br>
                <span>创建时间 : <span class="created_at">{{groupinfo.groupcreatetime}}</span></span>
            </div>

            <!-- 小组成员 -->
            <ul class="groupmem">
                <li v-if="groupmemberlist.length == 0" style="margin-top:10px;">暂无数据</li>
                <li v-else class="clearfix" v-for="(item,index) in groupmemberlist">
                    <span style="width:10%">{{index+1}}.</span>
                    <span class="membername" style="width:25%">{{item.username}}</span>
                    <span style="width:35%">{{item.phone}}</span>
                    <span style="width:27%;"><button class="mint-button mint-button--primary mint-button--small is-plain" @click="deletemember(item)"><label class="mint-button-text">移除</label></button></span>
                </li>
            </ul>

             <!-- 新增 -->
            <ul class="add">
                <li class="fl" @click="addmember">新增成员</li>
                <li class="fl" @click="changegroupname">修改名称</li>
                <li class="fl" @click="deletegroup">删除</li>
            </ul>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: 'memberlist',
        data(){
            return {
                searchvalue:'',
                isshow:true,
                groupobj:this.$route.query,  // 获取路由传值-小组信息
                groupmemberlist:[],
                groupinfo:''
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
            this.getgroupmember();
        },
        methods:{
            
            getgroupmember(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=groupDetails',
                    data:{
                        groupid:that.groupobj.id
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res)
                    if(res.data.code == 0){
                        that.groupmemberlist = res.data.data.userinfo;
                        that.groupinfo = res.data.data.groupinfo[0];
                    }else{
                        Toast(res.data.message)
                    }
                    
                })
            },
            search(){
                if(this.searchvalue == ''){
                    Toast('请输入搜索条件');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=groupUserSearch',
                    data:{
                        searchGroupId:that.groupobj.id,
                        searchName:that.searchvalue
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res)
                    if(res.data.code == 0){
                        Toast(res.data.message);
                        that.groupmemberlist = res.data.data.searchInfo;
                    }else{
                        Toast(res.data.message)
                    }
                    
                })
            },
            changegroupname(){
                this.$router.push({
                    path:'/changegroupname',
                    query:{
                        groupname:this.groupinfo.groupname,
                        groupid:this.groupobj.id,
                    }
                })
            },
            addmember(e){
                this.$router.push({
                    path:'/detailaddmember',
                    query:{
                        membergroup:this.groupinfo.groupname,
                        groupid:this.groupobj.id
                    }
                })
            },
            deletegroup(){
                var that = this;
                if(this.groupmemberlist.length == 0){
                    MessageBox.confirm('确定删除该小组吗?').then(
                        function(){
                            that.$axios({
                                method:'post',
                                url:'/index.php?g=landpush&m=landpush&a=deleteGroup',
                                data:{
                                    groupId:that.groupobj.id
                                },
                                headers:{
                                    'Content-Type':'application/x-www-form-urlencoded'
                                }
                            }).then(function(res){
                                console.log(res)
                                if(res.data.code == 0){
                                    Toast(res.data.message);
                                    that.$router.push({
                                        path:'/grouplist'
                                    })
                                }
                            })
                        }
                    )
                }else{
                    Toast('该小组下还有成员,不可删除');
                }
            },
            deletemember(e){
                console.log(e)
                var obj = {};
                obj.groupoldid = this.groupobj.id;
                obj.memid = e.id;
                obj.memname = e.username;
                this.$router.push({
                    path:'/deletemember',
                    query:obj
                })
            }
        },
        watch:{
            searchvalue:function(){
                if(this.searchvalue == ''){
                    this.getgroupmember();
                }
            }
        }
    }
</script>

<style scoped>
     html,body{
        padding-bottom:8%;
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
    .list-left{
        padding-left:3%;
        padding-bottom:0.8rem;
        border-bottom:1px solid #eee;
    }
    .list-left h3{
        color:#666;
        margin:0.7rem 0;
    }
    .groupmem li{
        padding:0.5rem 0 0.5rem 3%;
    }
    .groupmem span{
        height: 2rem;
        float:left;
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }
    .groupmem span:last-child{
        justify-content:flex-end;
    }
    .groupmem .mint-button{
        font-size:0.9rem;
        height:auto;
        padding:0.1rem 0.8rem;
        float:right;
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
</style>
