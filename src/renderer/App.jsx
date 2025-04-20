import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Table from "./Table.jsx";
import './App.css';

function Hello() {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const generateBillNumber = () => {
    const now = new Date();
    const billNo = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(
      2,
      "0"
    )}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    return billNo;
  };

  return (
    <div>
     <button className="ui-btn" onClick={() => reactToPrintFn()}>
        <span>Print</span>
      </button>
      <div ref={contentRef}>
        <section>
          <nav>
            <div>
              <img
                src={logo}
                alt="logo"
                style={{ width: "4rem", height: "4rem" }}
              />
              <h1>Ankar Traders</h1>
            </div>
            <h4>
            Date:{date}
            </h4>
          </nav>
          <h2>Invoice</h2>
          <div className="bill-number">
            <h2>Bill No: {generateBillNumber()}</h2>
          </div>
          <div className="customer-details">
            <h2>
              Customer Name: <input type="text" placeholder="Customer-Name" />
            </h2>
            <h2>
              Customer Address:{" "}
              <input type="text" placeholder="Customer-Address" />
            </h2>
            <h2>
              Customer Phone: <input type="text" placeholder="Customer-Phone" />
            </h2>
          </div>
        </section>
        <Table />
        <section className="sign">
          <div className="bill-by">
            <div className="whom">
            <strong>Anish poudel</strong>
              <h2>Bill By:</h2>
            </div>

            <div className="whom">
            <input type="text" placeholder="Name" />
              <h2>Received By:</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
