export function getAuth(): string | null {
    return localStorage.getItem("jwtToken")
}

export function getAuthHeader(): string | null {
    const token = getAuth()
    return token ? `Bearer ${token}` : null
}


export function setAuth(token: string) {
    localStorage.setItem("jwtToken", token)
}

export function deleteAuth() {
    localStorage.removeItem("jwtToken")
}