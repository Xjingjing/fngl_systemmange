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
            if(!code){
                that.$router.push({
                    path:'/systemmange'
                })
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
                                path:'/systemmange'
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
