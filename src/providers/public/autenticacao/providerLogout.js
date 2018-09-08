import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const sairSessao = async () => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.delete(`${variables.urlApi}/publico/logout`, {data:{token:token}});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { sairSessao };