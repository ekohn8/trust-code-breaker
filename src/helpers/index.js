import env from '../env'

export const callApi = (uri, opts = {}) => {
    if (opts.body) {
        opts.body = JSON.stringify(opts.body)
    }
    // console.log(opts)
    return fetch((opts.method?env.api.url:env.api.url2+opts.category) + uri, {
        ...opts,
        method: opts.method || 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.api.key}`,
            ...opts.headers
        },
    }).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.json()
        } else {
            throw res
        }
    })
}
