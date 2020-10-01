import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchGifs } from "./services/api";
import { whoami, deleteUser, addToCart, removeFromCart } from "./services/api2";

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
    [cart, setCart] = useState([]);

  useEffect(() => {
    fetchGifs().then(setGifs);
    whoami().then((json) => {
      if (json.user) {
        setUser(json.user);
        setCart(json.user.items);
      } else {
        setCart(() => {
          const cart = localStorage.getItem("cart");
          if (cart) {
            return JSON.parse(cart).content;
          } else {
            return [];
          }
        });
      }
    });
  }, []);

  function addGifToCart(id) {
    const gif = gifs.find((gif) => gif.id === id);
    const newCart = [...cart, gif];
    setCart(newCart);

    if (user) {
      addToCart(id).then((json) => setCart(json.items));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({ content: cartGifs(gifs, newCart) })
      );
    }
  }

  function remGifFromCart(id) {
    const newCart = cart.filter((gif) => gif.id !== id);
    setCart(newCart);

    if (user) {
      removeFromCart(id).then((json) => setCart(json.items));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({ content: cartGifs(gifs, newCart) })
      );
    }
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    setCart([]);
  }

  function handleLogout() {
    if (window.confirm("Would you like to log out?")) {
      localStorage.removeItem("token");

      setUser(false);
      setCart(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
          return JSON.parse(cart).content;
        } else {
          return [];
        }
      });
    }
  }

  function handleDelete() {
    if (window.confirm("Would you like to delete your profile?")) {
      deleteUser(user);

      localStorage.removeItem("token");

      setUser(false);
      setCart(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
          return JSON.parse(cart).content;
        } else {
          return [];
        }
      });
    }
  }

  return (
    <Router>
      <NavBar user={user} handleClick={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Cart
            gifs={cartGifs(gifs, cart)}
            handleClick={remGifFromCart}
            linkTo="/checkout"
            buttonText="Proceed to Checkout"
          />
          <StoreFront gifs={gifs} handleClick={addGifToCart} />
        </Route>

        <Route path="/checkout">
          <Checkout
            gifs={cartGifs(gifs, cart)}
            remGifFromCart={remGifFromCart}
            setOrderConf={setOrderConf}
            emptyCart={emptyCart}
          />
        </Route>

        <Route path="/thank-you">
          <OrderConfirmation confirmation={orderConf} />
        </Route>

        <Route path="/signup">
          <Signup setUser={setUser} setCart={setCart} />
        </Route>

        <Route path="/login">
          <Login setUser={setUser} setCart={setCart} />
        </Route>

        <Route path="/profile">
          {user && (
            <Profile {...user} setUser={setUser} handleDelete={handleDelete} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

function cartGifs(gifs, cart) {
  const cartIds = cart.map((gif) => gif.id);
  return gifs.filter((gif) => cartIds.includes(gif.id));
}
