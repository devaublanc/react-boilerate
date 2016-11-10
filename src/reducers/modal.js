import { OPEN_MODAL, CLOSE_MODAL } from 'config/actions'

const initialState = {
    open: false,
    id: -1
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

    case OPEN_MODAL:

        return {
            open: true,
            id: action.id
        }

    case CLOSE_MODAL:

        return {
            open: false,
            id: -1
        }

    default:
        return state
    }
}
