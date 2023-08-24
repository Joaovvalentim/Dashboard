// Constantes para códigos de status HTTP e tipo de conteúdo
const STATUS_OK = 200; // Código 200 (OK)
const STATUS_BAD_REQUEST = 400; // Código 400 (Bad Request)
const TYPE_APPLICATION_JSON = 'application/json'; // Tipo de conteúdo JSON

// Função para responder com uma resposta JSON bem-sucedida
const jsonOk = function (data, message = 'Successful request', metadata = {}) {
    const status = STATUS_OK;
    this.status(status); // Define o código de status da resposta
    this.type(TYPE_APPLICATION_JSON); // Define o tipo de conteúdo como JSON
    // Retorna a resposta formatada com a mensagem, dados, metadados e status
    return this.json({ message, data, metadata, status });
}

// Função para responder com uma resposta JSON de requisição inválida
const jsonBadRequest = function(data, message = 'Bad request', metadata = {}) {
    const status = STATUS_BAD_REQUEST;
    this.status(status); // Define o código de status da resposta
    this.type(TYPE_APPLICATION_JSON); // Define o tipo de conteúdo como JSON
    // Retorna a resposta formatada com a mensagem, dados, metadados e status
    return this.json({ message, data, metadata, status });
}

// Middleware para adicionar as funções de resposta personalizadas ao objeto de resposta
export const response = (req, res, next) => {
    res.jsonOk = jsonOk; // Adiciona a função jsonOk ao objeto de resposta
    res.jsonBadRequest = jsonBadRequest; // Adiciona a função jsonBadRequest ao objeto de resposta
    next(); // Chama o próximo middleware na cadeia
};
