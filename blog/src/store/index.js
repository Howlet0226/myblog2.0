import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
const store = new vuex.Store({
  state:{
    upid:''
  },
  mutations:{
    updated(state,val) {
      state.upid = val
    },
  },
  actions:{
    updated({commit},val){
      commit('updated',val)
    }
  }
})
export default   store