import React from 'react'

const Signup = (props) => {
    const [form, setForm] = React.useState({
        username: '',
        password: null, 
        dob: null, 
        email: null, 
        address: null, 
        password_confirmation: null,
    })

    return (
        <div>
            I am a signup page
        </div>
    )
}

export default Signup