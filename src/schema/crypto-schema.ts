import {z} from 'zod'

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
})

export const CryptoResponseSchema = z.object({
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
})

export const CryptosResponseSchema = z.array(CryptoResponseSchema)

export const PairSchema = z.object({
    currency: z.string(),
    criptocurrency: z.string(),
})

export const CryptoPriceSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
})