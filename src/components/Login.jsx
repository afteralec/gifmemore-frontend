import React, { useState } from "react";
import { login } from "../services/api2";
import { useHistory } from "react-router-dom";

export default function Login({ setUser, setCart }) {
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    let obj = { [e.target.name]: e.target.value };
    setForm((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ user: { ...form } }).then((json) => {
      if (json.error) {
        alert(json.error);
      } else {
        localStorage.setItem("token", json.jwt);
        setUser(json.user);
        setCart(json.user.items);
        history.push("/profile");
      }
    });
  }

  return (
    <div>
      <form className="flex flex-col flex-center flow" onSubmit={handleSubmit}>
        <div className="flex flex-center flex-col flow-s-left">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-center flex-col flow-s-left">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Let's Go!" />
      </form>
    </div>
  );
}
