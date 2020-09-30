import React, { useState } from "react";
import { login } from "../services/api2";
import { useHistory } from "react-router-dom";

export default function Login({setUser}) {
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
      localStorage.setItem('token', json.jwt)
      setUser(json.user)
      history.push("/profile");
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter Your Email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Enter Your Password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
