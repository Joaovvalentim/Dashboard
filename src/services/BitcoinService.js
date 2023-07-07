
import { doGetRequest } from "helpers/apiHelper"
import { format, SYMBOL_USD, SYMBOL_BRL } from "helpers/currencyHelper"

const coinbaseURL = "https://api.coinbase.com/v2/prices/spot?currency=USD"
const bitcoinTradeURL = "https://api.bitcointrade.com.br/v3/public/BRLBTC/ticker"

const getPriceBitcoinTrade = () => {
    const dataResovler = (response) => {
        if(response && response.data && response.last)return format(response.data.last, SYMBOL_BRL)
        return format(0, SYMBOL_BRL)
        
    }
    return doGetRequest(bitcoinTradeURL, {}, dataResovler)
}
const getPriceCoinbase = () => {
    const dataResovler = (response) => {
        if(response && response.data && response.last)return format(response.data.amount, SYMBOL_USD)
        return format(0, SYMBOL_USD)
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