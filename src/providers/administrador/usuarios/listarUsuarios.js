import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const getUsuarios = async (limite) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/administrador/usuarios/${token}/${limite}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getUsuarios };