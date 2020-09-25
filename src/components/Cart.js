import React, {useState, useEffect} from 'react'

const Cart = () => {

    const [cart, setCart] = React.useState(['giphy1', 'giphy2', 'giphy3', 'giphy4'])

    const renderCart = () => {
        return cart.map(item => <h5> {item} </h5>)
    }
    

    return (
        <div>
            {renderCart()}
        </div>
    )
}

export default Cart