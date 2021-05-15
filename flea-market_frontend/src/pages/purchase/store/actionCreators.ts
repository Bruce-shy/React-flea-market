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
export const getPurchaseList = (remind = true) => {
  return (dispatch: any) => {
    const messageHide = message.loading('加载中', 0) // 全局loading 异步自行移除
    getPurchaseListRequest()
      .then((res: any) => {
        messageHide()
        console.log('res成功', res)
        if (res.success) {
          dispatch(changePurchaseList(res.data))
          dispatch(changeEnterLoading(false))
          if (remind) {
            message.success(res.message)
          }
        } else {
          if (remind) {
            message.error(res.message)
          }
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
}
