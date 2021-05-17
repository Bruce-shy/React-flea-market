import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import goods from "./reducers/goods";
import purchase from './reducers/purchase'
import user from "./reducers/user";

const appReducer = function (state = { scrollTo: 0 }, action) {
  // scrollTo:
  switch (action.type) {
    case "CHANGE_SCROLL_TO":
      // 每次设置随机数,保证数据改变
      return { ...state, scrollTo: Math.random() };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  goods, // product: product
  purchase,
  user,
  app: appReducer,
});

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])));
