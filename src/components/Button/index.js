import React, { Component, PropTypes} from 'react'
import classNames from 'classnames'

import styles from './index.css'

export default class Button extends Component {

    static propTypes = {
        children: PropTypes.node,
        rootStyle: PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.string,
        model : PropTypes.number
    }

    static defaultProps = {
        onClick: () => {},
        type : 'button'
    }

    render(){

        const {
            children,
            rootStyle,
            onClick,
            model
        } = this.props

        const finalRootStyle = classNames(styles.root, {
            [styles.validation] : model === 1,
            [rootStyle] : rootStyle
        })

        return (
            <button
                onClick={ () => onClick() }
                className={ finalRootStyle }
                >
                    {children}
            </button>
        )
    }
}
