// 负责进行数据请求 加工
import { message } from 'antd'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'
import {
  getUserInfoRequest,
  updateUserInfoRequest,
  getUserPublishGoodsRequest,
  getUserPublishPurchaseRequest,
} from '../../../services/users'
import { setLocalStorage, clearLocalStorage } from '../../../common'
import { loginRequest } from '../../../services/auth'
import { getGoodsList } from '../../Home/store/actionCreators'
import { getPurchaseList } from '../../Purchase/store/actionCreators'

// 登录状态
export const changeLoginStatus = (data: any) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  // es6 新写法
  data,
})

// 用户信息
export const changeUserInfo = (data: any) => ({
  type: actionTypes.CHANGE_USERINFO,
  data: fromJS(data),
})

// 发布的商品信息
export const changeMyGoods = (data: any) => ({
  type: actionTypes.CHANGE_MYGOODS,
  data: fromJS(data),
})

// 发布的求购信息
export const changeMyPurchase = (data: any) => ({
  type: actionTypes.CHANGE_MYPURCHASE,
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
        messageHide()
        message.error(err.message)
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

// 获取用户信息
export const getUserInfo = (id: string, data: object) => {
  return (dispatch: any) => {
    getUserInfoRequest(id, data)
      .then((res: any) => {
        if (res.success) {
          dispatch(changeUserInfo(res.data))
          // 每次请求后在本地存储数据 存本地的原因 在用户第一次登录时获取用户信息
          setLocalStorage('userInfo', JSON.stringify(res.data))
        } else {
          console.log(res.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// 更新用户信息
export const updateUserInfo = (id: string, data: object) => {
  return (dispatch: any) => {
    updateUserInfoRequest(id, data)
      .then((res: any) => {
        if (res.success) {
          dispatch(getPurchaseList(1, false)) // 当用户更新信息时，重新获取求购数据 (因为不跳转页面 让用户不感知 不提示 remind = false)
          dispatch(getGoodsList(1, false)) // 同上
          message.success(res.message)
          dispatch(changeUserInfo(res.data))
          // 更新本地数据
          setLocalStorage('userInfo', JSON.stringify(res.data))
        } else {
          message.error(res.message)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }
}

// 获取用户发布的商品
export const getUserPublishGoods = (id: string, data: object) => {
  return (dispatch: any) => {
    getUserPublishGoodsRequest(id, data)
      .then((res: any) => {
        if (res.success) {
          console.log('商品', res)
          dispatch(changeMyGoods(res.data))
          // 每次请求后在本地存储数据 存本地的原因 在用户第一次登录时获取用户信息
          setLocalStorage('myGoods', JSON.stringify(res.data))
        } else {
          console.log(res.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// 获取用户发布的求购
export const getUserPublishPurchase = (id: string, data: object) => {
  return (dispatch: any) => {
    getUserPublishPurchaseRequest(id, data)
      .then((res: any) => {
        if (res.success) {
          console.log('求购', res)
          dispatch(changeMyPurchase(res.data))
          // 每次请求后在本地存储数据 存本地的原因 在用户第一次登录时获取用户信息
          setLocalStorage('myPurchase', JSON.stringify(res.data))
        } else {
          console.log(res.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
