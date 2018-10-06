import variables from '../../../variables';
import axios from 'axios';

const processarSaque = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/usuario/transacoes/saque`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { processarSaque };