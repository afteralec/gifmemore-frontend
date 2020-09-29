import React, {useState} from 'react'

function OrderForm({total}) {

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: { line1: '', line2: '', city: '', state: '', zip: '' },
        amount: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        let obj = {[e.target.name]: e.target.value}
         setForm(prevState => ({ ...prevState, ...obj }))
        // setForm({...form, address: {...form.address}, [e.target.name]: e.target.value })
        
    }

    const handleChangeAddress = (e) => {
        let obj = {[e.target.name]: e.target.value}
        setForm(prevState => ({ ...prevState, address: { ...prevState.address, ...obj } }))
        
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
                    Address
                </label>
                <label>
                    Line1
                <input type='text' placeholder='Line1' value={form.address.line1} name='line1' onChange={handleChangeAddress} />
                </label>
                <label>
                    Line2
                <input type='text' placeholder='Line2' value={form.address.line2} name='line2' onChange={handleChangeAddress} />
                </label>
                <label>
                    City
                <input type='text' placeholder='City' value={form.address.city} name='city' onChange={handleChangeAddress} />
                </label>
                <label>
                    State
                <input type='text' placeholder='State' value={form.address.state} name='state' onChange={handleChangeAddress} />
                </label>
                <label>
                    Zip Code
                <input type='text' placeholder='Zip Code' value={form.address.zip} name='zip' onChange={handleChangeAddress} />
                </label>

            </form>
        </div >
    )
}

export default OrderForm
