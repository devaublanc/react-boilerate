import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

// containers
import Home from 'containers/Home'

// components
import Navbar from 'components/Navbar'

// redux
import configureStore, { history } from 'store'
import routes from 'config/routes'


const initialState = {}
const store = configureStore(initialState)


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <div className="App">
            <Navbar routes={ routes } />
            <Route exact path={ '/' } component={ Home } />            
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
