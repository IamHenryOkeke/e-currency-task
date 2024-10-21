import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState({});
  const [currentCurrency, setCurrentCurrency] = useState("GBP");

  // olamide@myecurrencyng.com

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await res.json();
      setRates(data.rates)
    }
    fetchData()
  }, [amount])

  return (
    <main className='p-20 space-y-3'>
      <h2>
        Currency converter
      </h2>
      <input type="text" className='border border-red-400 rounded pl-2 w-40 py-1' value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
      <select value={currentCurrency} onChange={(e) => {setCurrentCurrency(e.target.value)}} className='p-2 mx-3'>
        {
          Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))
        }
      </select>
      <p>
        Amount: {amount * rates[currentCurrency]}{" "}{currentCurrency}
      </p>
    </main>
  )
}

export default App
