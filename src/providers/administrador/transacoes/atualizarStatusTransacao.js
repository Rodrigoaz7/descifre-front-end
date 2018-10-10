import variables from '../../../variables';
import axios from 'axios';

const atualizarStatusTransacao = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.put(`${variables.urlApi}/administrador/transacoes`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { atualizarStatusTransacao };