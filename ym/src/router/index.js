import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import setup from '@/components/setup'
import remind from '@/components/remind'
import record from '@/components/record'
import info from '@/components/info'




Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
		  name: 'index',
			 meta:{
				 index:0,
				 requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
				 },
		  component: index   //首页
		},
    {
      path: '/setup',
      name: 'setup',
			 meta:{
				 // index:1,
			 },
      component: setup
    },
		{
		  path: '/remind',
		  name: 'remind',
			 meta:{
				 // index:2,
			 },
		  component: remind
		},
		{
		  path: '/record',
		  name: 'record',
			 meta:{
				 // index:3,
				 },
		  component: record
		},
		{
		  path: '/info',
		  name: 'info',
			 meta:{
				 // index:4,
				 },
		  component: info
		}
  ]
})

