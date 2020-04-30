import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


export default new Vuex.Store({
	state:{
		userid:[]
	},
	mutations:{
		userinfo(state,data){
			state.userid = data
		}
	},
	actions:{
		userinfo(state,data){
			state.commit('userinfo',data)
		}
	}
})