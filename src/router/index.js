import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import systemmange from '@/components/systemmange/systemmange'
import userup from '@/components/userup/userup'
import grouplist from '@/components/systemmange/grouplist'
import memberlist from '@/components/systemmange/memberlist'
import datamange from '@/components/systemmange/datamange'
import addgroup from '@/components/systemmange/addgroup'
import addmember from '@/components/systemmange/addmember'
import groupdetail from '@/components/systemmange/groupdetail'
import detailaddmember from '@/components/systemmange/detailaddmember'
import changegroupname from '@/components/systemmange/changegroupname'
import changemember from '@/components/systemmange/changemember'
import reportdetail from '@/components/systemmange/reportdetail'
import manageresult from '@/components/systemmange/manageresult'
import extendsresult from '@/components/systemmange/extendsresult'
import remarkinfo from '@/components/systemmange/remarkinfo'
import deletemember from '@/components/systemmange/deletemember'
import power from '@/components/systemmange/power'
import datacount from '@/components/userup/datacount'
import sharedetail from '@/components/userup/sharedetail'
import userupdetail from '@/components/userup/userupdetail'
import adduserup from '@/components/userup/adduserup'
import changeuserup from '@/components/userup/changeuserup'
import addremark from '@/components/userup/addremark'
import bindphone from '@/components/userup/bindphone'
import index from '@/components/userup/index'
import index1 from '@/components/systemmange/index1'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/index1',
      name: '首页',
      component: index1
    },
    {
      path: '/index',
      name: '首页',
      component: index
    },
    {
      path: '/systemmange',
      name: '系统管理',
      component: systemmange
    },
    {
      path: '/userup',
      name: '用户上报',
      component: userup
    },
    {
      path: '/grouplist',
      name: '分组列表',
      component: grouplist
    },
    {
      path: '/memberlist',
      name: '成员列表',
      component: memberlist
    },
    {
      path: '/datamange',
      name: '数据统计',
      component: datamange
    },
    {
      path: '/addgroup',
      name: '添加分组',
      component: addgroup
    },
    {
      path: '/addmember',
      name: '添加成员',
      component: addmember
    },
    {
      path: '/groupdetail',
      name: '小组详情',
      component: groupdetail
    },
    {
      path: '/detailaddmember',
      name: '添加成员',
      component: detailaddmember
    },
    {
      path: '/changegroupname',
      name: '修改组名',
      component: changegroupname
    },
    {
      path: '/changemember',
      name: '修改成员信息',
      component: changemember
    },
    {
      path: '/reportdetail',
      name: '上报详情',
      component: reportdetail
    },
    {
      path: '/manageresult',
      name: '经营成果',
      component: manageresult
    },
    {
      path: '/extendsresult',
      name: '扩展成果',
      component: extendsresult
    },
    {
      path: '/remarkinfo',
      name: '备注信息',
      component: remarkinfo
    },
    {
      path: '/deletemember',
      name: '移除成员',
      component: deletemember
    },
    {
      path: '/datacount',
      name: '数据统计',
      component: datacount
    },
    {
      path: '/sharedetail',
      name: '共享详情',
      component: sharedetail
    },
    {
      path: '/userupdetail',
      name: '上报详情',
      component: userupdetail
    },
    {
      path: '/addremark',
      name: '添加备注',
      component: addremark
    },
    {
      path: '/changeuserup',
      name: '修改上报',
      component: changeuserup
    },
    {
      path: '/adduserup',
      name: '添加上报',
      component: adduserup
    },
    {
      path: '/bindphone',
      name: '绑定手机号',
      component: bindphone
    },
    {
      path: '/power',
      name: '权限失败',
      component: power
    },
  ]
})
