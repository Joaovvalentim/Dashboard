import request from "request"

export const doGetRequest = (url, headers, dataResovler) => {

    const defaultResolver = data => data
    const resolver = dataResovler || defaultResolver
    const defaultHeaders = {}
    const requestHeaders = headers || defaultHeaders

    const options = {
        method: "GET",
        json: true,
        requestHeaders,
        url,
    }


    const promiseCallback = (resolve, reject) => {
        request(options, (error, httpResponse, body) => {
            if (error) return reject(error) //caso de erro, para a execução
            const result = resolver(body)
            resolve(result)
        })
    }
    return new Promise(promiseCallback)
}