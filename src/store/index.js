import Vue from 'vue'
import Vuex from 'Vuex'
import user from './modules/user'
import permission from './modules/permissions'
import getters from './getters'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    permission,
    user,
  },
  getters
})
export default store