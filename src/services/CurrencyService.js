// Importações dos módulos e funções auxiliares necessárias
import { doGetRequest } from "helpers/apiHelper"; // Função para fazer requisições GET
import { SYMBOL_BRL, format } from "helpers/currencyHelper"; // Funções para formatar moedas

// URL base da API de cotações de moedas
const API_URL = 'https://economia.awesomeapi.com.br/json/';

// Função para obter o preço de uma moeda em relação ao BRL
const getPrice = (currency) => {
    // Monta a URL completa para obter a cotação da moeda específica
    const url = `${API_URL}${currency}`;
    // Resolver para formatar o preço da moeda em BRL
    const resolver = data => format(data[0].bid, SYMBOL_BRL);
    // Faz uma requisição GET à URL usando a função doGetRequest com o resolver
    return doGetRequest(url, {}, resolver);
};

// Função assíncrona para buscar os preços de diferentes moedas
const fetchData = async () => {
    // Aguarda a resolução das promessas getPrice para diferentes moedas
    const [usd, cad, eur] = await Promise.all([
        getPrice('USD'), // Preço do Dólar Americano (USD)
        getPrice('CAD'), // Preço do Dólar Canadense (CAD)
        getPrice('EUR'), // Preço do Euro (EUR)
    ]);
    // Retorna um objeto com os preços formatados das moedas
    return  { usd, cad, eur };
};

// Exporta um objeto com a função fetchData como propriedade
export default { fetchData };
