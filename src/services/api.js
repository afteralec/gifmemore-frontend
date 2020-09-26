export async function fetchGifs() {
  const API = "http://localhost:5500/api/v1";
  const resp = await fetch(`${API}/items`);
  return await resp.json();
}
