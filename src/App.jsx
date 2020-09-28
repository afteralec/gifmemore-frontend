import React, { useState, useEffect } from "react";
import "./css/App.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchGifs } from "./services/api";

import NavBar from "./components/NavBar";
import StoreFront from "./components/StoreFront";

export default function App() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetchGifs().then(setGifs);
  }, []);

  return (
    <>
      <NavBar />
      <StoreFront gifs={gifs} />
    </>
  );
}

{
  /* <Route path="/" render={(props) => <NavBar {...props} />} />
<Route path="/signup" render={(props) => <Signup {...props} />} />
<Route path="/store" render={<StoreFront gifs={gifs} />} />
<Route path="/cart" render={(props) => <Cart {...props} />} />
<Route path="/login" render={(props) => <Login {...props} />} /> */
}
