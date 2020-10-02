import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signup } from "../services/api2";

export default function Signup({ setUser, setCart }) {
  const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    }),
    [pwConfirmation, setPwConfirmation] = useState(""),
    history = useHistory(),
    [error, setError] = useState(false);

  function handleChange(e) {
    let obj = { [e.target.name]: e.target.value };
    setForm((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== pwConfirmation) {
      setError(true);
    } else {
      signup({ user: { ...form } }).then((json) => {
        localStorage.setItem("token", json.jwt);
        setUser(json.user);
        setCart([]);
        history.push("/profile");
      });
    }
  }

  return (
    <div>
      <form className="flex flex-col flex-center flow" onSubmit={handleSubmit}>
        <div className="flex flex-center flex-col flow-s-left">
          <label>Name</label>
          <input
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

        <div className="flex flex-center flex-col flow-s-left">
          <label>Password Confirmation</label>
          <input
            type="password"
            placeholder="Re-enter Your Password"
            value={pwConfirmation}
            name="password_confirmation"
            onChange={(e) => {
              setError(false);
              setPwConfirmation(e.target.value);
            }}
          />
        </div>

        <input type="submit" value="Sign Me Up!" />
      </form>

      {error && (
        <div className="flex flex-col flex-center">
          <br />
          <p className="error">Passwords do not match.</p>
        </div>
      )}
    </div>
  );
}
