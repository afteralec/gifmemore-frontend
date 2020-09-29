import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchGifs } from "./services/api";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import StoreFront from "./components/StoreFront";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation"

export default function App() {
  const [gifs, setGifs] = useState([]);
  const [orderConf, setOrderConf] = useState(false)
  // const [cart, setCart] = useState(loadCartFromLocalStorage || []);


  useEffect(() => {
    fetchGifs().then(loadCartFromLocalStorage);
  }, []);

  function addGifToCart(id) {
    const newGifs = gifs.map((gif) => (gif.id === id ? { ...gif, cart: true } : gif))
    setGifs(newGifs);
    localStorage.setItem('cart', JSON.stringify({ content: cartGifs(newGifs) }))
  }

  function remGifFromCart(id) {
    const newGifs = gifs.map((gif) => (gif.id === id ? { ...gif, cart: false } : gif))
    setGifs(newGifs);
    localStorage.setItem('cart', JSON.stringify({ content: cartGifs(newGifs) }))
  }

  function emptyCart(){
    localStorage.removeItem('cart')
    setGifs(gifs=> gifs.map(gif => ({...gif, cart: false})))
  }

  function loadCartFromLocalStorage(gifs) {
    // console.log(gifs)
    const cart = localStorage.getItem('cart') || false
    // console.log(cart)
    if (cart) {
      const cartObjs = JSON.parse(cart).content
      const cartIds = cartObjs.map(gif => gif.id)
      const newGifs = gifs.filter(gif => !cartIds.includes(gif.id))
      setGifs([...newGifs, ...cartObjs])
    }
    else {
      setGifs(gifs)
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Cart
            gifs={cartGifs(gifs)}
            handleClick={remGifFromCart}
            linkTo='/checkout'
            buttonText='Proceed to Checkout'
          />
          <StoreFront gifs={gifs} handleClick={addGifToCart} />
        </Route>
        <Route path="/checkout">
          <NavBar />
          <Checkout
            gifs={cartGifs(gifs)}
            remGifFromCart={remGifFromCart}
            setOrderConf={setOrderConf}
            emptyCart={emptyCart}
          />
        </Route>
        <Route path="/thank-you">
          <NavBar />
          <OrderConfirmation
            confirmation={orderConf}
          />
        </Route>
      </Switch>
    </Router>
  );
}

function cartGifs(gifs) {
  return gifs.filter((gif) => gif.cart)
}
