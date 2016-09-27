import React, { Component, PropTypes } from 'react'

import styles from './index.css'


export default class App extends Component {

    static propTypes = {
        children : PropTypes.element.isRequired
    }

    render() {
        const {
            children
        } = this.props;

        return (
            <div className={ styles.root }>
                { children }
            </div>
        )
    }
}
