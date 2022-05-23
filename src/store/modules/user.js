import {getToken,setToken,removeToken,setTimeStamp} from '@/utils/auth'
import { login,getUserInfo,getUserDetailById } from '@/api/user'
// state
const getDefaultState = () => {
  return {
    // token: null    //token状态共享
    // token从缓存中读取
    token: getToken(),
    // 初始化用户资料信息
    userInfo:{}  //值不能是null ？？？
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
  },
  // 设置用户资料
  setUserInfo (state, userinfo) {
    // 使用浅拷贝  数据更新 才会触发组件更新
    state.userInfo = {...userinfo}
  },
  removeUserInfo (state) {
    state.userInfo = {}
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

    // 写入时间戳
    setTimeStamp()

  },
  // 请求获取用户信息的方法
 async getUserInfo ({ commit }) {
   const res = await getUserInfo()  //发送请求获取用户信息
   console.log(res,1)
  //  获取用户头像  借助于上面获取到的用户的id
   const baseInfo = await getUserDetailById(res.userId)
   console.log(baseInfo,2)
  //  合并数据
   const baseResult = {...res,...baseInfo}
   commit('setUserInfo', baseResult)  //将获取到的用户资料设置到vuex数据中
   return baseResult;   //？
  },
//  登出
  loginout ({ commit }) {
    // 删除token
    commit('removeToken')
    // 删除用户资料
    commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

