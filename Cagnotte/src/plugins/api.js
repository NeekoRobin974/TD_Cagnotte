const baseURL = 'https://donations.edu.netlor.fr'
//const moveWsURL = 'https://donations.edu.netlor.fr/websockets'

import axios from "axios";

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `key=${import.meta.env.VITE_API_KEY}`
  }
})

//export { moveWsURL }
export default instance
