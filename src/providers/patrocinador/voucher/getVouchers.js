import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';
const obterVouchers = async () => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/patrocinador/voucher/${token}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { obterVouchers };