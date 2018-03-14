import { combineEpics } from 'redux-observable'

import { uiEpic } from 'store/ui'

const rootEpic = combineEpics(
  uiEpic
)

export default rootEpic
