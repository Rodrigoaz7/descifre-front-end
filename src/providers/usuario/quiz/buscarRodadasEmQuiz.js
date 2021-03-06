import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const obterQuizzes = async (id, pagina) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/usuario/quiz/buscar-rodadas/${id}/${token}/${pagina}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { obterQuizzes };