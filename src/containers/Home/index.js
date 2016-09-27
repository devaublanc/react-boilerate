import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Toggle from 'components/Toggle';

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
                <Toggle onToggle={(toggle) => { alert('prout ' + toggle)}}>
                    Hahaha
                </Toggle>
                <button onClick={ getRepos }>GET REPOS GITHUB</button>
            </div>
        )
    }
}
