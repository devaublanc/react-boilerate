import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Div, Button } from 'glamorous'

// actions
import { updateUi } from 'store/ui'

// selectors
import { selectUiState } from 'store'


@connect (
  createSelector(
    [selectUiState],
    (ui) => ({
      ui,
    })
  ),
  (dispatch) => bindActionCreators({
    updateUi
  }, dispatch)
)
class Home extends Component {

  static propTypes = {
    ui: PropTypes.object,
    updateUi: PropTypes.func
  }

  render() {
    return (
      <Div>
        <h1>Home { this.props.ui.foo }</h1>
        <Button onClick={() => {
          this.props.updateUi({
            foo: 'bar'
          })
        }}>Update UI</Button>

      </Div>
    );
  }
}

export default Home;
