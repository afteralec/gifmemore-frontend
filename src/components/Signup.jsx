import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signup } from "../services/api2";


export default function Signup({setUser}) {

  const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    }),
    [pwConfirmation, setPwConfirmation] = useState(""),
    history = useHistory(),
    [error, setError] = useState(false);


    const [form, setForm] = React.useState({
        name: '',
        email: '', 
        password: ''
    }),
    history = useHistory()

  function handleChange(e) {
    let obj = { [e.target.name]: e.target.value };
    setForm((prev) => ({ ...prev, ...obj }));
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if(form.password !== pwConfirmation) {
      setError(true)
    } else {
      signup({ user: { ...form } }).then((json) => {
          localStorage.setItem('token', json.jwt)
          setUser(json.user)
        history.push("/profile");
      })
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Enter Your Name"
            value={form.name}
            name="name"
            onChange={handleChange}
          />
        </label>
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
        <label>
          Password Confirmation
          <input
            type="password"
            placeholder="Re-enter Your Password"
            value={pwConfirmation}
            name="password_confirmation"
            onChange={(e) => {
              setError(false)
              setPwConfirmation(e.target.value)}
            }
          />
        </label>
        <button>Submit</button>
      </form>
      { error && 'Passwords do not match'}
    </div>
  );
}
