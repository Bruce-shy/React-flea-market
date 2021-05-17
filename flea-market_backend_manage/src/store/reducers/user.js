export default (state = { list: [], page: 1 }, action) => {
    switch (action.type) {
      case "USER_LOADED":
        return {
          ...state,
          list: action.payload.data,
          page: action.payload.pages
        };
      default:
        return state;
    }
  };
