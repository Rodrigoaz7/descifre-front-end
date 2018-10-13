import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const listarRodadas = async (titulo, situacao, data_abertura, data_fechamento) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    try{
        dataResponse = await axios.get(`${variables.urlApi}/usuario/rodadas/abertas/${token}`);
    }catch(error){
        if(error.response.status===500){
            dataResponse = {
                data:{
                    rodadas: []
                }
            };
        }else{
            dataResponse = {
                data:{
                    rodadas: []
                }
            };
        }
        
    }
    
    return dataResponse;
}

export default { listarRodadas };