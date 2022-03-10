const queryParams = (params) => {
    return params && Object.keys(params).length > 0
        ? `?${Object.keys(params).map(k => `${k}=${params[k]}`).join('&')}`
        : ''
}

module.exports = { queryParams }