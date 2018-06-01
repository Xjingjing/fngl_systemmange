<template>
     <div class="result">
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">扩展成果</div>
                </div>
                <div class="mint-msgbox-content groupmem">
                    <mt-checklist
                        v-model="value"
                        :options="options">
                    </mt-checklist>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click="$router.go(-1)">关闭</button> 
                </div>
            </div>
        </div>
        <div class="v-modal" style="z-index: 2054;"></div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import { Checklist } from 'mint-ui';
    export default {
        name: 'extendsresult',
        data(){
            return {
                isshow:true,
                membername:'',
                memberphone:'',
                membergroup:'',
                value:[],
                options:[]
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



            var arr = [];
            for(var k in this.$route.query){
                arr.push(this.$route.query[k])
            }
            this.value = arr;

            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            var that = this;
            this.$axios({
                method:'get',
                url:'/index.php?g=landpush&m=landpush&a=allManageDevelopment',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                that.$indicator.close();
                var extendlist = res.data.data.development;
                var arr = [];
                for(var i = 0; i < extendlist.length;i++){
                    arr[i] = {};
                    arr[i].label = extendlist[i].name;
                    arr[i].value = extendlist[i].id;
                    arr[i].disabled = true;
                }
                that.options = arr;
            })
        
        },
        methods:{

        }
    }
</script>

<style scoped>
    .mint-msgbox-input input{
        padding: 0.6rem 0;
        text-align: center;
        margin-bottom:0.5rem;
    }
    .mint-msgbox-errormsg{
        text-align:center;
    }
    .picker {
        height: 100%;
        background-color: rgba(0,0,0,.3);
        overflow: hidden;
        z-index: 2057;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0,0,0,.4);
    }
    .groupmem .mint-checkbox{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core::after{
        border-color:#666;
    }
    .mint-msgbox-content{
        padding:0;
    }
    .mint-checklist{
        padding-left:5px;
        font-size:0.8rem;
    }
</style>
