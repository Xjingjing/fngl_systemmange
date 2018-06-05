<template>
     <div style="padding-bottom:14%;">
            <!-- 头部 -->
            <mt-header fixed title="上报详情">
                <span slot="left" @click="$router.go(-1)">
                    <mt-button icon="back"></mt-button>
                </span>
            </mt-header>

            <!-- 搜索 -->
            <!-- <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i> 
                    <input type="search" placeholder="请输入您想要搜索的姓名或手机号" class="mint-searchbar-core" v-model="searchvalue">
                </div> 
                <a class="mint-searchbar-cancel" @click="search">搜索</a>
            </div> -->

            <!-- 上报详细信息 -->
            <div>
                <div class="clearfix" v-for="item in reportdetaillist">
                    <span class="fl" style="width:7%;position:relative;top:0.7rem;">
                        <input type="checkbox" class="checkbox-input reportcheck" :value="item.landuserid+','+item.landuserphone+','+item.pusherid"> 
                        <span class="mint-checkbox-core"></span>
                    </span>
                    <div class="list-left fl" style="padding-top:0.8rem;">
                        <span>上报人 : <span class="reportdate info">{{item.pushername}}</span></span><br>
                        <span>上报日期 : <span class="reportdate info">{{item.createtime}}</span></span><br>
                        <span>上报所在组 : <span class="reportgroup info">{{item.groupname}}</span></span><br>
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
             <!-- 新增 -->
            <ul class="add">
                <li class="fl" @click="changeuserup">修改</li>
                <li class="fl" @click="deleteuserup">删除</li>
                <li class="fl" @click="addremark">备注</li>
            </ul>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: 'userupdetail',
        data(){
            return {
                searchvalue:this.$route.query.searchvalue,
                isshow:true,
                reportdetaillist:[]
            }
        },
        created(){
            var power = window.localStorage.getItem('userpower');
            // 判断有没有权限访问
            // if(power == null){
            //     this.$router.push({
            //         path:'/power'
            //     })
            //     return
            // }else if(power == '2'){
            //     this.$router.push({
            //         path:'/bindphone'
            //     })
            //     return
            // }else if(power == '3'){
            //     this.$router.push({
            //         path:'/power'
            //     })
            //     return
            // }

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
                    url:'/index.php?g=landpush&m=landpush&a=landuserSearch',
                    data:{
                        actionType:1,
                        pusherId:Number(window.localStorage.getItem('pusherId')),
                        search:that.searchvalue
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    that.reportdetaillist = res.data.data;
                    
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
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=landuserSearch',
                    data:{
                        pusherId:Number(window.localStorage.getItem('pusherId')),
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
                    that.reportdetaillist = res.data.data;
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
                if(e == null || e == 'null'){
                    Toast('暂无备注');
                    return
                }
                this.$router.push({
                    path:'/remarkinfo',
                    query:e
                })
            },
            addremark(){
                var that = this;
                var obj ={};
                obj.arr = [];
                obj.arr1 = [];
                if($('.reportcheck:checked').length == 0){
                    Toast('请选择要备注的项');
                    return
                }else{
                    $('.reportcheck:checked').each(function(){
                        console.log($(this).val())
                        obj.arr.push(Number($(this).val().split(',')[0]));
                        obj.arr1.push(Number($(this).val().split(',')[2]));
                    })
                    // console.log(arr)
                }
                this.$router.push({
                    path:'/addremark',
                    query:obj
                })
            },
            changeuserup(){
                var that = this;
                var obj = {};
                console.log($('.reportcheck:checked').length)
                if($('.reportcheck:checked').length == 0){
                    Toast('请选择一项');
                    return
                }
                if($('.reportcheck:checked').length > 1){
                    Toast('只能修改一项');
                    return
                }
                if($('.reportcheck:checked').length == 1){
                    $('.reportcheck:checked').each(function(){
                        obj.changeid = $(this).val().split(',')[0];
                        obj.changephone = $(this).val().split(',')[1];
                        // obj.day = that.groupobj.day;
                    })
                    this.$router.push({
                        path:'/changeuserup',
                        query:obj
                    })
                }
                
            },
            deleteuserup(){
                var that = this;
                var arr = [];
                if($('.reportcheck:checked').length == 0){
                    Toast('请选择要删除的项');
                    return
                }else{
                    $('.reportcheck:checked').each(function(){
                        arr.push($(this).val().split(',')[0]);
                    })
                    console.log(arr)
                     MessageBox.confirm('确定删除所选上报信息吗?').then(
                        function(){
                            that.$indicator.open({
                                text: '加载中...',
                                spinnerType: 'fading-circle'
                            });
                            that.$axios({
                                method:'post',
                                url:'/index.php?g=landpush&m=landpush&a=deleteReport',
                                data:{
                                   landuserStrId:arr 
                                },
                                headers:{
                                    'Content-Type':'application/x-www-form-urlencoded'
                                }
                            }).then(function(res){
                                that.$indicator.close();
                                Toast(res.data.message);
                                that.getalldetail();
                            })
                        }
                    )
                }
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
    #app{
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
        width:85%;
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
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .meminfo:nth-child(2){
        width:50%;
    }
    .meminfo:nth-child(3){
        width:50%;
        margin-right:3rem;
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
