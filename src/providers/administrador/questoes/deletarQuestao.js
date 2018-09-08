import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const DeleteQuestoes = async (id) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.delete(`${variables.urlApi}/administrador/questoes`, {data: {id: id, token: token}});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { DeleteQuestoes };