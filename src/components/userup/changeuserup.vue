<template>
    <div style="width:100%;" class="adduserup">
        <!-- 选择经营品种 -->
        <div class="extendsresult" style="display:none;">
            <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
                <div class="mint-msgbox" style="">
                    <div class="mint-msgbox-header">
                        <div class="mint-msgbox-title">扩展成果</div>
                    </div>
                    <div class="mint-msgbox-content groupmem">
                        <mt-checklist
                            v-model="extendsselectlist"
                            :options="extendslist">
                        </mt-checklist>
                    </div> 
                    <div class="mint-msgbox-btns">
                        <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="closeextends">确定</button> 
                    </div>
                </div>
            </div>
            <div class="v-modal" style="z-index: 2054;"></div>
        </div>

        <!-- 选择经营品种 -->
        <div class="managecatelist" style="display:none">
            <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
                <div class="mint-msgbox" style="">
                    <div class="mint-msgbox-header">
                        <div class="mint-msgbox-title">经营品种</div>
                    </div>
                    <div class="mint-msgbox-content groupmem">
                        <mt-checklist
                            v-model="manageselectlist"
                            :options="managecatelist">
                        </mt-checklist>
                    </div> 
                    <div class="mint-msgbox-btns">
                        <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="closemanagecate">确定</button> 
                    </div>
                </div>
            </div>
            <div class="v-modal" style="z-index: 2054;"></div>
        </div>

        <!-- 头部 -->
        <mt-header fixed title="修改上报">
            <span slot="left" @click="$router.go(-1)">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <br>
        <mt-field label="用户名" disabled placeholder="请输入用户名(必填)" v-model="username"></mt-field>
        <mt-field label="手机号" disabled placeholder="请输入手机号(必填)" type="tel" v-model="phone"></mt-field>
        <a data-v-6e645841="" class="mint-cell mint-field">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">性别</span>
                </div> 
                <div class="mint-cell-value">
                    <mt-radio
                        v-model="sexselect"
                        :options="sex">
                    </mt-radio>
                </div>
            </div> 
            <div class="mint-cell-right"></div>
        </a>
        <a data-v-6e645841="" class="mint-cell mint-field">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">类别</span>
                </div> 
                <div class="mint-cell-value">
                    <input onfocus="this.blur()" class="mint-field-core" placeholder="点击选择类别" type="text" v-model="upcatename" id="trigger"> 
                </div>
            </div> 
            <div class="mint-cell-right"></div>
        </a>
        <a data-v-6e645841="" class="mint-cell mint-field">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">经营品种</span>
                </div> 
                <div class="mint-cell-value">
                    <input onfocus="this.blur()" class="mint-field-core" type="text" placeholder="点击选择经营品种" v-model="manageselectname" @click="selectmanagecate">
                </div>
            </div> 
            <div class="mint-cell-right"></div>
        </a>
        <a data-v-6e645841="" class="mint-cell mint-field">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">扩展成果</span>
                </div> 
                <div class="mint-cell-value">
                    <textarea onfocus="this.blur()" class="mint-field-core" placeholder="点击选择扩展成果" rows="2" v-model="extendsselectname" @click="selectextendsopen"></textarea> 
                </div>
            </div> 
            <div class="mint-cell-right"></div>
        </a>
        <a data-v-6e645841="" class="mint-cell mint-field">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">地址</span>
                </div> 
                <div class="mint-cell-value">
                    <input onfocus="this.blur()" class="mint-field-core" v-model="areapre" id="demo1"  type="text" name="input_area" placeholder="点击选择地址"/> 
                    <!-- <button class="areabutton" @click="getareadetail">定位</button> -->
                </div>
            </div> 
            <div class="mint-cell-right"></div>
        </a>
        <a data-v-6e645841="" class="mint-cell mint-field">
            <div class="mint-cell-left"></div> 
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">详细地址</span>
                </div> 
                <div class="mint-cell-value">
                    
                    <input class="mint-field-core" type="search" v-model="areadetail" placeholder="填写详细地址"/> 
                </div>
            </div> 
            <div class="mint-cell-right"></div>
        </a>
        <!-- <div class="amap-page-container">
            <el-amap style="display:none;" vid="amap" :plugin="plugin" class="amap-demo">
            </el-amap>
        </div> -->
        <ul class="clearfix formbutton">
            <li class="fl"><mt-button type="default" @click="$router.go(-1)">取消</mt-button></li>
            <li class="fl"><mt-button type="primary" @click="adduserup">提交</mt-button></li>
        </ul>
    </div>
