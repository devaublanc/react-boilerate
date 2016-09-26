// At the top of the file we import action constants
import {
    GET_GITHUB_PENDING,
    GET_GITHUB_SUCCESS,
    GET_GITHUB_FAILED
} from 'config/actions'

export function get(order = 1) {
    return {
        url : '/users/devaublanc/repos',
        params : {
            dataOrder: order
        },
        onStart: () => {
            return {
                type : GET_GITHUB_PENDING
            }
        },
        onSuccess: (payload) => {
            return {
                type: GET_GITHUB_SUCCESS,
                payload: { data : payload }
            }
        },
        onError: (payload) => {
            return {
                type: GET_GITHUB_FAILED,
                payload: payload.error
            }
        }
    }
}
