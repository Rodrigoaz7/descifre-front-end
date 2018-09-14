import variables from '../../../variables';
import axios from 'axios';

const realizarUpdate = async (data) => {
    let dataResponse;
    try{
        dataResponse = await axios.put(`${variables.urlApi}/administrador/rodadas`, {...data});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { realizarUpdate };