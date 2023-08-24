// Importações dos módulos e funções auxiliares necessárias
import { doGetRequest } from "helpers/apiHelper"; // Função para fazer requisições GET
import { SYMBOL_BRL, format } from "helpers/currencyHelper"; // Funções para formatar moedas

// Importa o módulo "bovespa" para acessar dados da Bovespa
const bovespa = require("bovespa")();

// URL base da API de cotações
const API_URL = "https://brapi.dev/api/quote/";

// Função assíncrona para obter o preço de uma ação da Bovespa
const getPrice = async code => {
    // Monta a URL completa para obter a cotação da ação específica
    const url = `${API_URL}${code}?token=4W2JRvyjDqRCe4miXnhgpL`;
    // Resolver para formatar o preço da ação
    const resolver = data => format(data.results[0].regularMarketPrice, SYMBOL_BRL);
    // Faz uma requisição GET à URL usando a função doGetRequest com o resolver
    const price = await doGetRequest(url, {}, resolver);
    // Retorna um objeto com o código da ação e o preço formatado
    return { code, price };
};

// Função assíncrona para buscar os preços de várias ações da Bovespa
const fetchData = async () => {
    // Aguarda a resolução das promessas getPrice para diferentes ações
    const result = await Promise.all([
        getPrice('MGLU3'), // Preço da ação MGLU3
        getPrice('PETR4'), // Preço da ação PETR4
        getPrice('EVEN3'), // Preço da ação EVEN3
    ]);
    // Retorna um array de objetos com códigos e preços das ações
    return result;
};

// Exporta um objeto com a função fetchData como propriedade
export default { fetchData };
