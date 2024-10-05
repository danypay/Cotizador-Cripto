import axios from "axios"
import { CryptoPriceSchema, CryptosResponseSchema } from "../schema/crypto-schema"
import { Pair } from "../types"

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(url)
    const result = CryptosResponseSchema.safeParse(Data)
    if(result.success){
        return result.data
    }
}

export async function fetchCryptoPrice(pair: Pair) {
    const {currency,criptocurrency} = pair
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocurrency}&tsyms=${currency}`
    const {data: {DISPLAY}} = await axios(url)
    const result = CryptoPriceSchema.safeParse(DISPLAY[criptocurrency][currency])
    if(result.success){
        return result.data
    }
}