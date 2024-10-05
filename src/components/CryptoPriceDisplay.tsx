import {  useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {
    const { result,loading } = useCryptoStore()
    // Verifica si el objeto result no está vacío y contiene las claves necesarias
    const hashResult = useMemo(() => {
        return result && Object.keys(result).length > 0
    }, [result])
    console.log(result)
    console.log(hashResult)
    return (
        <div className="result-wrapper">
            {loading ? <Spinner/> : hashResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img 
                            src={`https://cryptocompare.com/${result.IMAGEURL}`} 
                            alt="Imagen CryptoMoneda" 
                        />

                        <div>
                            <p>EL precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio más alto del día: <span>{result.HIGHDAY}</span></p>
                            <p>Precio más bajo del día: <span>{result.LOWDAY}</span></p>
                            <p>Variación ultimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima Actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
