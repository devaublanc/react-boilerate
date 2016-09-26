import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

// Root reducer
import rootReducer from 'reducers'


// Custom middleware
// import requestQueueMiddleware from 'middlewares/requestQueue'
import fetchMiddleware from 'middlewares/fetch'

// Create an instance for superagentMiddleware
const fetchMiddlewareInstance = fetchMiddleware({
    base : 'https://exampleapi.com',
    defaultHeaders : {
        ['Accept'] : 'application/json',
        ['Content-type'] : 'application/json'
    },
    defaultParams : {
        api_key : '0123445689'
    },
    onRequest : (request, state) => {
        /* this code is called before each request, you can modify it */

        if (state.session.token) {
            request.params['token'] = 'jwt.token.1212GJ23'
        }

        return request
    }
})


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(fetchMiddlewareInstance, thunkMiddleware, routerMiddleware(browserHistory)),
        // window.devToolsExtension && !__PROD__ ? window.devToolsExtension() : f => f
        window.devToolsExtension && true ? window.devToolsExtension() : f => f
    )
)

export default store
