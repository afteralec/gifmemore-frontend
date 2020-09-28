import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchGifs } from "./services/api";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import StoreFront from "./components/StoreFront";
import Checkout from "./components/Checkout";

export default function App() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetchGifs().then(setGifs);
  }, []);

  function addGifToCart(id) {
    setGifs(gifs.map((gif) => (gif.id === id ? { ...gif, cart: true } : gif)));
  }

  function remGifFromCart(id) {
    setGifs(gifs.map((gif) => (gif.id === id ? { ...gif, cart: false } : gif)));
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Cart
            gifs={gifs.filter((gif) => gif.cart)}
            handleClick={remGifFromCart}
          />
          <StoreFront gifs={gifs} handleClick={addGifToCart} />
        </Route>
        <Route path="/checkout">
          <NavBar />
          <Cart
            gifs={gifs.filter((gif) => gif.cart)}
            handleClick={remGifFromCart}
          />
          <Checkout
            gifs={gifs.filter((gif) => gif.cart)}
            remGifFromCart={remGifFromCart}
          />
        </Route>
      </Switch>
    </Router>
  );
}
