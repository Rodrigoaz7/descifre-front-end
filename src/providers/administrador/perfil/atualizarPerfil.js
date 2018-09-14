import variables from '../../../variables';
import axios from 'axios';

const realizarAtualizacao = async (data) => {

    let dataResponse;
    try{
        dataResponse = await axios.put(`${variables.urlApi}/administrador/perfil`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { realizarAtualizacao };