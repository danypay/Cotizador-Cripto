import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function FormSearch() {
    const initialState : Pair = {
        currency: '',
        criptocurrency: ''
    }
    const { cryptoCurrencies,fetchData } = useCryptoStore()
    const [pair, setPair] = useState(initialState)
    const [error, setError] = useState('')

    function handleChange(event : ChangeEvent<HTMLSelectElement>){
        setPair({
            ...pair,
            [event.target.name]: event.target.value
        })
    }
    function handleSubmit(event : FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(Object.values(pair).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        // Consultar API
        fetchData(pair)
    }

    return (
        <form 
            className="form"
            onSubmit={handleSubmit}
        >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map(currency => (
                        <option
                            key={currency.code}
                            value={currency.code}
                        >
                            {currency.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="criptocurrency">Criptomoneda:</label>
                <select
                    name="criptocurrency"
                    id="criptocurrency"
                    onChange={handleChange}
                    value={pair.criptocurrency}
                >
                    <option value="">-- Seleccione --</option>
                    {cryptoCurrencies.map(crypto => (
                        <option
                            key={crypto.CoinInfo.Name}
                            value={crypto.CoinInfo.Name}
                        >
                            {crypto.CoinInfo.FullName}
                        </option>
                    ))}

                </select>
            </div>
            <input type="submit" value='Cotizar' />
        </form>
    )
}
