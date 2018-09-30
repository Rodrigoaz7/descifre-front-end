import variables from '../../../variables';
import axios from 'axios';
import utilLocalStorage from '../../../util/localStorage';

const capturarImagem = async (tipo, id) => {
    let dataResponse;
    let token = utilLocalStorage.getToken();
    let url = `${variables.urlApi}/imagem/${token}?tipo=`+tipo+'&id='+id;
    return url;
}

export default { capturarImagem };