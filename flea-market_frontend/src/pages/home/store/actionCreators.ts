import { message } from 'antd'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'
import {
  getGoodsListRequest,
  getGoodsInfoRequest,
  getCommentListRequest,
} from '../../../services/goods'

// 商品列表
export const changeGoodsList = (data: any) => ({
  type: actionTypes.CHANGE_GOODS_LIST,
  data: fromJS(data),
})

// 商品信息
export const changeGoodsInfo = (data: any) => ({
  type: actionTypes.CHANGE_GOODS_INFO,
  data: fromJS(data),
})

// 评论列表
export const changeCommentList = (data: any) => ({
  type: actionTypes.CHANGE_COMMENT_LIST,
  data: fromJS(data),
})

// 获取所有商品信息
export const getGoodsList = (remind = true) => {
  return (dispatch: any) => {
    if (remind) {
      const messageHide = message.loading('加载中', 0) // 全局loading 异步自行移除
      getGoodsListRequest()
        .then((res: any) => {
          messageHide()
          if (res.success) {
            dispatch(changeGoodsList(res.data))
            message.success(res.message)
          } else {
            message.error(res.message)
          }
        })
        .catch((err) => {
          message.error(err)
        })
    } else {
      // 隐式更新 不被用户觉察
      getGoodsListRequest()
        .then((res: any) => {
          if (res.success) {
            dispatch(changeGoodsList(res.data))
          } else {
            console.log(res.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

// 获取商品详情
export const getGoodsInfo = (id: string, data: object) => {
  return (dispatch: any) => {
    const messageHide = message.loading('加载中', 0)
    getGoodsInfoRequest(id, data)
      .then((res: any) => {
        messageHide()
        if (res.success) {
          message.success(res.message)
          dispatch(changeGoodsInfo(res.data))
        } else {
          message.error(res.message)
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
}

// 获取商品评论信息
export const getCommentList = (id: string, data: object) => {
  return (dispatch: any) => {
    getCommentListRequest(id, data)
      .then((res: any) => {
        if (res.success) {
          console.log('评论信息',res)
          dispatch(changeCommentList(res.data))
        } else {
          console.log(res.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
