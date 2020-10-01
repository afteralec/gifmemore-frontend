import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
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
  [redirect, setRedirect] = useState(false);

  const history = useHistory();

//Commented out useEffect and whoami (in api2) allow for user's cart to show but user does not 'show' to be logged
//commented in ^, does not show user's cart but user shows as logged in

  useEffect(() => {
    fetchGifs().then(gifs => {
      setGifs(gifs)
      whoami().then(json => {
        if(json.user) {
          setUser(json.user)
          setGifs(loadCartFromResource(json.user.items))
        } else {
          setGifs(loadCartFromLocalStorage(gifs))
        }
      })
    });
  }, []);

  // useEffect(() => {
  //   fetchGifs().then(gifs => {
  //     setGifs(gifs)
  //     whoami(gifs).then(arr => {
  //       const [json, gifs] = arr
  //       if(json.user) {
  //         setUser(json.user)
  //         setGifs(loadCartFromResource(json.user.items))
  //       } else {
  //         setGifs(loadCartFromLocalStorage(gifs))
  //       }
  //     })
  //   });
  // }, []);

  function addGifToCart(id) {
    const newGifs = gifs.map((gif) =>
      gif.id === id ? { ...gif, cart: true } : gif
    );
    setGifs(newGifs);
    if(user){ 
      addToCart(id).then(json => setGifs(loadCartFromResource(json.items)))
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({ content: cartGifs(newGifs) })
      );
    }
  }

  function remGifFromCart(id) {
    const newGifs = gifs.map((gif) =>
      gif.id === id ? { ...gif, cart: false } : gif
    );
    setGifs(newGifs);
    if(user){
      removeFromCart(id).then(json => setGifs(loadCartFromResource(json.items)))
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({ content: cartGifs(newGifs) })
      );
    }
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    setGifs((gifs) => gifs.map((gif) => ({ ...gif, cart: false })));
  }

  function loadCartFromLocalStorage(gifs) {
    const cart = localStorage.getItem("cart") || false;
    if(cart){
      return loadCartFromResource(JSON.parse(cart).content)
    } else {
      return gifs
    }
  }

  function loadCartFromResource(cart) {
    // debugger
    const cartIds = cart.map((gif) => gif.id);
    // const newCart = gifs.filter(gif => cartIds.includes(gif.id))
    const newGifs = gifs.filter((gif) => !cartIds.includes(gif.id));
    return [...newGifs, ...cart.map(gif => ({...gif, cart: true}))];
  }

  function handleLogout() {
    if(window.confirm('Would you like to log out?')
    ){
      localStorage.removeItem('token')
      //localStorage.clear()
      setUser(false)
    }
  }
  //cart stays on page after log out cuz saved to localStorage

  function handleDelete() {
    if(window.confirm('Would you like to delete your profile?')
    ){
      localStorage.removeItem('token')
      setUser(false)
      deleteUser(user)
      // history.push('/')
      // .then(resp => {
      //   resp && setRedirect(true)
      // })
    }
  }

  function handleRedirect() {
    history.push('/')
  }

  return (
    <Router>
      <NavBar user={user} handleClick={handleLogout} />
      {redirect && handleRedirect()}
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
          {user && <Profile {...user} handleDelete={handleDelete}/>}
        </Route>
      </Switch>
    </Router>
  );
}

function cartGifs(gifs) {
  return gifs.filter((gif) => gif.cart);
}
