function getCookie(name){
    return localStorage.getItem(name)
}
function setCookie(name,val){
    return localStorage.setItem(name,val)
}
function clearCookie(name){
    return localStorage.removeItem(name)
}
function clearAllCookie(name){
    return localStorage.clear();
}
function getSession(name){
    return sessionStorage.getItem(name)
}
function setSession(name,val){
    return sessionStorage.setItem(name,val)
}
function clearSession(name){
    return sessionStorage.removeItem(name)
}
function clearAllSession(){
    return sessionStorage.clear();
}

export {
    getCookie,
    setCookie,
    clearCookie,
    clearAllCookie,
    getSession,
    setSession,
    clearSession,
    clearAllSession
}