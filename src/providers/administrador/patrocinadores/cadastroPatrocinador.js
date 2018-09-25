import variables from '../../../variables';
import axios from 'axios';

const realizarCadastro = async (data) => {
    let dataResponse;
    console.log(data)
    let data_formatada = new FormData();
    data_formatada.append('nome', data.nome);
    data_formatada.append('email', data.email);
    data_formatada.append('telefone', data.telefone);
    data_formatada.append('tipo_patrocinador', data.tipo_patrocinador);
    data_formatada.append('rodadas_patrocinadas', data.rodadas_patrocinadas);
    data_formatada.append('quantia_paga', data.quantia_paga);
    data_formatada.append('logomarca', data.logomarca);
    data_formatada.append('token', data.token);
    try {
        dataResponse = await axios.post(`${variables.urlApi}/administrador/patrocinadores`, data_formatada, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data_formatada._boundary}`,
            }
        });
    } catch (error) {
        dataResponse = error.response.data;
    }

    return dataResponse;
}

export default { realizarCadastro };