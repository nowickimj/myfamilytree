import axios from "axios";

export function setToken(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function deleteDoken() {
    delete axios.defaults.headers.common["Authorization"];
}