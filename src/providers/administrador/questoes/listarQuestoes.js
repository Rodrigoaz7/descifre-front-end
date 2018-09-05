import variables from '../../../variables';
import axios from 'axios';

const getQuestoes = async () => {
    let dataResponse;
    try{
        dataResponse = await axios.get(`${variables.urlApi}/administrador/questoes`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getQuestoes };