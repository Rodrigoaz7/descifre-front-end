import variables from '../../../variables';
import axios from 'axios';

const alterarSenha = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/publico/alterar-senha`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { alterarSenha };