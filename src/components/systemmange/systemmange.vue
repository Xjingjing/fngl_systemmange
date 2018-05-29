<template>
    <div>
        <div>
            <mt-header fixed title="系统管理">
                <!-- <span slot="left" @click="$router.go(-1)">
                    <mt-button icon="back"></mt-button>
                </span> -->
            </mt-header>
            <div class="catelist">
                <button class="mint-button mint-button--primary mint-button--large is-plain" @click="togroup">
                    <label class="mint-button-text">分组列表</label>
                </button>
                <button class="mint-button mint-button--primary mint-button--large is-plain" @click="tomember">
                    <label class="mint-button-text">成员列表</label>
                </button>
                <button class="mint-button mint-button--primary mint-button--large is-plain" @click="todata">
                    <label class="mint-button-text">数据统计</label>
                </button>
            </div>
            <!-- <mt-navbar v-model="selected">
                <mt-tab-item id="1">分组列表</mt-tab-item>
                <mt-tab-item id="2">成员列表</mt-tab-item>
                <mt-tab-item id="3">数据统计</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    分组列表
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    成员列表
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    数据统计
                </mt-tab-container-item>
            </mt-tab-container> -->
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
    export default {
        name: 'App',
        data(){
            return {
                isshow:true,
            }
        },
        created(){

            // this.$getcode();
            var that = this;
           
        },
        methods:{

            togroup(){
                this.$router.push({path:'/grouplist'});
            },
            tomember(){
                this.$router.push({path:'/memberlist'})
            },
            todata(){
                this.$router.push({path:'/datamange'})
            }
        }
    }
    
</script>

<style scoped>
    /* .mint-navbar{
        margin-top:40px;
    }
    .mint-tab-container{
        margin-top:2px;
    } */

    .catelist{
        margin-top:15%;
    }
    .catelist button{
        margin-bottom:10%;
    }
    .mint-button{
        margin:auto;
        width:75%;
        height:66px;
        border-radius: 0.7rem;
        font-size:1.2rem;
    }
</style>
