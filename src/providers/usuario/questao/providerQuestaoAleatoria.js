import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const questaoAleatoria = async (data) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    data.token = token;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/usuario/questoes/jogo`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { questaoAleatoria };