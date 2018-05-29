<template>
    
</template>

<script>
export default {
        name: 'index',
        data(){
            return {
                
            }
        },
        created(){
            var that =this;
            var code = window.location.search.substr(1).split('&')[0].split('=')[1];
            console.log(code)
            if(!code){
                that.$router.push({
                    path:'/userup'
                })
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
                    that.$router.push({
                    path:'/power'
                    })
                    window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                }else if(res.data.code == 0){
                    window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                    window.localStorage.setItem('pusherId',res.data.data.pusherInfo.pusherId);
                    window.localStorage.setItem('userpower','1');
                    that.$router.push({
                    path:'/userup'
                    })
                     window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                }else{
                    window.localStorage.setItem('userpower','2');
                    that.$router.push({
                        path:'/bindphone'
                    })
                    window.localStorage.setItem('openid',res.data.data.pusherInfo.openid);
                }
            })
            }
            
        },
}
</script>

<style scoped>

</style>
