export default (state = { purchaseList: [], page: 1 }, action) => {
  switch (action.type) {
    case 'PURCHASE_LOADED':
      return {
        ...state,
        purchaseList: action.payload.data,
        page: action.payload.page,
      }
    default:
      return state
  }
}
