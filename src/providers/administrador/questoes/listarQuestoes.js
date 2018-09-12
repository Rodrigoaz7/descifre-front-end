import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const getQuestoes = async (categoria) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{

        dataResponse = await axios.get(`${variables.urlApi}/administrador/questoes/${token}?categoria=`+categoria);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getQuestoes };