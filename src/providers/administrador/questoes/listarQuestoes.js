import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';
const getQuestoes = async () => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/administrador/questoes/${token}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getQuestoes };