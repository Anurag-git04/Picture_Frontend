import axios from "axios";

const api = axios.create({
    baseURL: "https://picture-backend.vercel.app/auth/",
})

export const googleAuth = (code:string) => api.get(`/google?code=${code}`)