import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const obterVoucher = async () => {
    let dataResponse;
    
    let token = utilLocalStorage.getToken();
    
    try{
        dataResponse = await axios.get(`${variables.urlApi}/usuario/voucher/${utilLocalStorage.getIdUser()}/${token}`);
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { obterVoucher };