import {
  UPDATE_UI
} from './constants'

const initialState = {
  foo: 42
}

export const uiReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_UI:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
