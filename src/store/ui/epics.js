import { Observable } from 'rxjs' // eslint-disable-line
import { combineEpics } from 'redux-observable'

import { UPDATE_UI } from 'store/ui'

export const fooEpic = (action$) => {
  return action$.ofType(UPDATE_UI)
    .do(action => console.log('update UI', action))
    .ignoreElements()
}

export const uiEpic = combineEpics(
  fooEpic
)
