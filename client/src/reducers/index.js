// redux store
import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'

export default combineReducers({
    // posts reducer is in our store now and available to every child for use
    posts: posts,
    auth: auth
})