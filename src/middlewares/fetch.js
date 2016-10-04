const serialize = function(obj) {
    const str = [];
    for(let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
    }
    return str.join('&')
}

const goTo = (action, store, next, payload, meta) => {

    if (typeof action !== 'function'){
        /* eslint-disable no-console */
        console.error('fetchMiddleware require a function for onStart, onSuccess, onFailure')
        /* eslint-enable no-console */
        return
    }

    const res = action(payload, meta, store.dispatch, store.getState)
    res && next(res)
}

let config = {
    base : '',
    onRequest : null,
    defaultHeaders : {
        'Content-Type' : 'application/json'
    },
    defaultParams : {}
}

const fetchMiddleware = store => next => action => {

    if (!action.url){
        return next(action)
    }

    let request = {
        url : action.url,
        method : action.method || 'GET',
        headers : {...config.defaultHeaders},
        params : {...config.defaultParams, ...(action.params || {})},
        body : action.body
    }

    if (config.onRequest){
        request = {...request, ...config.onRequest(request, store.getState(), action)}
    }

    action.onStart && goTo(action.onStart, store, next)
    fetch(config.base + request.url + (request.params ? '?' + serialize(request.params) : ''), {
        method : request.method,
        header : request.headers,
        body : JSON.stringify(request.body),
        mode : 'cors'
    })
    .then((response) => {
        return response.json().then((body) => {
            return {status : response.status, ok : response.ok, body}
        }).catch(() => {
            return {status : response.status, ok : response.ok, body : {}}
        })
    })
    .then((response) => {
        if (response.ok){
            action.onSuccess && goTo(action.onSuccess, store, next, response.body)
        }else {
            action.onError && goTo(action.onError, store, next, response.body, {httpCode : response.status})
        }
    })

}

export default function(custumConfig){
    config = {...config, ...custumConfig}
    return fetchMiddleware
}
