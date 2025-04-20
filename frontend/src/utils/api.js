// src/utils/api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "/api",
  baseURL:
    "https://wild-play-api-git-search-guides-page-todin13s-projects.vercel.app/api",
  withCredentials: true,
});

export default API;
