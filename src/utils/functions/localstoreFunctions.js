const ITEM_NAME = "test-task-backend-session";

export function setSessionData(username, token) {
    localStorage.setItem(ITEM_NAME, JSON.stringify({ username, token }));
}

export function getSessionUsername() {
    const authData = localStorage.getItem(ITEM_NAME);
    return authData ? JSON.parse(authData)["username"] : null;
}

export function getSessionToken() {
    const authData = localStorage.getItem(ITEM_NAME);
    return authData ? JSON.parse(authData)["token"] : null;
}

export function clearSessionData() {
    localStorage.removeItem(ITEM_NAME);
}
