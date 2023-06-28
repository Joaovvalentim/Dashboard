import request from "request"

export const doGetRequest = (url, headers, dataResovler) => {

    const options = {
        method: "GET",
        json: true,
        headers,
        url,
    }
    const promiseCallback = (resolve, reject) => {
        request(options, (error, httpResponse, body) => {
            if (error) return reject(error) //caso de erro, para a execução
            const result = dataResovler(body)
            resolve(result)
        })
    }
    return new Promise(promiseCallback)
}