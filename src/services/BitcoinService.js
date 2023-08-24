// Importações dos módulos e funções auxiliares necessárias
import { doGetRequest } from "helpers/apiHelper"; // Função para fazer requisições GET
import { format, SYMBOL_USD, SYMBOL_BRL } from "helpers/currencyHelper"; // Funções para formatar moedas
import { get } from "helpers/contentHelper"; // Função para acessar valores aninhados em objetos

// URLs para obter os preços do Bitcoin de diferentes fontes
const coinbaseURL = "https://api.coinbase.com/v2/prices/spot?currency=USD"; // Coinbase
const bitcoinTradeURL = "https://api.bitcointrade.com.br/v3/public/BRLBTC/ticker"; // BitcoinTrade

// Função para obter o preço do Bitcoin da BitcoinTrade
const getPriceBitcoinTrade = () => {
    const dataResolver = (response) => {
        // Obtém o valor do último preço do BitcoinTrade a partir da resposta
        const value = get(response, 'data.last', 0);
        // Formata o valor com o símbolo da moeda BRL
        return format(value, SYMBOL_BRL);
    };
    // Faz uma requisição GET à URL da BitcoinTrade usando a função doGetRequest
    return doGetRequest(bitcoinTradeURL, {}, dataResolver);
};

// Função para obter o preço do Bitcoin da Coinbase
const getPriceCoinbase = () => {
    const dataResolver = (response) => {
        // Obtém o valor do preço do Bitcoin da Coinbase a partir da resposta
        const value = get(response, 'data.amount', 0);
        // Formata o valor com o símbolo da moeda USD
        return format(value, SYMBOL_USD);
    };
    // Faz uma requisição GET à URL da Coinbase usando a função doGetRequest
    return doGetRequest(coinbaseURL, {}, dataResolver);
};

// Função assíncrona para buscar os preços do Bitcoin de ambas as fontes
const fetchData = async () => {
    // Aguarda a resolução das promessas getPriceBitcoinTrade e getPriceCoinbase
    const [priceBitcoinTrade, priceCoinbase] = await Promise.all([getPriceBitcoinTrade(), getPriceCoinbase()]);
    
    // Retorna um objeto com os preços formatados do Bitcoin de ambas as fontes
    return {
        usd: priceCoinbase, // Preço em USD da Coinbase
        brl: priceBitcoinTrade // Preço em BRL da BitcoinTrade
    };
};

// Exporta um objeto com a função fetchData como propriedade
export default { fetchData };
