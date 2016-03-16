import React, { Component } from 'react';
import styles from './index.css'

export default class Hello extends Component {
    render() {
        return (
            <div className={ styles.root }>Hello world</div>
        );
    }
}
