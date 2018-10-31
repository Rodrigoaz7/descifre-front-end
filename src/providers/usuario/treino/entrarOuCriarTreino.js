import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';
const processar = async () => {
    let dataResponse;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/usuario/treino`, {idUsuario:utilLocalStorage.getIdUser(), token: utilLocalStorage.getToken()});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { processar };