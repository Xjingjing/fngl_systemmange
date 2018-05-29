<template>
    <div class="power">
        <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2001;">
            <div class="mint-msgbox" style="">
                <div class="mint-msgbox-header">
                    <div class="mint-msgbox-title">访问被拒绝</div>
                </div> 
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-message">您暂无权限使用此功能,如有需要请联系部门主管开通该服务</div> 
                    <div class="mint-msgbox-input" style="display: none;">
                        <input placeholder="" type="text"> 
                        <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'power',
        data(){
            return {
                isshow:true
            }
        },

        
    }
</script>

<style scoped>
    .mint-msgbox-content{
        border:none !important;
    }
    .mint-msgbox{
        top:40% !important;
    }
</style>
