import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const getTransacoes = async () => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    let id = utilLocalStorage.getUser()._id;
    try{
        dataResponse = await axios.get(`${variables.urlApi}/usuario/transacoes/${token}/${id}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getTransacoes };