const API = "http://localhost:5500/api/v1";
const userAPI = "http://localhost:5500/users";
// no Auth so no need for token at the moment
const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// ******* USER CALLS ********* => GET, POST, UPDATE, DELETE

export async function whoami() {
  const resp = await fetch("http://localhost:5500/whoami", {
    headers: headers(),
  });
  return await resp.json();
}

export async function login(userData) {
  // no Auth so just a GET request for now
  const resp = await fetch(`http://localhost:5500/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(userData),
  });
  return await resp.json();
}

export async function signup(userData) {
  // no Auth needs to be implemented on backend
  const resp = await fetch(`${userAPI}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(userData),
  });
  return await resp.json();
}

export async function updateUser(user) {
  const ENDPOINT = `http://localhost:5500/users/${user.id}`;

  const config = {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(user),
  };

  const resp = await fetch(ENDPOINT, config);
  return await resp.json();

  console.log(user, config);
}

export async function deleteUser(userData) {
  const resp = await fetch(`${userAPI}/${userData.id}`, {
    method: "DELETE",
    headers: headers(),
  });
  // have backend send confirmation that user has been deleted
  return await resp.json();
  // resp && window.history.replaceState(null, null, '/')
}

// ******* GIF/ITEM CALLS ********* => GET index, GET show

export async function fetchGifs() {
  const resp = await fetch(`${API}/items`);
  return await resp.json();
}

export async function fetchOneGif(gifId) {
  const resp = await fetch(`${API}/items/${gifId}`);
  return await resp.json();
}

// ******* ORDER CALLS ********* => GET show, POST, GET user's purchase history ~> custom route,

export async function fetchOneOrder(orderId) {
  const resp = await fetch(`${API}/orders/${orderId}`);
  return await resp.json();
}

export async function postOrder(orderData) {
  // orderData should carry the front-end cart details to create records in join table on backend ~> see comments in ORDER CONTROLLER and ORDER MODEL
  const resp = await fetch(`${API}/orders`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(orderData),
  });
  return await resp.json();
}

export async function fetchUserOrderHistory(userId) {
  // went with custom route, can change later if we decide to
  const resp = await fetch(`${API}/orders/user_history/${userId}`);
  return await resp.json();
}

export async function fetchCartTotal(itemIds) {
  const resp = await fetch(`${API}/cart_total`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(itemIds),
  });
  return await resp.json();
}

// ******* CATEGORY CALLS ********* => GET index

export async function fetchCategories() {
  const resp = await fetch(`${API}/categories`);
  return await resp.json();
}

// ******* CART CALLS ********* => GET show, (POST on Join, DELETE on Join) => custom routes, controller action

export async function fetchCart(cartId) {
  const resp = await fetch(`${API}/cart/${cartId}`);
  return await resp.json();
}

export async function addToCart(itemId) {
  const resp = await fetch(`${API}/cart`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ cart: { item_id: itemId } }),
  });
  return await resp.json();
}

export async function removeFromCart(itemId) {
  const resp = await fetch(`${API}/cart`, {
    method: "DELETE",
    headers: headers(),
    body: JSON.stringify({ cart: { item_id: itemId } }),
  });
  return await resp.json();
}
