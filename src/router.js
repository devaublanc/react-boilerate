import React from 'react';
import { Route } from 'react-router'

import App from 'containers/App';
import Home from 'containers/Home'
import Contact from 'containers/Contact'

export default () => {
    return (
        <Route component={ App }>
            <Route path='/' component={ Home } />
            <Route path='/contact' component={ Contact } />
        </Route>
    )
}
