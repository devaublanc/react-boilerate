import React, { Component, PropTypes} from 'react'
import classNames from 'classnames'

import styles from './index.css'

export default class Button extends Component {

    static propTypes = {
        children: PropTypes.node,
        rootStyle: PropTypes.string,
        onClick: PropTypes.func,
        model : PropTypes.number
    }

    static defaultProps = {
        onClick: () => {}
    }

    render(){

        const {
            children,
            rootStyle,
            onClick            
        } = this.props

        return (
            <button onClick={ () => onClick() } className={ classNames(styles.root, rootStyle) }>
                {children}
            </button>
        )
    }
}
