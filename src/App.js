// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import "./style.css";

export default function App() {
  return (
    <Container>
      <input type="text" />
      <div className="select-group">
        <label htmlFor="from">from</label>
        <select id="from">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <label htmlFor="to">to</label>
        <select id="to">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <h2>OUTPUT</h2>
    </Container>
  );
}

function Container({ children }) {
  return <div className="container">{children}</div>;
}
