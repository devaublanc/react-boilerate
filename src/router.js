import React from 'react';
import { Route } from 'react-router'

import App from 'containers/App';
import Home from 'containers/Home'
import Contact from 'containers/Contact'

import routes from 'config/routes'

export default () => {
    return (
        <Route component={ App }>
            <Route path={ routes.home } component={ Home } />
            <Route path={ routes.contact } component={ Contact } />
        </Route>
    )
}
