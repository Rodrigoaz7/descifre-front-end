import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';
const realizarAtivacao = async (data) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    let dataEnviar = {
        token: token,
        idVoucher: data.idVoucher
    }
    try{
        dataResponse = await axios.post(`${variables.urlApi}/patrocinador/voucher/`, dataEnviar);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { realizarAtivacao };