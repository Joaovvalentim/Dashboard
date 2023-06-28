import express from "express";
import BitcoinService from "services/BitcoinService";
import BovespaServices from "services/BovespaServices";

const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Promise.all([
        BitcoinService.fetchData(),
        BovespaServices.fetchData()
    ])
    return res.json(result);
});

module.exports = router;