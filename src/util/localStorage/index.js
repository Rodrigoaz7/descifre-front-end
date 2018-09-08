/*
* Autor: Marcus Dantas
*/


const getToken = () =>{
    if(localStorage.getItem('descifre_tokenUsuario')!==null) return JSON.parse(localStorage.getItem('descifre_tokenUsuario'));
}

const getUser = () =>{
    if(localStorage.getItem('descifre_userData')!==null) return JSON.parse(localStorage.getItem('descifre_userData'));
}

export default {getToken, getUser};