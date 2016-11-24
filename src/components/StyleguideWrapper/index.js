import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from 'reducers'


const mockStore = createStore(reducer)

export default class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <Provider store={ mockStore }>
                { this.props.children }
            </Provider>
        )
    }
}
