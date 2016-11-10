import { OPEN_MODAL, CLOSE_MODAL } from 'config/actions'

export function open(id) {
    return {
        type: OPEN_MODAL,
        id
    }
}

export function close() {
    return {
        type: CLOSE_MODAL
    }
}
