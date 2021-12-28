import React, { createContext, useContext, useState, useEffect } from 'react';

const Crypto = createContext();

const CryptoContext = ({children}) => {

    const [currencies, setCurrencies] = useState(["USD","NGN"]);
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    useEffect(() => {
        if (currency === "USD") setSymbol("$");
        else if (currency === "NGN") setSymbol("₦")
        // else if (currency === "NGN") setSymbol("₦")
    }, [currency]);
    return (
        <Crypto.Provider 
            value={{ currency, currencies, symbol, setCurrency }}
        >
            {children}   
        </Crypto.Provider>
    )
}

export default CryptoContext


export const CryptoState = () =>{
    return useContext(Crypto);
}