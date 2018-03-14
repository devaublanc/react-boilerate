import React from 'react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { mockState } from 'config/tests/mocks'

import Home from 'containers/Home';

const mockStore = configureMockStore()

describe('Home', () => {
  let store
  beforeEach(() => {
    store = mockStore(mockState)
  })

  it('renders without crashing', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Home>
          <div>test</div>
        </Home>
      </Provider>
    )
    expect(tree).toBeDefined()
  })
})
