// Importa o módulo "request" para realizar requisições HTTP
import request from "request";

// Função para realizar uma requisição POST usando o módulo "request"
export const doPostRequest = (url, data, headers, dataResolver) => {
    // Define uma função padrão para resolver os dados da resposta
    const defaultResolver = data => data;
    // Usa o dataResolver fornecido ou o padrão, caso não seja fornecido
    const resolver = dataResolver || defaultResolver;

    // Define um objeto de cabeçalhos padrão
    const defaultHeaders = {};
    // Usa os cabeçalhos fornecidos ou os padrões, caso não sejam fornecidos
    const requestHeaders = headers || defaultHeaders;

    // Configura as opções para a requisição
    const options = {
        method: 'POST', // Método POST
        json: true, // Trata os dados como JSON
        form: data, // Dados a serem enviados no corpo da requisição
        headers: requestHeaders, // Cabeçalhos da requisição
        url, // URL de destino
    };

    // Define a função de callback da promessa
    const promiseCallback = (resolve, reject) => {
        // Faz a requisição usando as opções configuradas
        request(options, (error, httpResponse, body) => {
            if (error) return reject(error); // Caso ocorra um erro na requisição, rejeita a promessa
            const result = resolver(body); // Chama o resolver para processar os dados da resposta
            resolve(result); // Resolve a promessa com os dados processados
        });
    };
    
    // Retorna uma nova promessa com a função de callback
    return new Promise(promiseCallback);
};

// Função para realizar uma requisição GET usando o módulo "request"
export const doGetRequest = (url, headers, dataResolver) => {
    // Define uma função padrão para resolver os dados da resposta
    const defaultResolver = data => data;
    // Usa o dataResolver fornecido ou o padrão, caso não seja fornecido
    const resolver = dataResolver || defaultResolver;

    // Define um objeto de cabeçalhos padrão
    const defaultHeaders = {};
    // Usa os cabeçalhos fornecidos ou os padrões, caso não sejam fornecidos
    const requestHeaders = headers || defaultHeaders;

    // Configura as opções para a requisição
    const options = {
        method: "GET", // Método GET
        json: true, // Trata os dados como JSON
        headers: requestHeaders, // Cabeçalhos da requisição
        url, // URL de destino
    };

    // Define a função de callback da promessa
    const promiseCallback = (resolve, reject) => {
        // Faz a requisição usando as opções configuradas
        request(options, (error, httpResponse, body) => {
            if (error) return reject(error); // Caso ocorra um erro na requisição, rejeita a promessa
            const result = resolver(body); // Chama o resolver para processar os dados da resposta
            resolve(result); // Resolve a promessa com os dados processados
        });
    };
    
    // Retorna uma nova promessa com a função de callback
    return new Promise(promiseCallback);
};
