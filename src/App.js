import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup'
import StoreFront from './components/StoreFront'
import Cart from './components/Cart'
import Login from './components/Login'
import NavBar from './components/NavBar'
import { Route } from "react-router-dom";


function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  

  // HOC ??? OR do AUTH here so ppl can still browse and purchase? 
  return (
    <div className="App">
      <Route path='/' render={props => <NavBar {...props} isLoggedIn={isLoggedIn} /> } />
      <Route path='/signup' render={props => <Signup {...props} isLoggedIn={isLoggedIn} /> } />
      <Route path='/store' render={props => <StoreFront {...props} isLoggedIn={isLoggedIn} /> }/>
      <Route path='/cart' render={props => <Cart {...props} isLoggedIn={isLoggedIn} /> } />
      <Route path='/login' render={props => <Login {...props} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> } />
    </div>
  );
}

export default App;
