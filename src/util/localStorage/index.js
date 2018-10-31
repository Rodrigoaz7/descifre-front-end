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

const getIdUser = () => {
    if(localStorage.getItem('descifre_userData')!==null){
        let usuario = JSON.parse(localStorage.getItem('descifre_userData'));
        return usuario._id;
    }
}
const clearAll = () =>{
    clearUser();
    clearToken();
}

export default {getToken, getUser, clearUser, clearToken, clearAll, getIdUser};