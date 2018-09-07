import variables from '../../../variables';
import axios from 'axios';

const DeleteQuestoes = async (id) => {
    let dataResponse;
    console.log(id);
    try{
        dataResponse = await axios.delete(`${variables.urlApi}/administrador/questoes/deletar`, {data: {id: id}});
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { DeleteQuestoes };