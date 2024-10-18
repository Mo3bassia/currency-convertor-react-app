// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const [fromSelect, setFromSelect] = useState("USD");
  const [toSelect, setToSelect] = useState("EUR");
  const [currencyValue, setCurrencyValue] = useState(1);
  const [result, setResult] = useState("");
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function fetchData(e) {
    setCurrencyValue(e.target.value);
    if (e.target.value === "") setCurrencyValue(1);
  }

  useEffect(
    function () {
      async function convert() {
        setIsLoaded(false);
        if (toSelect === fromSelect) {
          setResult(currencyValue);
          return;
        }
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${currencyValue}&from=${fromSelect}`
        );
        const data = await response.json();
        setResult(data.rates[toSelect]);
        setIsLoaded(true);
      }
      convert();
    },
    [fromSelect, toSelect, currencyValue]
  );

  useEffect(function () {
    async function getAllCurrencies() {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=200&from=${fromSelect}`
      );
      const data = await response.json();
      setAllCurrencies([...Object.keys(data.rates), fromSelect]);
    }
    getAllCurrencies();
  }, []);

  return (
    <Container>
      <h1 style={{ marginBottom: "20px", color: "#343a40" }}>
        Currency Converter
      </h1>
      <input type="text" value={currencyValue} onChange={(e) => fetchData(e)} />
      <div className="select-group">
        <label htmlFor="from">from</label>
        <select
          id="from"
          value={fromSelect}
          onChange={(e) => setFromSelect(e.target.value)}
        >
          <OptionsCurrencies allCurrencies={allCurrencies} />
        </select>
        <label htmlFor="to">to</label>
        <select
          id="to"
          value={toSelect}
          onChange={(e) => setToSelect(e.target.value)}
        >
          <OptionsCurrencies allCurrencies={allCurrencies} />
        </select>
      </div>

      <h2>
        {isLoaded
          ? `${currencyValue} ${fromSelect} = ${result} ${toSelect}`
          : "Loading..."}
      </h2>
    </Container>
  );
}

function Container({ children }) {
  return <div className="container">{children}</div>;
}

function OptionsCurrencies({ allCurrencies }) {
  return (
    <>
      {allCurrencies.map((currnecy) => (
        <option value={currnecy} key={currnecy}>
          {currnecy}
        </option>
      ))}
    </>
  );
}
