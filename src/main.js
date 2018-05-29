// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import { Toast } from 'mint-ui';
import AMap from 'vue-amap';  
Vue.use(AMap);  
import axios from 'axios'
Vue.prototype.$axios = axios
import { Indicator } from 'mint-ui';
Vue.prototype.$indicator = Indicator
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
// Vue.prototype.baseurl = VueJsonp

router.beforeEach(function(to,from,next){
  if(to.path == '/systemmange'){
    var newappid = 'wxc179ff8c019bd102';
    var redirect_url = encodeURIComponent('http://wxadmin.efunong.com/index1');
    if(!window.localStorage.getItem('openid')){
      console.log(222)
        var state = Date.parse(new Date);
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+newappid+"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_base&state="+state+"#wechat_redirect";
        window.location.href = url;       
      }else{
        axios({
          method:'post',
          url:'/index.php?g=landpush&m=landpush&a=loginCode',
          data:{
              openid:window.localStorage.getItem('openid'),
              action_type:2
          },
          headers:{
              'Content-Type':'application/x-www-form-urlencoded'
          }
      }).then(function(res){
          console.log(res)
          if(res.data.code == 0){
              window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
              window.localStorage.setItem('pusherId',res.data.data.pusherInfo.pusherId);
              window.localStorage.setItem('syspower','true');
          }else{
            window.localStorage.setItem('syspower','false');
            window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
            router.push({
              path:'/power'
            });  
          }
      })
    //   var code = window.location.search.substr(1).split('&')[0].split('=')[1];
    //   window.localStorage.setItem('code',code);
    //   axios({
    //     method:'post',
    //     url:'/index.php?g=landpush&m=landpush&a=loginCode',
    //     data:{
    //         code:window.localStorage.getItem('code'),
    //         action_type:1
    //     },
    //     headers:{
    //         'Content-Type':'application/x-www-form-urlencoded'
    //     }
    // }).then(function(res){
    //     console.log(res)
    //     if(res.data.code == 0){
    //         window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
    //         window.localStorage.setItem('pusherId',res.data.data.pusherInfo.pusherId);
    //         window.localStorage.setItem('syspower','true');
    //         router.push({
    //           path:'/systemmange'
    //         })
    //     }else{
    //       router.push({
    //         path:'/power'
    //       });
    //       window.localStorage.setItem('syspower','false');
    //     }
    // })
  }
}
  if(to.path == '/userup'){
    var newappid = 'wxc179ff8c019bd102';
    var redirect_url = encodeURIComponent('http://wxadmin.efunong.com/index');
    if(!window.localStorage.getItem('openid')){
        console.log(111)
        var state = Date.parse(new Date);
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+newappid+"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_base&state="+state+"#wechat_redirect";
        window.location.href = url;   
      }else{
        axios({
          method:'post',
          url:'/index.php?g=landpush&m=landpush&a=loginCode',
          data:{
              openid:window.localStorage.getItem('openid'),
              action_type:2
          },
          headers:{
              'Content-Type':'application/x-www-form-urlencoded'
          }
      }).then(function(res){
          console.log(res)
          if(res.data.code == -1111){
              window.localStorage.setItem('userpower','3');
              that.$router.push({
              path:'/power'
              })
              window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
          }else if(res.data.code == 0){
              window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
              window.localStorage.setItem('pusherId',res.data.data.pusherInfo.pusherId);
              window.localStorage.setItem('userpower','1');
          }else{
              window.localStorage.setItem('userpower','2');
              that.$router.push({
                  path:'/bindphone'
              })
              window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
          }
      })
      } 
  }
  next()
})

  
// 初始化vue-amap  
// AMap.initAMapApiLoader({  
//   // 申请的高德key  
//   key: 'e1a004b9c8d9bcf7c1adbe916243710e',  
//   // 插件集合  
//   plugin: ['AMap.PlaceSearch', 'AMap.Geolocation']  
// });  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
