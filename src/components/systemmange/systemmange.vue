<template>
    
</template>

<script>
export default {
        name: 'systemmange',
        data(){
            return {
                
            }
        },
        created(){
            console.log('aaa')
            var that =this;
            var newappid = 'wxc179ff8c019bd102';
            var redirect_url = encodeURIComponent('http://wxadmin.efunong.com/systemmange');
            var code = window.location.search.substr(1).split('&')[0].split('=')[1];
            console.log(code)
            if(!code){
                if(window.localStorage.getItem('openid') == null || window.localStorage.getItem('openid') == 'null' || window.localStorage.getItem('openid') == ''){
                    console.log(222)
                    var state = Date.parse(new Date);
                    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+newappid+"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_base&state="+state+"#wechat_redirect";
                    window.location.href = url; 
                    // that.$router.push({
                    //     path:'/index1'
                    // })
                }else{
                    this.$axios({
                        method:'post',
                        url:'/index.php?g=landpush&m=landpush&a=loginCode',
                        data:{
                            openid:window.localStorage.getItem('openid'),
                            action_type:1
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
                            window.localStorage.setItem('sysisshow',1);
                            that.$router.push({
                                path:'/index1'
                            })
                        }else{
                            window.localStorage.setItem('syspower','false');
                            window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                            that.$router.push({path:'/power'}) 
                        }
                    })
                    console.log(234)
                    // console.log('aaa')
                    
            }
        }else{
            this.$axios({
                        method:'post',
                        url:'/index.php?g=landpush&m=landpush&a=loginCode',
                        data:{
                            code:code,
                            action_type:1
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
                                that.$router.push({
                                    path:'/index1'
                                })
                        }else{
                            window.localStorage.setItem('syspower','false');
                            window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                            that.$router.push({
                                path:'/power'
                            });  
                        }
                })
        }
        },
}
</script>

<style scoped>

</style>




