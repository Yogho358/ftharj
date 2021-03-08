



import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'


const reducer=combineReducers({
    notification:notificationReducer,
    blogs:blogReducer,
    users:userReducer
})

const store=createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store