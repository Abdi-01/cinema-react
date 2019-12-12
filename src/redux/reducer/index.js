import {combineReducers} from 'redux'
import authReducers from '../reducer/authReducer'

export default combineReducers({
    user:authReducers
})