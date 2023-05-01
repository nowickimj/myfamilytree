interface JwtToken {
    token: string,
    expiresOn: Date
}

const itemName = "jwt"

export function getAuth(): string | null {
    const tokenJson = localStorage.getItem(itemName)
    if(!tokenJson) {
        return null
    }
    const parsedToken: JwtToken = JSON.parse(tokenJson);
    if(new Date() > parsedToken.expiresOn) {
        deleteAuth()
        return null;
    }
    return parsedToken.token;
}

export function getAuthHeader(): string | null {
    const token = getAuth()
    return token ? `Bearer ${token}` : null
}

export function setAuth(token: string) {
    const expiresOn = new Date()
    expiresOn.setTime(expiresOn.getTime() + 60 * 60 * 1000)
    const jwt: JwtToken = {
        token: token,
        expiresOn: expiresOn
    }
    localStorage.setItem(itemName, JSON.stringify(jwt))
}

export function deleteAuth() {
    localStorage.removeItem(itemName)
}