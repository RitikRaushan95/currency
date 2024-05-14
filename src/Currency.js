import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import React, { useState } from 'react'
import currencies from './utils/Data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

function Currency() {

    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [input, setInput]=useState('')
    const [value, setValue]=useState('')

    const handleFromChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToChange = (event) => {
        setToCurrency(event.target.value);
    };

    const handleSwap = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    const convert=(e)=>{
        const freecurrencyapi = new Freecurrencyapi('fca_live_2ac0ixgBcAnFinnTNrZTTFdgkbAxA2rlUweIUu5s');
        freecurrencyapi.latest({
            base_currency: fromCurrency,
            currencies: toCurrency
        }).then(response => {
            const conVal = response.data[toCurrency];
            setValue(input * conVal.toFixed(3));
            console.log(conVal)
        });
        e.preventDefault();
        
    }

    return (
        <>
        <div className='flex justify-center items-center mt-5'>
            <div className='container mt-5 w-[50%] rounded-md shadow-2xl'>
                <h1 className='max-w-sm mx-auto font-bold mt-5'>Currency Converter</h1>

                <div className='flex md:flex-row flex-col mt-5'>
                    <form className="max-w-sm mx-auto">
                        <label htmlFor="fromCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
                        <select id="fromCurrency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={fromCurrency} onChange={handleFromChange}>
                            <option value="">Choose a currency</option>
                            {currencies.map((c, index) => (
                                <option key={index} value={c}>{c}</option>
                            ))}
                        </select>
                    </form>
    
                    <button onClick={handleSwap}>
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </button>
    
                    <form className="max-w-sm mx-auto">
                        <label htmlFor="toCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To:</label>
                        <select id="toCurrency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={toCurrency} onChange={handleToChange}>
                            <option value="">Choose a currency</option>
                            {currencies.map((c, index) => (
                                <option key={index} value={c}>{c}</option>
                            ))}
                        </select>
                    </form>
                </div>

                <div className='flex flex-row'>
                    <input type="number" placeholder='Amount' className='border-2 rounded border-grey w-full p-2 mx-16 my-5' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                </div>

                <div clasa="p-2 w-full">
                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg m-5" onClick={convert}>Convert</button>
                </div>
                
               { value && <p className='text-center font-bold my-5 text-green-400'>{input} {fromCurrency} = {value} {toCurrency}</p>}
            </div>
        </div>
    </>
    
    )
}

export default Currency;
