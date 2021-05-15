import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  enterLoading: true, // 进场 loading
  purchaseList: [], // 求购列表
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    case actionTypes.CHANGE_PURCHASE_LIST:
      return state.set('purchaseList', action.data)
    default:
      return state
  }
}
export default reducer
