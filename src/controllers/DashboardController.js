import express from "express";
import BitcoinService from "services/BitcoinService";
import BovespaServices from "services/BovespaServices";

import CurrencyService from "services/CurrencyService";

const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Promise.all([
        BitcoinService.fetchData(),
        BovespaServices.fetchData(),
        CurrencyService.fetchData(),
    ])
    return res.json(result);
});

module.exports = router;