// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  // baseURL: "https://wild-play-api.vercel.app/api",
  withCredentials: true,
});


export default API;
