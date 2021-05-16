import * as actionTypes from './constants'
import { fromJS } from 'immutable'

// fromJS() 将一个js数据转换为 Immutable 类型的数据
const defaultState = fromJS({
  isLogin: false,
  userInfo: {},
  myGoods: [],
  myPurchase: [],
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS:
      // 展开原有的状态
      // return { ...state, isLogin: action.data} 不使用 immutable 的写法
      return state.set('isLogin', action.data)
    case actionTypes.CHANGE_USERINFO:
      return state.set('userInfo', action.data)
    case actionTypes.CHANGE_MYGOODS:
      return state.set('myGoods', action.data)
    case actionTypes.CHANGE_MYPURCHASE:
      return state.set('myPurchase', action.data)
    default:
      return state
  }
}
export default reducer
