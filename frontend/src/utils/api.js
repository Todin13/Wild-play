// src/utils/api.js
import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5019/api",
  baseURL: "https://wild-play-api.vercel.app/api",
  withCredentials: true,
});

export default API;
