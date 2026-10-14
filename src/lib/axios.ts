import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

export default api;
