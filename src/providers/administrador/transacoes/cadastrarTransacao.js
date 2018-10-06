import variables from '../../../variables';
import axios from 'axios';

const criarTransacoes = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/administrador/transacoes`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { criarTransacoes };