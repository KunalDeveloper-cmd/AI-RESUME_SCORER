import axios from "axios";

// Point Axios at the backend API
// If you want to customize this, set VITE_API_BASE_URL in a .env file.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const instance = axios.create({
  baseURL,
});

export default instance;