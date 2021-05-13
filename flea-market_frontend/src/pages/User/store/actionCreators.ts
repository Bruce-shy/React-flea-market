// 负责进行数据请求 加工
import { message } from 'antd'
import * as actionTypes from './constants'
import { getUserInfoRequest } from '../../../services/users'
import { setLocalStorage ,clearLocalStorage } from '../../../common'
import { loginRequest } from '../../../services/auth'
import { fromJS } from 'immutable'

// 登录状态
export const changeLoginStatus = (data: any) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  // es6 新写法
  data,
})

export const changeUserInfo = (data: any) => ({
  type: actionTypes.CHANGE_USERINFO,
  data: fromJS(data),
})

// 用户登录
export const getLogin = ({ account, password }: any) => {
  return (dispatch: any) => {
    const messageHide = message.loading('登录中', 0) // 全局loading 异步自行移除
    loginRequest({ account, password })
      .then((res: any) => {
        messageHide()
        if (res.success) {
          // 如果登录成功 isLogin 设为 true
          dispatch(changeLoginStatus(true))
          message.success('登录成功')
          setLocalStorage('token', res.data.token) // 设置 本地 token
        } else {
          message.error(res.message)
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
}

// 获取用户信息
export const getUserInfo = (account: object) => {
  return (dispatch: any) => {
    getUserInfoRequest(account)
      .then((res: any) => {
        dispatch(changeUserInfo(res.data))
        // 每次请求后在本地存储数据
        setLocalStorage('userInfo',JSON.stringify(res.data))
      })
      .catch((err) => {
        message.error(err)
      })
  }
}

// 退出登录
export const getLogout = () => {
  return (dispatch: any) => {
    dispatch(changeLoginStatus(false))
    dispatch(changeUserInfo({}))
    clearLocalStorage('token')
    clearLocalStorage('userInfo')
    message.success('退出成功')
  }
}
