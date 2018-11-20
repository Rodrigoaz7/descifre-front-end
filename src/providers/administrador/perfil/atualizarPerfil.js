import variables from '../../../variables';
import axios from 'axios';

const realizarAtualizacao = async (data) => {

    let dataResponse;
    let data_formatada = new FormData();
    data_formatada.append('idUsuario', data.idUsuario);
    data_formatada.append('idPessoa', data.idPessoa);
    data_formatada.append('nome', data.nome);
    data_formatada.append('email', data.email);
    data_formatada.append('banco', data.banco);
    data_formatada.append('conta', data.conta);
    data_formatada.append('agencia', data.agencia);
    data_formatada.append('sexo', data.sexo);
    data_formatada.append('telefone', data.telefone);
    data_formatada.append('permissoes', data.permissoes);
    data_formatada.append('senha', data.senha);
    data_formatada.append('repetirSenha', data.repetirSenha);
    data_formatada.append('dataEdicao', data.dataEdicao);
    data_formatada.append('foto', data.foto);
    data_formatada.append('token', data.token);

    try{
        dataResponse = await axios.put(`${variables.urlApi}/usuario/perfil`, data_formatada, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data_formatada._boundary}`,
            }
        });
    }catch(error){
        dataResponse = error.response.data;
    }
    
    return dataResponse;
}

export default { realizarAtualizacao };