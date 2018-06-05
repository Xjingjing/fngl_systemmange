<template>
     <div>
            <!-- 头部 -->
            <mt-header fixed title="数据统计">
                <span slot="left" @click="$router.go(-1)">
                    <mt-button icon="back"></mt-button>
                </span>
            </mt-header>
            <!-- 搜索 -->
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i> 
                    <input type="search" placeholder="请输入您想要搜索的成员名称" class="mint-searchbar-core" v-model="searchvalue">
                </div> 
                <a class="mint-searchbar-cancel" @click="search">搜索</a>
            </div>
            <!-- 日期按钮 -->
            <ul class="selectdate clearfix">
                <li class="fl"><mt-button type="primary" size="small" @click="todaysearch($event)" class="datebutton">今日</mt-button></li>
                <li class="fl"><mt-button type="primary" size="small" @click="sevensearch($event)" class="is-plain datebutton">七日内</mt-button></li>
                <li class="fl"><mt-button type="primary" size="small" class="is-plain datebutton" @click="selfdateshow($event)">自定义</mt-button></li>
            </ul>
            <!-- 自定义日期范围 -->
            <div class="selfdate hide">
                <div data-v-71cc844a="" class="mint-searchbar">
                    <input placeholder="选择起始时间" id='start' type="text" class='form-control input-sm' readonly="" name='start' @click='openPicker("start")' v-model='startTime'> 
                    &nbsp;-&nbsp;
                    <input placeholder="选择结束时间" id='end' type="text" class='form-control input-sm' readonly="" name='end' @click='openPicker("end")' v-model='endTime'> 
                    <a data-v-71cc844a="" class="mint-searchbar-cancel" @click="selfdatesearch">搜索</a>
                </div>
            </div>
            <!-- 数据 -->
            <div class="num">
                <p>共 <span class="red">{{alldate}}</span> 天 , 合计 <span class="red">{{allusernum}}</span> 人</p>
                <p>上报数据 <span class="red">{{allupnum}}</span> 条 , 共享数据 <span class="red">{{allsharenum}}</span> 条</p>
            </div>
            <!-- 列表，成员上传列表 -->
            <ul class="grouplist">
                <li v-if="detaillist.length == 0" style="padding-top:1rem;text-align:center">-- 暂无数据 --</li>
                <li v-for="item in detaillist" v-else>
                    <div class="list-left">
                        <div class="clearfix"><h3 class="membername fl">{{item.username}}</h3><h3 class="membergroup fr">{{item.groupname}}</h3></div>
                        <span>上传数 : <span class="upnum red">{{item.userallcount}}</span></span><br>
                        <span>已共享 : <span class="sharenum red">{{item.shareCount}}</span></span>
                    </div>
                    <mt-button type="primary" class="is-plain" @click="reportdetail(item)">查看详情</mt-button>
                </li>
            </ul>
            <!-- 时间选择picker -->
            <mt-datetime-picker
                v-model="pickerVisible"
                type="date"
                ref="picker"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                :endDate="endDate"
                @confirm="handleConfirm"
            >
            </mt-datetime-picker>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import moment from 'moment'
    import { Toast } from 'mint-ui';
    export default {
        name: 'datamange',
        data(){
            return {
                isshow:true,
                searchvalue:'',
                searchendtime:0,
                searchdate:1,
                isselfday:false,
                allupnum:0,
                allsharenum:0,
                alldate:0,
                allusernum:0,
                detaillist:[],
                startTime:'选择起始时间',
                endTime:'选择结束时间',
                pickerVisible:false,
                startDate:new Date("2015-01-01"),
                endDate:new Date()
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

            this.getalldata();
        },
        methods:{
            getalldata(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=systemData',
                    data:{
                        actionType:1,
                        days:1
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    that.allupnum = res.data.data.count.allCount;
                    that.allsharenum = res.data.data.count.shareCount;
                    that.alldate = res.data.data.count.days;
                    that.allusernum = res.data.data.count.aboutUserCount;
                    that.detaillist = res.data.data.userList;   
                    // console.log(that.detaillist)           
                })
            },
            handleConfirm(data) {  //选好时间后对时间格式化填入input
                var date = moment(data).format('YYYY-MM-DD');
                if(this.type=='start'){
                    this.startTime = date;
                }
                if(this.type == 'end'){
                    this.endTime = date;
                }
            },
            openPicker(type) {   //打开时间选择picker
                this.type=type;
                this.$refs.picker.open();
            },
            selfdateshow(e){  //显示时间范围条目
                $(e.target).removeClass('is-plain').parents('li').siblings('li').find('.datebutton').addClass('is-plain');                
                // console.log($('.selfdate'))
                $('.selfdate').toggleClass('hide');
            },
            search(){   //顶上搜索
                if(this.searchvalue == ''){
                    Tosat('请输入搜索条件');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                var data;
                if(that.isselfday == false){
                    data = {
                        actionType:2,
                        days:that.searchdate,
                        username:that.searchvalue
                    }
                }else{
                    data = {
                        actionType:2,
                        days:that.searchdate,
                        endTime:that.searchendtime,                        
                        username:that.searchvalue
                    }
                }
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=systemData',
                    data:data,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    that.allupnum = res.data.data.count.allCount;
                    that.allsharenum = res.data.data.count.shareCount;
                    that.alldate = res.data.data.count.days;
                    that.allusernum = res.data.data.count.aboutUserCount;
                    that.detaillist = res.data.data.userList;   
                    // console.log(that.detaillist)           
                })
            },
            selfdatesearch(){   //自定义时间搜索
                this.isselfday = true;
                var startTime = new Date(this.startTime);
                var endTime = new Date(this.endTime);
                // console.log(this.startTime)
                // console.log(endTime.getTime())
                if(this.startTime == '选择起始时间'){
                    Toast('请选择起始时间');
                    return
                }
                if(this.endTime == '选择结束时间'){
                    Toast('请选择结束时间');
                    return
                }
                if(endTime.getTime()<startTime.getTime()){
                    Toast('结束日期不能小于起始日期');
                    return
                }
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                // if(endTime.getTime()>=startTime.getTime()){
                // 	if(endTime.getTime()-startTime.getTime() > 60*24*60*60*1000){
                //     // alert('日期差必须小于60天')
                //     $.toast("日期差必须小于60天", "text");
                //     return
                // }
                var that = this;
                that.searchdate = (endTime.getTime() - startTime.getTime())/(1000*60*60*24)+1;
                that.searchendtime = endTime.getTime()/1000;
                var data;
                if(that.searchvalue == ''){
                    data = {
                        actionType:1,
                        days:that.searchdate,
                        endTime:endTime.getTime()/1000
                    }
                }else{
                   data = {
                        actionType:2,
                        days:that.searchdate,
                        username:that.searchvalue,
                        endTime:endTime.getTime()/1000
                    }
                }
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=systemData',
                    data:data,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    that.allupnum = res.data.data.count.allCount;
                    that.allsharenum = res.data.data.count.shareCount;
                    that.alldate = res.data.data.count.days;
                    that.allusernum = res.data.data.count.aboutUserCount;
                    that.detaillist = res.data.data.userList;   
                    // console.log(that.detaillist)           
                })
            },
            todaysearch(e){  //今日  七日内搜索
                this.isselfday = false;
                $('.selfdate').addClass('hide');
                $(e.target).removeClass('is-plain').parents('li').siblings('li').find('.datebutton').addClass('is-plain');
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                that.searchdate= 1;
                var data;
                if(that.searchvalue == ''){
                    data = {
                        actionType:1,
                        days:1,
                    }
                }else{
                   data = {
                        actionType:2,
                        days:1,
                        username:that.searchvalue,
                    }
                }
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=systemData',
                    data:data,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    that.allupnum = res.data.data.count.allCount;
                    that.allsharenum = res.data.data.count.shareCount;
                    that.alldate = res.data.data.count.days;
                    that.allusernum = res.data.data.count.aboutUserCount;
                    that.detaillist = res.data.data.userList;   
                    // console.log(that.detaillist)           
                })
            },
            sevensearch(e){
                this.isselfday = false;
                $('.selfdate').addClass('hide');
                $(e.target).removeClass('is-plain').parents('li').siblings('li').find('.datebutton').addClass('is-plain');
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                that.searchdate = 7;
                var data;
                if(that.searchvalue == ''){
                    data = {
                        actionType:1,
                        days:7,
                    }
                }else{
                   data = {
                        actionType:2,
                        days:7,
                        username:that.searchvalue,
                    }
                }
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=systemData',
                    data:data,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    that.allupnum = res.data.data.count.allCount;
                    that.allsharenum = res.data.data.count.shareCount;
                    that.alldate = res.data.data.count.days;
                    that.allusernum = res.data.data.count.aboutUserCount;
                    that.detaillist = res.data.data.userList;   
                    // console.log(that.detaillist)           
                })
            },
            reportdetail(e){
                var obj = {};
                obj.pusherid = e.userid;
                obj.searchendtime = this.searchendtime;
                obj.searchdate = this.searchdate;
                obj.isselfday = this.isselfday;
                this.$router.push({
                    path:'/reportdetail',
                    query:obj
                })
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
    .selectdate li{
        width: 33.3%;
        margin:0.8rem 0 0 0;
        padding:0.8rem 0;
        border-bottom:1px solid #eee;
        border-top:1px solid #eee;
        text-align: center;
    }
    .selectdate .mint-button--small{
        height:2rem;
        font-size:1rem;
    }
    .num{
        text-align:center;
    }
    .grouplist h3{
        color:#666;
        margin:0.7rem 0;
    }
    .grouplist li{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding-left:9%;
        padding-right:9%;
        padding-bottom:3%;
        width: 100%;
        position: relative;
        /* border-top:1px solid #eee; */
        border: 1px solid #eee;
        margin-bottom: 0.5rem;
        border-radius: 0.7rem;
    }
    .grouplist .membergroup{
        color:#777;
    }
    .grouplist .mint-button{
        position:absolute;
        bottom:1rem;
        right:1.9rem;
        font-size:0.9rem;
        height:auto;
        padding:0.4rem 0.8rem;
    }
    .red{
        color:red;
    }
    .hide{
        display:none;
    }
    .selfdate{
        box-sizing: border-box;
        width:85%;
        margin:0 auto;
        border-bottom:1px solid #eee;
        padding-bottom:0.8rem;
        padding-top:0.8rem;
    }
    .selfdate input{
        padding-top:0.4rem;
        padding-bottom:0.3rem;
        font-size:0.8rem;
        text-align: center;
        width:40%;
        border-radius: 0.5rem;
        border:none;
    }
    .selfdate .mint-searchbar{
        margin:0;
        padding-right:0.2rem;
        height:2.5rem;
    }
    .selfdate .mint-searchbar-cancel{
        margin-left:0.6rem;
        width:13%;
    }

</style>
