import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'containers/App';
import Home from 'containers/Home'
import Contact from 'containers/Contact'

import store from 'store'


const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Route component={ App }>
                <Route path='/' component={ Home } />
                <Route path='/contact' component={ Contact } />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
