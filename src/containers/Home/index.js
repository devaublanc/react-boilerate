import React, {Component} from 'react'

import styles from './index.css'

import Toggle from 'components/Toggle';

export default class Home extends Component {


    render() {
        return (
            <div className={ styles.root }>
                <Toggle onToggle={(toggle) => { alert('prout ' + toggle)}}>
                    Hahaha
                </Toggle>
            </div>
        )
    }
}
