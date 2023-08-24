// Importações dos módulos e serviços necessários
import express from "express";
import BitcoinService from "services/BitcoinService";
import BovespaServices from "services/BovespaServices";
import CurrencyService from "services/CurrencyService";
import GoogleTrendsService from 'services/GoogleTrendsService';

// Cria um roteador Express para a rota definida neste módulo
const router = express.Router();

// Rota GET principal que busca dados de diferentes serviços e retorna uma resposta JSON
router.get('/', async (req, res) => {
    try {
        // Aguarda o retorno de dados de diferentes serviços usando Promise.all
        const [bitcoin, bovespa, currency, googletrends] = await Promise.all([
            BitcoinService.fetchData(),
            BovespaServices.fetchData(),
            CurrencyService.fetchData(),
            GoogleTrendsService.fetchData(),
        ]);

        // Retorna uma resposta JSON bem-sucedida com os dados coletados
        return res.jsonOk({bitcoin, bovespa, currency, googletrends});
    } catch (error) {
        // Retorna uma resposta JSON de erro em caso de falha
        return res.jsonBadRequest({error});
    }
});

// Exporta o roteador configurado para ser usado em outros módulos
module.exports = router;
