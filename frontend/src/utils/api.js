// src/utils/api.js
import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5019/api",
  baseURL: "https://wild-play-api-git-bookingsfix-todin13s-projects.vercel.app/api",
  withCredentials: true,
});

export default API;
