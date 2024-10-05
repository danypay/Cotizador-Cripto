import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CryptoCurrency, CryptoPrice, Pair } from './types'
import { fetchCryptoPrice, getCryptos } from './Services/CryptoService'

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) =>({
    cryptoCurrencies : [],
    result : {} as CryptoPrice,
    fetchCryptos: async() => {
        const cryptoCurrencies = await getCryptos()
        set(() => ({
            cryptoCurrencies
        }))
    },
    loading: false,
    fetchData: async (pair) =>{
        set(() => ({
            loading: true
        }))
        const result = await fetchCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
    }
})))
