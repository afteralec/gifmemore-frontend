import React, { useState, useEffect} from "react";
import Cart from "./Cart";
import OrderSummary from "./OrderSummary";
import OrderForm from "./OrderForm"
import {fetchCartTotal} from "../services/api2"

export default function Checkout({ gifs, remGifFromCart, setOrderConf, emptyCart }) {

  const [total, setTotal] = useState('Calculating...')

  useEffect(()=>{
    // gifs.length > 0 && 
    getTotalCost()
  }, [])

  function getTotalCost(){
    const ids = itemIds()
    // const obj = {item_ids: ids}
    fetchCartTotal({item_ids: ids}).then(setTotal)
  }

  function itemIds(){
    return gifs.map(gif => gif.id)
  }

  
  return (
    <>
      <Cart id="checkoutCart" gifs={gifs} handleClick={remGifFromCart} linkTo='/'
        buttonText='Return To Gifs' />
      <OrderSummary gifs={gifs} total={total}/>
      <OrderForm total={total} itemIds={itemIds()} setOrderConf={setOrderConf} emptyCart={emptyCart}/>
    </>
  );
}
