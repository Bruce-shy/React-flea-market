// 负责进行数据请求 加工
import { message } from 'antd'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'
import { getPurchaseListRequest } from '../../../services/purchases'

// 进场 loading
export const changeEnterLoading = (data: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

// 求购信息
export const changePurchaseList = (data: any) => ({
  type: actionTypes.CHANGE_PURCHASE_LIST,
  data: fromJS(data),
})

// 获取所有求购信息
export const getPurchaseList = (page = 1, remind = true) => {
  return (dispatch: any) => {
    if (remind) {
      const messageHide = message.loading('加载中', 0) // 全局loading 异步自行移除
      getPurchaseListRequest(page)
        .then((res: any) => {
          messageHide()
          dispatch(changeEnterLoading(false))
          if (res.success) {
            if (res.data.length === 0) {
              message.warning('没有更多数据了')
              dispatch(changePurchaseList(res.data))
              return
            }
            dispatch(changePurchaseList(res.data))
            message.success(res.message)
          } else {
            message.error(res.message)
          }
        })
        .catch((err) => {
          messageHide()
          dispatch(changeEnterLoading(false))
          message.error(err.message)
        })
    } else {
      getPurchaseListRequest(page)
        .then((res: any) => {
          if (res.success) {
            dispatch(changePurchaseList(res.data))
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
