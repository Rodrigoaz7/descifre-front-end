import variables from '../../../variables';
import axios from 'axios';

const realizarCadastro = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/publico/cadastro-indicacao`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { realizarCadastro };