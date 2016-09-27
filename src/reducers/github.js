import {
    GET_GITHUB_PENDING,
    GET_GITHUB_SUCCESS,
    GET_GITHUB_FAILED
} from 'config/actions'


const initialState = {}

export default function reducer(state = initialState, action) {

    switch (action.type) {
    case GET_GITHUB_PENDING:
        return {
            pending: true
        }
    case GET_GITHUB_SUCCESS:
        return action.payload

    case GET_GITHUB_FAILED:
        return { error: action.payload }

    default:
        return state
    }
}
