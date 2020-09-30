import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { fetchGifs } from "./services/api";
import { whoami } from "./services/api2";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import StoreFront from "./components/StoreFront";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";

export default function App() {
  const [gifs, setGifs] = useState([]),
  [orderConf, setOrderConf] = useState(false),
  [user, setUser] = useState(false),
  history = useHistory();


  useEffect(() => {
    fetchGifs().then(loadCartFromLocalStorage);

    whoami().then(json => {
      if(json.user) setUser(json.user)
    })
  }, []);

  function addGifToCart(id) {
    const newGifs = gifs.map((gif) =>
      gif.id === id ? { ...gif, cart: true } : gif
    );
    setGifs(newGifs);
    localStorage.setItem(
      "cart",
      JSON.stringify({ content: cartGifs(newGifs) })
    );
  }

  function remGifFromCart(id) {
    const newGifs = gifs.map((gif) =>
      gif.id === id ? { ...gif, cart: false } : gif
    );
    setGifs(newGifs);
    localStorage.setItem(
      "cart",
      JSON.stringify({ content: cartGifs(newGifs) })
    );
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    setGifs((gifs) => gifs.map((gif) => ({ ...gif, cart: false })));
  }

  function loadCartFromLocalStorage(gifs) {
    const cart = localStorage.getItem("cart") || false;

    if (cart) {
      const cartObjs = JSON.parse(cart).content;
      const cartIds = cartObjs.map((gif) => gif.id);
      const newGifs = gifs.filter((gif) => !cartIds.includes(gif.id));
      setGifs([...newGifs, ...cartObjs]);
    } else {
      setGifs(gifs);
    }
  }

  function handleLogout(){
    localStorage.removeItem('token')
    setUser(false)
  }

  return (
    <Router>
      <NavBar user={user} handleClick={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Cart
            gifs={cartGifs(gifs)}
            handleClick={remGifFromCart}
            linkTo="/checkout"
            buttonText="Proceed to Checkout"
          />
          <StoreFront gifs={gifs} handleClick={addGifToCart} />
        </Route>

        <Route path="/checkout">
          <Checkout
            gifs={cartGifs(gifs)}
            remGifFromCart={remGifFromCart}
            setOrderConf={setOrderConf}
            emptyCart={emptyCart}
          />
        </Route>

        <Route path="/thank-you">
          <OrderConfirmation confirmation={orderConf} />
        </Route>

        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>

        <Route path="/login">
          <Login setUser={setUser} />
        </Route>

        <Route path="/profile">
          {user && <Profile {...user}/>}
        </Route>
      </Switch>
    </Router>
  );
}

function cartGifs(gifs) {
  return gifs.filter((gif) => gif.cart);
}
