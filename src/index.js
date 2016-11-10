import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render, unmountComponentAtNode } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import store from 'store'

const rootEl = document.getElementById('app')

const history = syncHistoryWithStore(browserHistory, store)

const mountApp = () => {
    const getRoutes = require('./router').default;
    render(
        <AppContainer>
            <Provider store={ store }>
                <Router history={ history }>
                    {getRoutes()}
                </Router>
            </Provider>
        </AppContainer>,
      rootEl
    )
}

mountApp()

if (module.hot) {
    module.hot.accept('./router', () => {
        setImmediate(() => {
            unmountComponentAtNode(rootEl);
            mountApp()
        })
    })
}
