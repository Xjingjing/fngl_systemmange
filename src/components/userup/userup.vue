<template>
    
</template>

<script>
export default {
        name: 'userup',
        data(){
            return {
                
            }
        },
        created(){
            var that =this;
            var newappid = 'wxc179ff8c019bd102';
            var redirect_url = encodeURIComponent('http://wxadmin.efunong.com/userup');
            var code = window.location.search.substr(1).split('&')[0].split('=')[1];
            console.log(code)
            if(!code){
                if(window.localStorage.getItem('openid') == null || window.localStorage.getItem('openid') == 'null' || window.localStorage.getItem('openid') == ''){
                    var state = Date.parse(new Date);
                    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+newappid+"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_base&state="+state+"#wechat_redirect";
                    window.location.href = url; 
                }else{
                    this.$axios({
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
                            window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                            that.$router.push({path:'/power'})
                        }else if(res.data.code == 0){
                            window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                            window.localStorage.setItem('pusherId',res.data.data.pusherInfo.pusherId);
                            window.localStorage.setItem('userpower','1');
                            that.$router.push({
                                path:'/index'
                            })
                        }else{
                            window.localStorage.setItem('userpower','2');
                            window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                            that.$router.push({path:'/bindphone'})
                        }
                    })       
            }
        }else{
            this.$axios({
                method:'post',
                url:'/index.php?g=landpush&m=landpush&a=loginCode',
                data:{
                    code:code,
                    action_type:2
                },
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                console.log(res)
                if(res.data.code == -1111){
                    window.localStorage.setItem('userpower','3');
                    window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                    that.$router.push({
                    path:'/power'
                    })        
                }else if(res.data.code == 0){
                    window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                    window.localStorage.setItem('pusherId',res.data.data.pusherInfo.pusherId);
                    window.localStorage.setItem('userpower','1');
                    that.$router.push({
                    path:'/index'
                    })
                }else{
                    window.localStorage.setItem('userpower','2');
                    window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                    that.$router.push({
                        path:'/bindphone'
                    })
                }
            })
        }
          
                
            
        },
}
</script>

<style scoped>

</style>