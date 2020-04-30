
<template>
  <div id="app">
	  <transition :name="transitionName">   
		<keep-alive exclude="">
			<router-view />
			<!-- </router-view> -->
		</keep-alive>
		</transition>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data(){
      return {
          // transitionName:'',
					　　transitionName: 'slide-right'  ,// 默认动态路由变化为slide-right
							openid:"",
      }
  },
  created(){
		let url = window.location.href
		let urlike = url.split("#")[0]
		let openid = urlike.split("=")[1]
		this.openid = openid
		// this.openid = 13414811668
		// console.log(this.openid)
   this.logo()
  }, 
  methods: {
    logo(){
				this.$api.code.logo(this.openid).then(response => {
					let res = response.data
				if(res.flag == "Success"){
					if(res.data.is_set == 1){
						// sessionStorage  
						sessionStorage.setItem("userid",res.data.user_id)
						sessionStorage.setItem("is_set",res.data.is_set)
						this.$store.dispatch('userinfo',res.data.user_id)
						this.$store.commit('userinfo', res.data.user_id)
						this.$router.push({ path:"/"})
					}else{
						this.$store.dispatch('userinfo',res.data.user_id)
						this.$store.commit('userinfo', res.data.user_id)
					}
				}else{
					this.$message({
						showClose: true,
						message: res.msg,
						type: 'error'
					});
				}
			})
    },
  },
//   watch: {//使用watch 监听$router的变化  监听路由数据的彼岸花
//     $route(to, from) {
// 			this.transitionName = to.meta.index < from.meta.index ? 'right' : 'left'
//     }
// 		
		watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　       this.transitionName = 'slide-left'
　　　　　}
	　　this.$router.isBack = false
	　　}
　  },
		
  

  beforeCreate(){
  	

  },
}


</script>

<style>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }


  .left-enter,
  .right-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .left-leave-to,
  .right-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .left-enter-active,
  .left-leave-active,
  .right-enter-active,
  .right-leave-active {
    transition: transform .5s;
  }
	
	.Router {
     position: absolute;
     width: 100%;
     transition: all .8s ease;
     top: 40px;
}

.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
	
	
	
	
	
	
</style>
