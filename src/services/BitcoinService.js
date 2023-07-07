
import { doGetRequest } from "helpers/apiHelper"
import { format, SYMBOL_USD, SYMBOL_BRL } from "helpers/currencyHelper"
import { get } from "helpers/contentHelper"

const coinbaseURL = "https://api.coinbase.com/v2/prices/spot?currency=USD"
const bitcoinTradeURL = "https://api.bitcointrade.com.br/v3/public/BRLBTC/ticker"

const getPriceBitcoinTrade = () => {
    const dataResovler = (response) => {

        const value = get(response, 'data.last', 0)
        return format(value, SYMBOL_BRL)

    }
    return doGetRequest(bitcoinTradeURL, {}, dataResovler)
}
const getPriceCoinbase = () => {
    const dataResovler = (response) => {
        const value = get(response, 'data.amount', 0)
        return format(value, SYMBOL_USD)
    }
    return doGetRequest(coinbaseURL, {}, dataResovler)
}

const fetchData = async () => {
    const [priceBitcoinTrade, priceCoinbase] = await Promise.all([getPriceBitcoinTrade(), getPriceCoinbase(),])

    return {
        usd: priceCoinbase,
        brl: priceBitcoinTrade
    }
}

export default { fetchData }