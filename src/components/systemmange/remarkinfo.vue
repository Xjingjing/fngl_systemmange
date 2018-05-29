<template>
     <div>
         <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2055;">
            <div class="mint-msgbox" style="">
                 <div class="mint-msgbox-header">
                     <div class="mint-msgbox-title">备注信息</div>
                </div>
                <div class="mint-msgbox-content groupmem">
                    <ul class="remarklist">
                        <li class="remark" v-for="item in remarklist">
                            <p class="clearfix">
                                <span class="fl"><span>备注人 : </span>{{item.contentby}}</span>
                                <span class="fr"><span>备注时间 : </span>{{item.createtime.split(' ')[0]}}</span>
                            </p>
                            <p>{{item.content}}</p>
                        </li>
                    </ul>
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
    export default {
        name: 'datamange',
        data(){
            return {
                isshow:true,
                remarklist:this.$route.query
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
    .mint-msgbox{
        max-height:70%;
    }
    .remark{
        border-top:1px solid #eee;
        font-size:1rem;
    }
    .remark:first-child{
        border:none;
    }
    .mint-msgbox-header{
        border-bottom:1px solid #eee;
        padding:0.8rem 0;
    }
    .mint-msgbox-content{
        max-height: 21rem;
        overflow: scroll;
    }
    .mint-checklist{
        padding-left:5px;
        font-size:0.8rem;
    }
</style>
