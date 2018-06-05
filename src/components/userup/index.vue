<template>
     <div style="padding-bottom:14%;">
            <!-- 头部 -->
            <mt-header fixed title="用户上报">
                <!-- <span slot="left" @click="$router.go(-1)">
                    <mt-button icon="back"></mt-button>
                </span> -->
            </mt-header>
            <!-- 搜索 -->
            <div class="mint-searchbar">
                <div class="mint-searchbar-inner">
                    <i class="mintui mintui-search"></i> 
                    <input type="search" placeholder="请输入您想要搜索的手机号" class="mint-searchbar-core" v-model="searchvalue">
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
                    <a data-v-71cc844a="" class="mint-searchbar-cancel" @click="datesearch">搜索</a>
                </div>
            </div>
            <!-- 数据 -->
            <div class="num">
                <p>共 <span class="red">{{count.days}}</span> 天 , 合计 <span class="red">{{count.aboutUserCount}}</span> 人 , 上报 <span class="red">{{count.allCount}}</span> 条 , 共享 <span class="red">{{count.shareCount}}</span> 条</p>
            </div>
            <!-- 上报列表 -->
            <ul class="uplist">
                <li class="clearfix">
                    <span>上报日期</span>
                    <span>人数</span>
                    <span>上报列表</span>
                </li>
                <li class="clearfix" v-for="item in reportlist">
                    <span>{{item.createtime}}</span>
                    <span>{{item.counts}}</span>
                    <span><button class="mint-button mint-button--primary mint-button--small is-plain" @click="userupdetail(item)"><label class="mint-button-text">查看详情</label></button></span>
                </li>
            </ul>

            <!-- 底部操作按钮 -->
            <ul class="add">
                <li class="fl" @click="datacount">数据统计</li>
                <li class="fl" @click="adduserup">新增上报</li>
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
        name: 'index',
        data(){
            return {
                isshow:true,
                searchvalue:'',
                startTime:'选择起始时间',
                endTime:'选择结束时间',
                pickerVisible:false,
                startDate:new Date("2015-01-01"),
                endDate:new Date(),
                count:{},
                reportlist:[],
                searchdate:1,
                searchendtime:0
            }
        },
        created(){
            this.getalluserreport();   
        },
        methods:{
            getalluserreport(){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=landuserReport',
                    data:{
                        actionType:1,
                        pusherId:Number(window.localStorage.getItem('pusherId')),
                        days:1
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    console.log(res)
                    that.count = res.data.data.count;
                    that.reportlist = res.data.data.daysList;
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
                    if(res.data.data.length == 0){
                        Toast('没有查询到匹配数据');
                        that.reportlist = [];
                    }else{
                        that.$router.push({
                            path:'/userupdetail2',
                            query:{searchvalue:that.searchvalue}
                        })
                    }
                })
            },
            datesearch(){   //自定义时间搜索
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var startTime = new Date(this.startTime);
                var endTime = new Date(this.endTime);
                // console.log(startTime.getTime())
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
                var that = this;
                that.searchdate = (endTime.getTime() - startTime.getTime())/(1000*60*60*24)+1;
                that.searchendtime = endTime.getTime()/1000;
                var data = {
                        actionType:1,
                        pusherId:Number(window.localStorage.getItem('pusherId')),
                        days:that.searchdate,
                        endTime:endTime.getTime()/1000
                    }
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=landuserReport',
                    data:data,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    // console.log(res);
                    that.count = res.data.data.count;
                    that.reportlist = res.data.data.daysList;
                })
            },
            todaysearch(e){  //今日  七日内搜索
                $('.selfdate').addClass('hide');
                $(e.target).removeClass('is-plain').parents('li').siblings('li').find('.datebutton').addClass('is-plain');
                this.getalluserreport();
            },
            sevensearch(e){  //今日  七日内搜索
                $('.selfdate').addClass('hide');
                $(e.target).removeClass('is-plain').parents('li').siblings('li').find('.datebutton').addClass('is-plain');
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                var that = this;
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=landuserReport',
                    data:{
                        actionType:1,
                        pusherId:Number(window.localStorage.getItem('pusherId')),
                        days:7
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    that.count = res.data.data.count;
                    that.reportlist = res.data.data.daysList;
                })
            },
            userupdetail(e){
                if(e.counts == 0){
                    Toast('这一天没有上报信息');
                    return
                }
                var obj = {};
                obj.day = new Date(e.createtime)/1000;
                // console.log(obj)
                this.$router.push({
                    path:'/userupdetail',
                    query:obj
                })
            },
            datacount(){
                this.$router.push({
                    path:'/datacount'
                })
            },
            adduserup(){
                this.$router.push({
                    path:'/adduserup'
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
        /* display:-webkit-box; */
        justify-content: center;
        align-items: center;
    }
    .add li:active{
        background-color: #ddd;
    }
    .add li:first-child{
        border-right:1px solid #ddd;
    }
    .uplist li{
        border-bottom:1px solid #eee;
        padding:0.5rem 0;
    }
    .uplist span{
        float:left;
        width:33.3%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        text-align: center;
    }
    .uplist .mint-button--primary.is-plain{
        font-size:0.9rem;
        height:auto;
        padding:0.1rem 0.6rem;
        border:none;
        color:#999;
    }

</style>