</template>


<script>
    import { Radio } from 'mint-ui';
    import { Field } from 'mint-ui';
    import MobileSelect from 'mobile-select'; 
    import AMap from 'vue-amap'; 
    import VueJsonp from 'vue-jsonp';
    import { Toast } from 'mint-ui';
    export default {
        name:'changeuserup',
        data(){
            var self = this;
            return{
                oldinfo:{},
                username:'',
                phone:'',
                sex : [
                    {
                        label: '男',
                        value: '0'
                    },
                    {
                        label: '女',
                        value: '1'
                    }
                ],
                upcateid:0,
                upcatename:'',
                sexselect:'',
                manageselectlist:[],
                manageselectname:[],
                manageselectid:[],
                managecatelist:[],
                extendsselectlist:[],
                extendsselectname:[],
                extendsselectid:[],
                extendslist:[],
                areapre:'',
                areadetail:'',
                groupobj:this.$route.query,
                lng: 0,
                lat: 0,
                
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                    init(o) {
                        // o 是高德地图定位插件实例
                        o.getCurrentPosition((status, result) => {
                        if (result && result.position) {
                            self.lng = result.position.lng;
                            self.lat = result.position.lat;
                            console.log(self.lng)
                        }
                        });
                    }
                    }
                }]
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

            var that = this;
            this.$axios({
                method:'get',
                url:'/index.php?g=landpush&m=landpush&a=allManageDevelopment',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                // console.log(res)
                var extendlist = res.data.data.development;
                var managelist = res.data.data.manage;
                var arr = [];
                for(var i = 0; i < extendlist.length;i++){
                    arr[i] = {};
                    arr[i].label = extendlist[i].name;
                    arr[i].value = extendlist[i].id+','+extendlist[i].name;
                }
                that.extendslist = arr;
                var arr1 = [];
                for(var i = 0; i < managelist.length;i++){
                    arr1[i] = {};
                    arr1[i].label = managelist[i].name;
                    arr1[i].value = managelist[i].id+','+managelist[i].name;
                }
                that.managecatelist = arr1;
                that.$nextTick(function(){
                    var arr = [];
                    for(var i = 0; i < res.data.data.type.length;i++){
                        arr[i]={};
                        arr[i].id = res.data.data.type[i].id;
                        arr[i].value = res.data.data.type[i].name;
                    }
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#trigger',
                        title: '请选择类别',
                        wheels: [
                                    {data:arr}
                                ],
                        position:[], //初始化定位
                        callback:function(indexArr, data){
                            // console.log(data)
                            that.upcatename = data[0].value; //返回选中的json数据
                            that.upcateid = Number(data[0].id); //返回选中的json数据
                        }
                    });
                })
            })

            that.$axios({
                method:'post',
                url:'/index.php?g=landpush&m=landpush&a=landuserSearch',
                data:{
                    pusherId:Number(window.localStorage.getItem('pusherId')),
                    actionType:2,
                    currentSec:that.groupobj.day,
                    search:that.groupobj.changephone
                },
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                console.log(res)
                that.oldinfo = res.data.data[0];
                var arr = [];
                var arr1 = [];
                var arr4 = [];
                for(var i = 0; i < that.oldinfo.manageInfo.length; i++){
                    arr.push(that.oldinfo.manageInfo[i].manageid);
                    arr1.push(that.oldinfo.manageInfo[i].managename);
                    arr4.push(that.oldinfo.manageInfo[i].manageid+','+that.oldinfo.manageInfo[i].managename);
                }
                var arr2 = [];
                var arr3 = [];
                var arr5 = [];
                for(var i = 0; i < that.oldinfo.developmentInfo.length; i++){
                    arr2.push(that.oldinfo.developmentInfo[i].developmentid);
                    arr3.push(that.oldinfo.developmentInfo[i].developmentname);
                    arr5.push(that.oldinfo.developmentInfo[i].developmentid+','+that.oldinfo.developmentInfo[i].developmentname);
                }
                console.log(arr4)
                that.username = that.oldinfo.landusername;
                that.phone = that.oldinfo.landuserphone;
                that.sexselect = that.oldinfo.sexid;
                that.manageselectid = arr;
                that.manageselectlist = arr4;
                that.manageselectname = arr1;
                that.extendsselectid = arr2;
                that.extendsselectname = arr3;
                that.extendsselectlist = arr5;
                that.upcateid = that.oldinfo.typeid;
                that.upcatename = that.oldinfo.typename;
                that.areapre = that.oldinfo.province+','+that.oldinfo.city+','+that.oldinfo.area;
                that.areadetail = that.oldinfo.address;
                console.log(that.manageselectlist)
            })

            // 类别picker
            this.$nextTick(function(){ 

                var area = new LArea();
                area.init({
                    'trigger': '#demo1',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo':'#value1',//选择完毕后id属性输出到该位置
                    'keys':{id:'id',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'type':1,//数据源类型
                    'data':LAreaData//数据源
                });

            })
        },
        methods:{
            getareadetail(){
                var self = this;
                var url = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location='+self.lat+','+self.lng+'&output=json&pois=1&ak=Oqjw5Gqfw8GdeOh2uzG7jMLCS9WRsC2j'
                self.$jsonp(url)
                .then(function(res){
                    console.log(self.lng)
                    var data = res.result.addressComponent;
                    self.areapre = data.province+','+data.city+','+data.district;
                    self.areadetail = data.street+data.street_number;
                    console.log(res.result.addressComponent)
                })
            },

            selectmanagecate(){
                $('.managecatelist').css('display','block');
            },
            closemanagecate(){
                console.log(this.manageselectlist)
                this.manageselectid = this.manageselectlist.map(function(v){
                    return Number(v.split(',')[0])
                })
                this.manageselectname = this.manageselectlist.map(function(v){
                    var str = '';
                    str += v.split(',')[1] + ' ';
                    return str
                })
                $('.managecatelist').hide();

            },
            selectextendsopen(){
                $('.extendsresult').css('display','block');
            },
            closeextends(){
                this.extendsselectid = this.extendsselectlist.map(function(v){
                    return Number(v.split(',')[0])
                })
                this.extendsselectname = this.extendsselectlist.map(function(v){
                    var str = '';
                    str += v.split(',')[1] + ' ';
                    return str
                })
                $('.extendsresult').hide();
            },
            adduserup(){
                var where = {
                    name : this.username,
                    phone : Number(this.phone),
                    landuserId : Number(this.groupobj.changeid),
                    sexid : Number(this.sexselect),
                    typeid : this.upcateid,
                    manageid : this.manageselectid,
                    developmentid : this.extendsselectid,
                    province : this.areapre.split(',')[0] || '',
                    city : this.areapre.split(',')[1] || '',
                    area : this.areapre.split(',')[2] || '',
                    address : this.areadetail
                };
                console.log(where);
                var that = this;
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=editReport',
                    data:where,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    console.log(res)
                    Toast(res.data.message);
                    that.$router.go(-1);
                })
            }
        }
    }
</script>

<style scoped>
.amap-demo {
      height: 300px;
    }
    .mint-cell{
        width:100%;
        height:auto;
        min-height:10px;
    }
    .mint-checkbox{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core::after{
        border-color:#666;
    }
    .formbutton .mint-button{
        height:2.5rem;
        padding:0 2.5rem;
        font-size:1rem;
    }
    .formbutton li{
        margin-top:2rem;
        width:50%;
        text-align: center;
    }
    .areabutton{
        background-color: #fff;
        border: 1px solid #ddd;
        color: #999;
        border-radius: 0.3rem;
    }
    .areabutton:focus{
        outline:none;
    }
    .mint-msgbox-content{
        padding:0;
    }
    .mint-field-core{
        font-size:0.8rem;
    }

</style>
