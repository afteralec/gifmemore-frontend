import React, { useState, useEffect} from "react";
import Cart from "./Cart";
import OrderSummary from "./OrderSummary";
import OrderForm from "./OrderForm"
import {fetchCartTotal} from "../services/api2"

export default function Checkout({ gifs, remGifFromCart }) {

  const [total, setTotal] = useState('Calculating...')

  useEffect(()=>{
    gifs.length > 0 && getTotalCost()
  }, [gifs])

  function getTotalCost(){
    const ids = gifs.map(gif => gif.id)
    const obj = {item_ids: ids}
    fetchCartTotal(obj).then(setTotal)
    
    // fetchCartTotal(ids).then(setTotal)
  }


  
  return (
    <>
      <Cart id="checkoutCart" gifs={gifs} handleClick={remGifFromCart} linkTo='/'
        buttonText='Return To Gifs' />
      <OrderSummary gifs={gifs} total={total}/>
      <OrderForm total={total} />
    </>
  );
}
