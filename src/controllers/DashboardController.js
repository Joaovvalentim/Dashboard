import express from "express";
import BitcoinService from "services/BitcoinService";
import BovespaServices from "services/BovespaServices";
import CurrencyService from "services/CurrencyService";
import GoogleTrendsService from 'services/GoogleTrendsService';


const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const [bitcoin, bovespa, currency, googletrends] = await Promise.all([
            BitcoinService.fetchData(),
            BovespaServices.fetchData(),
            CurrencyService.fetchData(),
            GoogleTrendsService.fetchData(),
        ])
        return res.jsonOk({bitcoin, bovespa, currency, googletrends});
    } catch (error) {
        return res.jsonBadRequest({error})
    }


});

module.exports = router;