import  axios  from 'axios';


const API_URL = "https://foodieland-server-3z3p.vercel.app/"; // আপনার backend URL

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // cookie support
});