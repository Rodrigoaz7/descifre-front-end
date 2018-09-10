import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const removerRodada = async (data) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.delete(`${variables.urlApi}/administrador/rodadas`, {data: {id: data, token: token}});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { removerRodada };