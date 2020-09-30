import React from 'react'
import { signup } from '../services/api2'

function Signup(props) {

    const [form, setForm] = React.useState({
        name: '',
        email: '', 
        password: '', 
        password_confirmation: '',
    })

    function handleChange(e) {
        let obj = {[e.target.name]: e.target.value}
        setForm(prev => ({...prev, ...obj}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        signup({user: {...form}})

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                <input type='text' placeholder='Enter Your Name' value={form.name} name='name' onChange={handleChange} />
                </label>
                <label>
                    Email
                <input type='email' placeholder='Enter Your Email' value={form.email} name='email' onChange={handleChange} />
                </label>
                <label>
                    Password
                <input type='password' placeholder='Enter Your Password' value={form.password} name='password' onChange={handleChange} />
                </label>
                <label>
                    Password Confirmation
                <input type='password' placeholder='Re-enter Your Password' value={form.password_confirmation} name='password_confirmation' onChange={handleChange} />
                </label>
                <button >Submit</button>
            </form>
        </div>
    )
}

export default Signup