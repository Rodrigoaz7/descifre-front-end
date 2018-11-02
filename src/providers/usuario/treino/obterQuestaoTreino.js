import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';
const getQuestao = async (idTreino) => {
    let dataResponse;
    try{
        dataResponse = await axios.get(`${variables.urlApi}/usuario/treino/questao/${idTreino}/${utilLocalStorage.getUser()._id}/${utilLocalStorage.getToken()}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getQuestao };