import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const listarPatrocinadores = async (nome) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/administrador/patrocinadores/${token}?nome=`+nome);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { listarPatrocinadores };