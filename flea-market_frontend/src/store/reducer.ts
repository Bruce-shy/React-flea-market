// import { combineReducers } from 'redux';

import { combineReducers } from 'redux-immutable'

// redux 模块化
import { reducer as userReducer } from '../pages/User/store'
import { reducer as purchaseReducer} from '../pages/Purchase/store';
import { reducer as goodsReducer} from '../pages/Home/store';

export default combineReducers({
  user: userReducer,
  purchase: purchaseReducer,
  goods: goodsReducer,
})
