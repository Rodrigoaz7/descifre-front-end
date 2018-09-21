import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const getTransacoes = async (limite, tipo, data, user) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/administrador/transacoes/${token}/${limite}?tipo=`+tipo+'&data='+data+'&user='+user);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { getTransacoes };