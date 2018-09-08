/*
* Autor: Marcus Dantas
*/


const getToken = () =>{
    if(localStorage.getItem('descifre_tokenUsuario')!==null) return JSON.parse(localStorage.getItem('descifre_tokenUsuario'));
}

const getUser = () =>{
    if(localStorage.getItem('descifre_userData')!==null) return JSON.parse(localStorage.getItem('descifre_userData'));
}

const clearUser = () =>{
    localStorage.removeItem('descifre_userData');
}

const clearToken = () =>{
    localStorage.removeItem('descifre_tokenUsuario');
}

const clearAll = () =>{
    clearUser();
    clearToken();
}

export default {getToken, getUser, clearUser, clearToken, clearAll};