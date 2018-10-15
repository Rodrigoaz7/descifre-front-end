import variables from '../../../variables';
import axios from 'axios';

const recuperarSenha = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/publico/recuperar-senha`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { recuperarSenha };