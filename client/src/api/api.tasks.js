import api from './api.axios'

export const createTask = async(data) => {
    const res = await api.post("/api/task", data);
    return res.data;
}

export const getTasks = async(search = "") => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const res = await api.get(`/api/task${query}`);
    return res.data;
}

export const updateTask = async(id, data) => {
    const res = await api.put(`/api/task/${id}`, data);
    return res.data;
}

export const deleteTask = async(id) => {
    const res = await api.delete(`/api/task/${id}`);
    return res.data;
}

export const completeTask = async(id) => {
    const res = await api.patch(`/api/task/${id}/complete`);
    return res.data;
}