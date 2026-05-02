import api from './api.axios'

export const register = async(data) => {
    const res = await api.post("/api/auth/register", data);
    return res.data;
}

export const login = async(data) => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
}

export const logoutUser = async() => {
    const res = await api.post("/api/auth/logout");
    return res.data;
}