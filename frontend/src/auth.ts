interface Auth {
    token: string,
    expiresOn: Date,
    username: string
}

const ITEM_NAME = "auth"
const EXPIRATION_TIME = 604800 //one week

export function getAuth(): Auth | null {
    const authJson = localStorage.getItem(ITEM_NAME)
    if(!authJson) {
        return null
    }
    const parsed: Auth = JSON.parse(authJson);
    if(new Date() > parsed.expiresOn) {
        deleteAuth()
        return null
    }
    return parsed
}

export function getAuthUsername(): string | null {
    const auth = getAuth()
    return auth ? auth.username : null
}

export function getAuthToken(): string | null {
    const auth = getAuth()
    return auth ? auth.token : null
}

export function getAuthHeader(): string | null {
    const token = getAuthToken()
    return token ? `Bearer ${token}` : null
}

export function setAuth(token: string, username: string) {
    const expiresOn = new Date()
    expiresOn.setTime(expiresOn.getTime() + EXPIRATION_TIME)
    const jwt: Auth = {
        token: token,
        username: username,
        expiresOn: expiresOn
    }
    localStorage.setItem(ITEM_NAME, JSON.stringify(jwt))
}

export function deleteAuth() {
    localStorage.removeItem(ITEM_NAME)
}