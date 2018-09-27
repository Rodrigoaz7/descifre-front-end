import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const capturarImagem = async (tipo, id) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/imagem/${token}?tipo=`+tipo+'&id='+id);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { capturarImagem };