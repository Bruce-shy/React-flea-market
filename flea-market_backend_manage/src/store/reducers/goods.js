export default (state = { goodsList: [], page: 1 }, action) => {
  switch (action.type) {
    case 'GOODS_LOADED':
      return {
        ...state,
        goodsList: action.payload.data,
        page: action.payload.page,
      }
    default:
      return state
  }
}
