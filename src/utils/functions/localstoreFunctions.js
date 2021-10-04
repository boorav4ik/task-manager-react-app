export function checkAuthUsername() {
    const authData = localStorage.getItem("authData");
    if (!authData) return false;
    const { username } = JSON.parse(authData);
    return username;
}

export function saveAuthData(username, token) {
    const authData = JSON.stringify({ username, token });
    localStorage.setItem("authData", authData);
}

export function getToken() {
    const authData = localStorage.getItem("authData");
    const { token } = authData ? JSON.parse(authData) : "";
    return token;
}
