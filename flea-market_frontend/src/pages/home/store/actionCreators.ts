import { message } from 'antd'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'
import {
  getGoodsListRequest,
  getGoodsInfoRequest,
  getCommentListRequest,
  getGoodsListByCategoryRequest,
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

// 商品id
export const changeGoodsId = (data: any) => ({
  type: actionTypes.CHANGE_GOODS_ID,
  data,
})

// 商品类别
export const changeCategory = (data: any) => ({
  type: actionTypes.CHANGE_CATEGORY,
  data: fromJS(data),
})

// page
export const changePage = (data: any) => ({
  type: actionTypes.CHANGE_PAGE,
  data: fromJS(data),
})

// 获取所有商品信息
export const getGoodsList = (page = 1, remind = true) => {
  return (dispatch: any) => {
    dispatch(changePage(page)) // 修改 page
    if (remind) {
      const messageHide = message.loading('加载中', 0) // 全局loading 异步自行移除
      getGoodsListRequest(page)
        .then((res: any) => {
          messageHide()
          if (res.success) {
            if (res.data.length === 0) {
              message.warning('没有更多数据了')
              dispatch(changeGoodsList(res.data))
              return
            }
            dispatch(changeGoodsList(res.data))
            message.success(res.message)
          } else {
            message.error(res.message)
          }
        })
        .catch((err: any) => {
          messageHide()
          message.error(err.message)
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

// 根据category获取相关商品信息
export const getGoodsListByCategory = (page = 1, category: Array<string>) => {
  return (dispatch: any) => {
    const messageHide = message.loading('加载中', 0) // 全局loading 异步自行移除
    dispatch(changePage(page)) // 修改 page
    dispatch(changeCategory(category)) // 修改类别
    getGoodsListByCategoryRequest(page, category)
      .then((res: any) => {
        messageHide()
        if (res.success) {
          if (res.data.length === 0) {
            message.warning('没有更多数据了')
            dispatch(changeGoodsList(res.data))
            return
          }
          dispatch(changeGoodsList(res.data))
          message.success(res.message)
        } else {
          message.error(res.message)
        }
      })
      .catch((err: any) => {
        messageHide()
        message.error(err.message)
      })
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
          dispatch(changeGoodsId(id))
          dispatch(changeGoodsInfo(res.data))
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

// 获取商品评论信息
export const getCommentList = (id: string, data: object) => {
  return (dispatch: any) => {
    getCommentListRequest(id, data)
      .then((res: any) => {
        if (res.success) {
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
