<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import axios from 'axios'
    axios.defaults.retryDelay = 1000;
    if(window.location.host == 'wxadmin.efunong.com') {

      axios.defaults.baseURL = 'http://wxadmin.efunong.com:81';

    } else{
      axios.defaults.baseURL = 'http://tms.inner.efunong.com';

    } 
//		请求超时
	axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
		var config = err.config;
		// If config does not exist or the retry option is not set, reject
		if(!config || !config.retry) return Promise.reject(err);

		// Set the variable for keeping track of the retry count
		config.__retryCount = config.__retryCount || 0;

		// Check if we've maxed out the total number of retries
		if(config.__retryCount >= config.retry) {
			// Reject with the error
			return Promise.reject(err);
		}

		// Increase the retry count
		config.__retryCount += 1;

		// Create new promise to handle exponential backoff
		var backoff = new Promise(function(resolve) {
			setTimeout(function() {
				resolve();
			}, config.retryDelay || 1);
		});

		// Return the promise in which recalls axios to retry the request
		return backoff.then(function() {
			return axios(config);
		});
	});
export default {
  name: 'App',
  data(){
    return {

    }
  },
  created(){
    
  }
}
</script>

<style>
  #app{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding:2.5rem 10px 0 10px;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: "PingFangSC-Medium";
  }
  ul {
    list-style: none;
    padding:0;
    margin: 0;
  }

  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix:after {
    display: block;
    content: '';
    height: 0;
    width: 0;
    clear: both;
  }

  .hide {
    display: none;
  }
  .show {
    display: block;
  }


  @media (min-width:320px) and  (max-width:359px){
    html{font-size:13px !important}	
  }
  @media (min-width:360px) and  (max-width:399px){
    html{font-size:14px !important}
  }
  @media (min-width:400px) and  (max-width:479px){
    html{font-size:15px !important}
  }
  @media (min-width:480px) and  (max-width:639px){
    html{font-size:16px !important}
  }
  @media (min-width:640px) and  (max-width:709px){
    html{font-size:18px !important}
  }
  @media (min-width:710px) and  (max-width:759px){
    html{font-size:20px !important}
  }
  @media (min-width:760px) and  (max-width:820px){
    html{font-size:22px !important}
  }

  .picker-items{
      background-color: #fff !important;
      position:absolute;
      width: 100%;
      bottom:0;
  }
    .picker-toolbar{
        background-color: #fff !important;
    }
    .mint-header{
      height:2.8rem;
    }
    .mint-header-title{
      font-size:1rem;
    }
    .mintui{
      font-size:1rem;
    }
    .mint-searchbar{
      height:2.5rem;
    }
    .mint-searchbar input{
      font-size:1rem;
    }
    .mint-searchbar-cancel{
      font-size:1rem;
    }
        .mint-datetime{
        height:40%;
    }
    .mint-datetime .picker-toolbar{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2059;
    }
    .mint-cell{
        width:50%;
        float:left;
    }
    .mint-checklist:after{
      content:'';
      clear:both;
      display:block;
    }
    .mint-cell:last-child{
      background:none;
    }
    .mint-cell-wrapper{
      font-size:1rem !important;
      background:none;
      background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0) !important;
    }
    .mint-cell:last-child{
      background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0) !important;
    }
    .result .mint-cell-wrapper{
      padding:0;
    }
    .result .mint-checklist-label{
        padding:0 0 0 10px;
    }
    .mint-checkbox{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .mint-checkbox-core{
        width: 1.1rem;
        height: 1.1rem;
    }
    .checkbox-input{
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
    .mint-msgbox{
      font-size:1rem;
    }
    .mint-msgbox-title{
      font-size:1.2rem;
    }
    .adduserup .mint-cell-title {
        padding-left:0.7rem;       
    }   
    .mint-radiolist .mint-cell-title {
        padding-left:0;       
    }  
    .adduserup .mint-cell-wrapper {
        border-bottom:1px dashed #eee;
       padding:0.5rem 0;
    }
    .adduserup .mint-radiolist-title{
        margin:0;
        padding-left:0;
    }
    .adduserup .mint-radiolist-label{
      padding-left:0;
    }
    .adduserup .mint-checklist-label{
      padding:0;
    }
    .mint-radiolist .mint-cell-wrapper{
      padding:0;
      height:3rem;
      border:none;
    }
    .adduserup .mint-cell{
      /* width:40%; */
      min-height:10px;
    }
    .mint-field .mint-cell-title{
        width:7rem;
    }
    .adduserup .mint-checklist .mint-cell-wrapper{
        border:none;
    }
    .mint-checklist .mint-cell-wrapper{
      font-size:0.8rem;
    }
    .mint-header-button{
      flex:0 !important;
    }
    .mint-header.is-fixed{
      z-index:2 !important;
    }
    .mint-popup{
      overflow:hidden;
    }
    .adduserup .mint-field-core{
        font-size:1rem !important;
    }
    .mint-checkbox-input[disabled] + .mint-checkbox-core{
      background-color: #26a2ff !important;
      border-color:#26a2ff;
    }
    .mint-indicator-wrapper{
      background: rgba(0, 0, 0, 0.5) !important;
    }
</style>
