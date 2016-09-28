import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { get as getRepos } from 'actions/github'

import styles from './index.css'

@connect (
    (state) => ({
        repos: state.repos
    }),
    (dispatch) => ({
        getRepos: () => { dispatch(getRepos()) }
    })
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
                <button onClick={ getRepos }>GET REPOS GITHUB</button>
            </div>
        )
    }
}
