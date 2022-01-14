import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist 白名单,不需要鉴权的路径

router.beforeEach(async (to, from, next) => {
  console.log(to);
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  // 获取本地用户信息
  const hasGetUserInfo = store.getters.user;

  if (to.meta.auth) {
    // 需要鉴权
    if (hasGetUserInfo) {
      // 有用户信息,直接放行
      next();
    }
    else {
      // 没有用户信息,看下有没有token
      const hasToken = localStorage.getItem('adminToken');
      if (hasToken) {
        // 有token,还需要验证token有效性,以防过期
        try {
          await store.dispatch('user/getInfo');
          next();
        }
        catch (error) {
          // 未登录或者登录已过期的状态
          await store.dispatch('user/resetToken'); // 移除token
          Message.error('登录过期,请重新登录');
          next(`/login?redirect=${to.path}`); // 重新登录
          NProgress.done();
        }
      }
      else {
        // 没有token,需要重新进行登录
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }
  else {
    // 不需要鉴权
    if (to.path === '/login' && hasGetUserInfo) {
      // 是去的login页面,并且已经有用户信息(登录状态),放行进入首页
      next({ path: '/' });
    }
    else {
      // 不是去的login页面 ,直接放行
      next();
    }
    NProgress.done();
  }

  // vue-element-admin原有的鉴权流程
  // 是否有token
  // if (hasToken) {
  //   // 进入的网页是login
  //   if (to.path === '/login') {
  //     //直接放行,进入首页
  //     next({ path: '/' })
  //     NProgress.done()
  //   }
  //   // 进入的不是login
  //   else {
  //     // 是否有用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       // 有,放行
  //       next()
  //     }
  //     else {
  //       // 没有用户信息,但是有token
  //       try {
  //         // 获取用户信息
  //         await store.dispatch('user/getInfo')
  //         next()
  //       }
  //       catch (error) {
  //         // 重置token
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         // 导航到登录页面
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // }
  // else {
  //   /* has no token*/
  //   // 如果存在于白名单中,直接放行
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   }
  //   // 不在白名单中 
  //   else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
