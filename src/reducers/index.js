import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import github from './github'
import modal from './modal'

export default combineReducers({
    routing: routerReducer,
    github,
    modal
})
