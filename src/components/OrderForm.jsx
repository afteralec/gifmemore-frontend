import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postOrder } from "../services/api2";

function OrderForm({ total, itemIds, setOrderConf, emptyCart }) {
  const history = useHistory();
  const defaultForm = {
    name: "",
    email: "",
    address: { line1: "", line2: "", city: "", state: "", zip: "" },
  };
  const [form, setForm] = useState(defaultForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    postOrder({ order: { ...form, amount: total, item_ids: itemIds } }).then(
      (res) => {
        setOrderConf(res);
        emptyCart();
      }
    );
    history.push("/thank-you");
    setForm(defaultForm);
  };

  const handleChange = (e) => {
    let obj = { [e.target.name]: e.target.value };
    setForm((prevState) => ({ ...prevState, ...obj }));
  };

  const handleChangeAddress = (e) => {
    let obj = { [e.target.name]: e.target.value };
    setForm((prevState) => ({
      ...prevState,
      address: { ...prevState.address, ...obj },
    }));
  };

  return (
    <div>
      <form className="flex flex-col flex-center flow" onSubmit={handleSubmit}>
        <div className="flex flex-center flex-col flow-s-left">
          <label>Name</label>
          <input
            require
            type="text"
            placeholder="Enter Your Name"
            value={form.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>Email</label>
          <input
            require
            type="email"
            placeholder="Enter Your Email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address</label>
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>Line1</label>
          <input
            require
            type="text"
            placeholder="Line1"
            value={form.address.line1}
            name="line1"
            onChange={handleChangeAddress}
          />
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>Line2</label>
          <input
            require
            type="text"
            placeholder="Line2"
            value={form.address.line2}
            name="line2"
            onChange={handleChangeAddress}
          />
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>City</label>
          <input
            require
            type="text"
            placeholder="City"
            value={form.address.city}
            name="city"
            onChange={handleChangeAddress}
          />
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>State</label>
          <input
            require
            type="text"
            placeholder="State"
            value={form.address.state}
            name="state"
            onChange={handleChangeAddress}
          />
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>Zip</label>
          <input
            require
            type="text"
            placeholder="Zip Code"
            value={form.address.zip}
            name="zip"
            onChange={handleChangeAddress}
          />
        </div>
        <input type="submit" value="Submit Order" />
      </form>
    </div>
  );
}

export default OrderForm;
