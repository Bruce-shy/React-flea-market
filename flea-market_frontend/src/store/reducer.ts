// import { combineReducers } from 'redux';

import { combineReducers } from 'redux-immutable'

// redux 模块化
import { reducer as userReducer } from '../pages/User/store'
// import { reducer as forumReducer} from '../pages/forum/course/store/index';
// import { reducer as introReducer} from '../pages/forum/course/intro/store/index';

export default combineReducers({
  user: userReducer,
  // forum: forumReducer,
  // intro: introReducer,
})
