import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import createHistory from 'history/createHashHistory'

import { uiReducer } from 'store/ui'
import rootEpic from 'store/rootEpic'

const isDevelopment = () => process.env.NODE_ENV === 'development'

export const history = createHistory()

const epicMiddleware = createEpicMiddleware(rootEpic)

const middlewares = [
  routerMiddleware(history),
  epicMiddleware
]

const rootReducer = combineReducers({
  ui: uiReducer,
  routing: routerReducer
})

const enhancers = []

if (isDevelopment()) {
  if (window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }
}

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  return store
}

export * from 'store/ui'

export default configureStore
