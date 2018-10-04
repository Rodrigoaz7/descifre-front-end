import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const obterCodigoCheckout = async (data) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    data.token = token;
    try{
        dataResponse = await axios.post(`${variables.urlApi}/pagseguro/obter-codigo-checkout`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { obterCodigoCheckout };