<template>
     <div style="padding-bottom:14%;">
            <!--顶部  -->
            <mt-header fixed title="成员列表">
                <span slot="left" @click="$router.push({path:'/index1'})">
                    <mt-button icon="back"></mt-button>
                </span>
                <mt-button slot="right" v-if="isselectall == false" @click="selectall">全选</mt-button>
                <mt-button slot="right" v-if="isselectall == true" @click="cancleselectall">取消</mt-button>
            </mt-header>
            <!-- 搜索 -->
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i> 
                    <input type="search" placeholder="请输入您想要搜索的姓名或手机号" class="mint-searchbar-core" v-model="searchvalue">
                </div> 
                <a class="mint-searchbar-cancel" @click="search">搜索</a>
            </div>
            <!-- 统计总数 -->
            <ul class="clearfix count">
                <li class="fl"><span id="trigger">全部分组</span><img src="../../../static/more_unfold.png" alt="" style="width:1rem;height:1rem;vertical-align: middle;"></li>
                <li class="fl">总成员 : <span>{{count.alluserCount}}</span>人</li>
                <li class="fl">小组成员 : <span>{{count.groupuserCount}}</span>人</li>
            </ul>
            <!-- 成员列表 -->
             <ul class="groupmem">
                <li class="clearfix loading" style="padding-left:1rem"><span class="fl">加载中</span><mt-spinner type="triple-bounce" color='rgb(38, 162, 255)'></mt-spinner></li>
                 
                <li class="clearfix" v-if="memberlist.length != 0">
                    <span style="width:7%;position:relative;">
                        
                    </span>
                    <span style="width:20%">所在组</span>
                    <span class="membername" style="width:17%">用户名</span>
                    <span class="memberphone" style="width:32%">手机号</span>
                    <span style="width:8%;">状态</span>
                    <span class="option" style="width:15%;text-align:center">操作</span>
                </li>
                <li v-if="memberlist.length == 0 && isshow == true" style="margin-top:10px;">暂无数据</li>                
                <li class="clearfix" v-for="item in memberlist">
                    <span style="width:7%;position:relative;">
                        <input type="checkbox" class="checkbox-input memselectid" :value="item.id" @click="setselectall"> 
                        <span class="mint-checkbox-core"></span>
                    </span>
                    <span style="width:20%">{{item.groupname}}</span>
                    <span class="membername" style="width:17%">{{item.username}}</span>
                    <span class="memberphone" style="width:32%">{{item.phone}}</span>
                    <span style="width:8%;font-size:1.2rem" v-if="item.status=='0'"><img src="../../../static/selected.png" alt="" style="margin-left:-3px;width:1.5rem;height:1.5rem;"></span>
                    <span style="width:8%;font-size:1.2rem" v-else>×</span>
                    <span style="width:15%;">
                        <button class="mint-button mint-button--primary mint-button--small is-plain" @click="changemember(item)">
                            <label class="mint-button-text">修改</label>
                        </button>
                    </span>
                </li>
            </ul>
            <!-- 新增 -->
            <ul class="add">
                <li class="fl" @click="start">启用</li>
                <li class="fl" @click="disabled">禁用</li>
                <li class="fl" @click="deletemem">删除</li>
                <li class="fl">修改分组<a id="choosegroup"></a></li>
            </ul>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import MobileSelect from 'mobile-select';
    import { Toast } from 'mint-ui';
    export default {
        name: 'memberlist',
        data(){
            return {
                groupname:'',
                nownumber:33,
                created_at:'2018-05-13',
                searchvalue:'',
                isshow:true,
                memberlist:[],
                isselectall:false,
                count:[],
                grouplist:[],
                selectid:[],
                dataisshow:false
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


            this.getallmem();
            var that = this;
           
            this.$axios({
                method:'get',
                url:'/index.php?g=landpush&m=landpush&a=allGroupOptions',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                // console.log(res) 
                that.grouplist = res.data.data;
                var arr = [];
                for(var i = 0; i < that.grouplist.length;i++){
                    arr[i] = {};
                    arr[i].id = that.grouplist[i].groupid;
                    arr[i].value = that.grouplist[i].name;
                }
                // console.log(that.grouplist)
                that.$nextTick(function(){
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#trigger',
                        title: '请选择分组',
                        wheels: [
                                    {data:arr}
                                ],
                        position:[], //初始化定位
                        callback:function(indexArr, data){
                            // console.log(data); //返回选中的json数据
                            that.$axios({
                                method:'post',
                                url:'/index.php?g=landpush&m=landpush&a=groupToUser',
                                headers:{
                                    'Content-Type' : 'application/x-www-form-urlencoded'
                                },
                                data:{
                                    groupId:data[0].id
                                }
                            }).then(function(res){
                                console.log(res)
                                that.memberlist = res.data.data
                                Toast(res.data.message);
                            })
                        }
                    });
                    var mobileSelect2 = new MobileSelect({
                        trigger: '#choosegroup',
                        title: '请选择分组',
                        wheels: [
                                    {data:arr}
                                ],
                        position:[], //初始化定位
                        callback:function(indexArr, data){
                            console.log(data) //返回选中的json数据
                            var arr = [];
                            $('.memselectid:checked').each(function(){
                                arr.push(Number($(this).val()));
                            })
                            that.selectid = arr;
                            if(that.selectid.length == 0){
                                Toast('请选择成员');
                                return
                            }                                
                            that.$axios({
                                method:'post',
                                url:'/index.php?g=landpush&m=landpush&a=userGroup',
                                data:{
                                    pusherStrId:that.selectid,
                                    groupId:data[0].id
                                },
                                headers:{
                                    'Content-Type':'application/x-www-form-urlencoded'
                                }
                            }).then(function(res){
                                console.log(res);
                                Toast(res.data.data.successCount+'条数据修改成功,'+res.data.data.failCount+'条数据修改失败'); 
                                that.getallmem();
                                $('.memselectid').each(function(){
                                    $(this).prop('checked',false)
                                })                   
                            })
                        }
                    });
                })                 
            })
        },
        methods:{
            getallmem(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                $('#trigger').html('全部分组');
                var that = this;
                this.$axios({
                    method:'get',
                    url:'/index.php?g=landpush&m=landpush&a=userList',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    that.dataisshow = true;
                    $('.loading').hide();
                    console.log(res)
                    if(res.data.code == 0){
                        that.count = res.data.data.count;
                        that.memberlist = res.data.data.user;
                    }else{
                        Toast(res.data.message)
                    }  
                })
            },
            setselectall(){
                 var selectlength = $('.memselectid:checked').length;
                 var alllength = $('.memselectid').length;
                 if(selectlength < alllength){
                     this.isselectall = false;
                 }else{
                     this.isselectall = true;
                 }
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
                    url:'/index.php?g=landpush&m=landpush&a=searchUser',
                    data:{
                        searchName:that.searchvalue
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    if(res.data.code == 0){
                        that.memberlist = res.data.data;
                    }else{
                        Toast(res.data.message)
                    }                    
                })
            },
            start(){
                var arr = [];
                $('.memselectid:checked').each(function(){
                    arr.push(Number($(this).val()));
                })
                this.selectid = arr;
                if(this.selectid.length == 0){
                    Toast('请选择成员');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                // console.log(this.selectid)
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=editStatus',
                    data:{
                        pusherStrId:that.selectid,
                        status:0
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    Toast(res.data.data+'条数据'+res.data.message); 
                    that.getallmem();
                    $('.memselectid').each(function(){
                       $(this).prop('checked',false)
                    }) 
                    that.isselectall = false;                
                })
            },
            disabled(){
                var arr = [];
                $('.memselectid:checked').each(function(){
                    arr.push(Number($(this).val()));
                })
                this.selectid = arr;
                // console.log(this.selectid)
                if(this.selectid.length == 0){
                    Toast('请选择成员');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                // console.log(this.selectid)
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=editStatus',
                    data:{
                        pusherStrId:that.selectid,
                        status:1
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    Toast(res.data.data+'条数据'+res.data.message);  
                    that.getallmem(); 
                    $('.memselectid').each(function(){
                       $(this).prop('checked',false)
                    })    
                    that.isselectall = false;                
                })
            },
            deletemem(){
                var arr = [];
                $('.memselectid:checked').each(function(){
                    arr.push(Number($(this).val()));
                })
                this.selectid = arr;
                // console.log(this.selectid)
                if(this.selectid.length == 0){
                    Toast('请选择成员');
                    return
                }
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=pusherDelete',
                    data:{
                        pusherStrId:that.selectid
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    console.log(res);
                    var success;
                    var fail;
                    if(res.data.data.isDeleteInfo == null){
                        success = 0;
                    }else{
                        success = res.data.data.isDeleteInfo.length;
                    }
                    if(res.data.data.noDeleteInfo == null){
                        fail = 0;
                    }else{
                        fail = res.data.data.noDeleteInfo.length;
                    }
                    Toast('成功删除'+success+'条数据,'+fail+'条删除失败');  
                    that.getallmem(); 
                    $('.memselectid').each(function(){
                       $(this).prop('checked',false)
                    })         
                    that.isselectall = false;           
                })
            },
            changemember(e){
                // console.log(e)
                var obj = {};
                obj.memberid = e.id;
                obj.memname = e.username;
                obj.memphone = e.phone;
                this.$router.push({
                    path:'/changemember',
                    query:obj
                })
            },
            selectall(){
                this.isselectall = true;
                $('.checkbox-input').prop('checked',true);
            },
            cancleselectall(){
                this.isselectall = false;
                $('.checkbox-input').prop('checked',false);
            }
        },
         watch:{
            searchvalue:function(){
                if(this.searchvalue == ''){
                    this.getallmem();
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

    .add{
        width: 100%;
        height: 7%;
        background-color: #eee;
        position:fixed;
        bottom:0;
        left:0;
    }
    .add li{
        width: 24.5%;
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
        position:relative;
    }
    .add #choosegroup{
        position:absolute; 
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0;
    }
    .groupmem{
        padding-bottom:4rem;
    }
    .groupmem li{
        padding:0.5rem 0 0.5rem 0;
    }
    .groupmem span{
        height: 2rem;
        float:left;
        display: flex;
        /* display: -webkit-box; */
        /* justify-content: center; */
        align-items: center;
    }
    .groupmem span:last-child{
        justify-content:flex-end;
    }
    .groupmem span.option{
        justify-content:center;
    }
    .groupmem .mint-button{
        font-size:0.9rem;
        height:auto;
        padding:0.1rem 0.6rem;
        float:right;
    }
    
    .groupmem .mint-checkbox{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .groupmem .mint-checkbox-core{
        width: 1.1rem;
        height: 1.1rem;
    }
    .groupmem .checkbox-input{
        opacity:0;
        position:absolute;
        top:0.3rem;
        left:0;
        z-index:99;
    }
    .checkbox-input:checked+.mint-checkbox-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
    }
    .checkbox-input:checked+.mint-checkbox-core:after {
        border-color: #fff;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
    }
    .mint-checkbox-core:after{
        top:0.1rem;
        left:0.3rem;
    }
</style>
