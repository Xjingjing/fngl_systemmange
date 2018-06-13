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
        <mt-header fixed title="新增上报">
            <span slot="left" @click="$router.go(-1)">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <br>
        <mt-field label="用户名" placeholder="请输入用户名(必填)" v-model="username"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号(必填)" type="tel" v-model="phone"></mt-field>
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
                    <button class="areabutton" @click="getareadetail">定位</button>
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
        <div style="margin-top:0.8rem;border-top:1px solid #eee;">
            <div style="width:100%;display:flex;justify-content:center;">
                <label for="image" class="picbutton">上传图片</label>
                <input type="file" id='image' accept="image/*" style="display:none;" @change="selectimg">
                <span class="picbutton" @click="testpic">开始识别</span>
            </div>
            <div style="width:100%;">
                <img :src="src1" style="width:100%;" alt="">
                <img :src="src" style="display:none;" alt="" id="imagetest">
            </div>
        </div>
        <ul class="testresult" v-if="resultshow">
            <li class="clearfix"><span>编号</span><span>识别结果</span><span>操作</span></li>
            <li class="clearfix" v-for="(item,index) in resultlist" :key="index">
                <span>{{index+1}}</span>
                <span :id="'id_text'+index">{{item.words}}</span>
                <span><button class="areabutton id_copy" :data-clipboard-target="'#id_text'+index" data-clipboard-action="copy">复制</button></span>
            </li>
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
    import Clipboard from 'clipboard'; 

    export default {
        name:'adduserup',
        data(){
            var self = this;
            return{
                resultshow:false,
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
                
                lng: 0,
                lat: 0,
                src:'',
                src1:'',
                image:'',
                resultlist:[]
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

            // 类别picker
            var that = this;
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
        mounted(){
            var clipboard = new Clipboard(".id_copy");      
            clipboard.on('success', function(e) {
                // console.log(e)
                Toast('已成功复制到剪贴板');
                e.clearSelection();
            }); 
            var file = document.getElementById('image');
            if (getIos()) {
                file.removeAttribute("capture");
            }
            function getIos() {
                var ua=navigator.userAgent.toLowerCase();
                if (ua.match(/iPhone\sOS/i) == "iphone os") {
                    return true;
                } else {
                    return false;
                }
            }     
        },
        methods:{
            selectimg(){
                var that = this;
				var f = document.getElementById('image').files[0]; //获取file组件中的文件
                console.log(f)
                // alert(f.type)
                var formatlist = ['image/jpeg','image/jpg','image/png','image/bmp'];
                var isLt4M = f.size/1024/1024 <= 4;
                var format;
                if(!isLt4M){
                    Toast('图片不能大于4M');
                    return
                }
                for(var i = 0; i < formatlist.length;i++){
                    if(formatlist[i] == f.type){
                        format = true;
                        break
                    }
                }
                if(!format){
                    Toast('图片格式只支持jpeg,jpg,png,bmp');
                    return
                }
                var rd = new FileReader(); //创建文件读取对象  
                rd.readAsDataURL(f); //文件读取装换为base64类型  
                rd.onloadend = function(e) {       
                    that.src1 = this.result;
                    // that.image = this.result.split(',')[1];
                    var img = new Image();
                    img.src = this.result;
                    img.onload = function(){
                        var cvs = document.createElement('canvas');
                        cvs.width = this.width*0.55;
                        cvs.height = this.height*0.55;
                        var ctx = cvs.getContext("2d");
                        ctx.drawImage( this, 0, 0, cvs.width, cvs.height);
                        var newImageData = cvs.toDataURL('image/jpeg',0.8);
                        that.image = newImageData.split(',')[1];
                        // console.log(this.image)
                        that.src = newImageData;
                        console.log(newImageData)
                        // console.log($('#imagetest')[0])
                        // console.log(width)
                    }
                }
            },
            testpic(){
                var that = this;
                if(this.img == ''){
                    Toast('请上传图片');
                    return
                }
                var width = $('#imagetest')[0].width;
                var height = $('#imagetest')[0].height;
                console.log(width)
                // var cvs = document.createElement('canvas');
                // cvs.width = width*0.4;
                // cvs.height = height*0.4;
                // var ctx = cvs.getContext("2d");
                // ctx.drawImage( $('#imagetest')[0], 0, 0, cvs.width, cvs.height);
                // var newImageData = cvs.toDataURL();
                // this.image = newImageData.split(',')[1];
                // // console.log(this.image)
                // this.src = newImageData;
                // console.log($('#imagetest')[0].width)
                // console.log($('#imagetest')[0])
                // console.log(width)
                if(width<15||height<15){
                    Toast('图片最短边不能小于15px');
                    return
                }
                if(width>4096||height>4096){
                    Toast('图片最长边不能大于4096px');
                    return
                }
                
                this.$indicator.open({
                    text: '识别中...',
                    spinnerType: 'fading-circle'
                });
                this.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=recognitionImage',
                    data:{
                        baseImage:that.image
                    },
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    that.$indicator.close();
                    Toast('识别完毕');
                    that.resultlist = res.data.data.res.words_result;
                    that.resultshow = true;
                    // console.log(that.resultlist)
                })
            },
            getareadetail(){
                var that = this; 
                var geolocation = new BMap.Geolocation(); 
                //调用百度地图api 中的获取当前位置接口
                geolocation.getCurrentPosition(function(r){ if(this.getStatus() == BMAP_STATUS_SUCCESS){ 
                    // alert(r.point.lng+'---'+r.point.lat);
                    var myGeo = new BMap.Geocoder();
                    myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){ if (result){
                        // console.log(result)
                        that.areapre = result.addressComponents.province+','+result.addressComponents.city+','+result.addressComponents.district;
                        that.areadetail = result.addressComponents.street+result.addressComponents.streetNumber;
                        // console.log(that.areapre)
                    }})
                } });  
                    
            },

            selectmanagecate(){
                $('.managecatelist').css('display','block');
            },
            closemanagecate(){
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
                    pusherId : Number(window.localStorage.getItem('pusherId')),
                    sexid : Number(this.sexselect),
                    typeid : this.upcateid,
                    manageid : this.manageselectid,
                    developmentid : this.extendsselectid,
                    province : this.areapre.split(',')[0] || '',
                    city : this.areapre.split(',')[1] || '',
                    area : this.areapre.split(',')[2] || '',
                    address : this.areadetail
                };
                console.log(where)
                var that = this;
                that.$axios({
                    method:'post',
                    url:'/index.php?g=landpush&m=landpush&a=addReport',
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
        padding: 0.2rem 0.5rem;
    }
    .areabutton:focus{
        outline:none;
    }
    .mint-msgbox-content{
        padding:0;
    }
    .mint-field .mint-cell-title{
        font-size:1rem;
    }
    .managecatelist .mint-msgbox-content{
        padding-left:2.7rem;
    }
    .picbutton{
        background-color: #26a2ff;
        padding:0.6rem 0.8rem;
        border-radius: 0.5rem;
        color:#fff;
        margin:0.5rem auto;
    }
    .testresult{
        padding:0.8rem 0;
    }
    .testresult li{
        padding:0.3rem 0;
        display:flex;
        align-items: center;
        border-bottom:1px solid #eee;
    }
    .testresult span{
        float:left;
        box-sizing: border-box;
        text-align: center;
        font-size:1rem;
    }
    .testresult span:first-child{
        width: 20%;
    }
    .testresult span:nth-child(2){
        width: 60%;
    }
    .testresult span:last-child{
        width: 20%;
    }

</style>
