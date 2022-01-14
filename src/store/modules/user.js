import { loginApi, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER: (state, payload) => {
    state.user = payload
  },
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        const { data } = res;
        if (data) {
          commit('SET_USER', data);
          resolve();
        }
        else {
          reject(res);
        }
      }).catch(error => {
        reject(error);
      })
    })


    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 恢复登录状态
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {

      getInfo().then(res => {
        if (typeof res === 'string') {
          // 未登录或者登录已过期
          res = JSON.parse(res);
          if (res.code === 401) {
            reject(res.msg);
          }
        }
        else {
          // 成功
          commit('SET_USER', res.data);
          resolve();
        }
      })
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // 移除token
      resetRouter() // 重置路由
      commit('RESET_STATE') //重置状态
      resolve()
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 移除token
      commit('RESET_STATE') // 重置状态
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

