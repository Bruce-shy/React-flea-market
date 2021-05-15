import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  goodsList: [], // 商品列表
  goodsInfo: {}, // 商品详情
  commentList:[], // 评论列表
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_GOODS_LIST:
      return state.set('goodsList', action.data)
    case actionTypes.CHANGE_GOODS_INFO:
      return state.set('goodsInfo', action.data)
    case actionTypes.CHANGE_COMMENT_LIST:
      return state.set('commentList', action.data)
    default:
      return state
  }
}
export default reducer
