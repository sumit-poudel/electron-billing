import { useState,useMemo } from "react";
import {ToWords} from "to-words"

const Table = () => {
  const [products, setProducts] = useState([
    {
        sn: "",
        name: "",
        price: "",
        quantity: "",
        discount: "",
    }
  ]);
  
  const toWords = new ToWords({
    localeCode: 'en-NP',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paisa',
          symbol: '',
        },
      },
    },
  });
  
  const total = useMemo(() => {
    return products.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const discount = Number(item.discount) || 0;
      const total = (price * quantity) - discount;
      return sum + total;
    }, 0);
  }, [products]);
  
  const vat= useMemo(() => {
      return total * 0.13;
    }, [total]);
  const handleInputChange = (index, field, value) => {
    setProducts((prevProducts) => {
      const updated = [...prevProducts];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const billData = products.map((product, index) => {

    if(index==products.length-1 && product.name !== ""){
            products.push({
                sn: products.length,
                name: "",
                hsn: "",
                batch: "",
                expiry: "",
                price: "",
                quantity: "",
                discount: "",
            });
            setProducts(products);         
    }
    if(index!==products.length-1 && product.name === ""){
        products.pop()
    }

    return (
      <tr key={index}>
        <td>
          {" "}
          <strong>{index}</strong>{" "}
        </td>
        <td>
          <input autoComplete="off"
            type="text" id="name"
            value={product.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}

          />
        </td>
        <td>
          <input autoComplete="off"
            type="number"
            value={product.hsn}
            onChange={(e) => handleInputChange(index, "hsn", e.target.value)}

          />
        </td>
        <td>
          <input autoComplete="off"
            type="text"
            value={product.batch}
            onChange={(e) => handleInputChange(index, "batch", e.target.value)}

          />
        </td>
        <td>
          <input autoComplete="off"
            type="text"
            value={product.expiry}
            onChange={(e) => handleInputChange(index, "expiry", e.target.value)}

          />
        </td>
        <td>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleInputChange(index, "price", e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              handleInputChange(index, "quantity", e.target.value)
            }
          />
        </td>
        <td>
          <input
            type="number"
            value={product.discount}
            onChange={(e) =>
              handleInputChange(index, "discount", e.target.value)
            }
          />
        </td>
        <td>
          <strong>{Number(product.quantity) * Number(product.price)-Number(product.discount)}</strong>
        </td>
      </tr>
    );
  });

  return (
    <>
    <table border="1">
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Name</th>
          <th>HSN NO</th>
          <th>Batch</th>
          <th>Expiry</th>
          <th>price</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th style={{padding:"0 10px"}} >Total</th>
        </tr>
      </thead>
      <tbody>{billData}
      <tr>
      <td colSpan="7" rowSpan="3" id="inWords" >
      <strong >IN Words:{toWords.convert((total+vat).toFixed(2),{currency:true})}</strong>
      </td>
      <td >Total</td>
        <td>{total}</td>
      </tr>
      <tr>
      <td >Vat</td>
        <td>{vat.toFixed(2)}</td>
      </tr>
      <tr>
      <td >Grand total</td>
        <td>{(total+vat).toFixed(2)}</td>
      </tr>
      </tbody>
    </table>
    </>
  );
};

export default Table;
