import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { get as getRepos } from 'actions/github'

import styles from './index.css'

@connect (
    (state) => ({
        repos: state.repos
    }),
    (dispatch) => bindActionCreators({ getRepos }, dispatch)
)

export default class Home extends Component {

    static propTypes = {
        getRepos: PropTypes.func
    }

    render() {

        const {
            getRepos
        } = this.props

        return (
            <div className={ styles.root }>
                <button onClick={ getRepos }>FETCH API GITHUB</button>
            </div>
        )
    }
}
