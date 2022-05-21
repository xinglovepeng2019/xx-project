import {getToken,setToken,removeToken} from '@/utils/auth'
import { login } from '@/api/user'
// state
const getDefaultState = () => {
  return {
    // token: null    //token状态共享
    // token从缓存中读取
    token:getToken()
  }
}

const state = getDefaultState()

const mutations = {
  // 设置token
  setToken (state, token) {
    state.token = token  //设置token
    // vuex变化  ===》缓存token数据
    setToken(token)
  },
  // 删除token
  removeToken (state) {
    state.token = null  //删除vuex中的token
    // 清除缓存
    removeToken()
  }
}

const actions = {
  // 定义login action 调用登陆请求 ，接收参数data(mobile,password)

  async login ({ commit }, data) {
    const result = await login(data)   //就是一个promise result就是执行的结果
    // axios默认给数据加了一层data
    // if (result.data.success) {
      // 登陆接口调用成功 意味着用户名和密码是正确的
      // 还返回了token==result.data.data
      // 通过commit 修改state中的token
      // commit('setToken', result.data.data)
    // }

    commit('setToken', result)

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

