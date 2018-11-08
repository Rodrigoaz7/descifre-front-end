import React from 'react';
import ReactDOM from 'react-dom';
import Public from './screens/public/index';
import Admin from './screens/administrador/index';
import Usuario from './screens/usuario/index';
import Patrocinador from './screens/patrocinador/index';
import { Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router/lib';
import registerServiceWorker from './registerServiceWorker';

const loggedPatrocinador = () => {
    if(localStorage.getItem('descifre_userData')!==null && localStorage.getItem('descifre_tokenUsuario')!==null){
        let data = JSON.parse(localStorage.getItem('descifre_userData'));
        let admin = false;
        data.permissoes.map((permissao, index) =>{
            if(permissao==="Patrocinador") admin = true;
            return null;
        });
        if(admin) return true;
        return false;
    }
    return false;
}

const loggedAdministrador = () => {
    if(localStorage.getItem('descifre_userData')!==null && localStorage.getItem('descifre_tokenUsuario')!==null){
        let data = JSON.parse(localStorage.getItem('descifre_userData'));
        let admin = false;
        data.permissoes.map((permissao, index) =>{
            if(permissao==="Administrador") admin = true;
            return null;
        });
        if(admin) return true;
        return false;
    }
    return false;
}

const loggedUsuario = () => {
    if(localStorage.getItem('descifre_userData')!==null && localStorage.getItem('descifre_tokenUsuario')!==null){
        let data = JSON.parse(localStorage.getItem('descifre_userData'));
        let admin = false;
        data.permissoes.map((permissao, index) =>{
            if(permissao==="Public") admin = true;
            return null;
        });
        if(admin) return true;
        return false;
    }
    return false;
}

const requirePatrocinador = (nextState, replace) => {
    if (!loggedPatrocinador()) {
        replace({
            pathname: '/usuario/login'
        });
    }
}

const requireUsuario = (nextState, replace) => {
    if (!loggedUsuario()) {
        replace({
            pathname: '/usuario/login'
        });
    }
}

const requireAdmistrador = (nextState, replace) => {
    if (!loggedAdministrador()) {
        replace({
            pathname: '/usuario/login'
        });
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        {/* Rotas públicas */}
        <Route path='/' component={Public.Padrao}>
            <IndexRoute component={Public.InicialScreen}/>
            <Route path='/usuario/login' component={Public.LoginScreen}></Route>
            <Route path='/usuario/alterar-senha/:token' component={Public.AlterarSenhaScreen}></Route>
            <Route path='/usuario/cadastro' component={Public.CadastroScreen}></Route>
            <Route path='/usuario/recuperar-senha' component={Public.RecuperarSenhaScreen}></Route>
            <Route path="/usuario/cadastro-indicacoes/:idUsuario" component={Public.CadastroScreenIndicacao}></Route>
            <Route path="/usuario/politica-de-privacidade" component={Public.PoliticaDePrivacidade}></Route>
        </Route>

        {/* Rotas patrocinador */}
        <Route path='/patrocinador/' component={Patrocinador.Padrao} >
            <IndexRoute component={Patrocinador.HomeScreen}/>
        </Route>

        {/* Rotas administrativas */}
        <Route path='/administrador/' component={Admin.Padrao} onEnter={requireAdmistrador}>
        
            <IndexRoute component={Admin.HomeScreen}/>
            
            <Route path="/administrador/questoes/adicionar" component={Admin.Questao.NovaQuestaoScreen}></Route>
            <Route path="/administrador/questoes/ver" component={Admin.Questao.VerQuestoesScreen}></Route>
            <Route path="/administrador/questoes/editar" component={Admin.Questao.EditarQuestaoScreen}></Route>
            
            <Route path="/administrador/patrocinador/adicionar" component={Admin.Patrocinadores.NovoPatrocinadorScreen}></Route>
            <Route path="/administrador/patrocinador" component={Admin.Patrocinadores.PatrocinadoresScreen}></Route>
            <Route path="/administrador/patrocinador/ver" component={Admin.Patrocinadores.VerPatrocinadorScreen}></Route>

            <Route path="/administrador/rodada/adicionar" component={Admin.Rodadas.NovaRodadaScreen}></Route>
            <Route path="/administrador/rodada/ver" component={Admin.Rodadas.VerRodadaScreen}></Route>
            <Route path="/administrador/rodada/editar" component={Admin.Rodadas.EditarRodadaScreen}></Route>
            
            <Route path="/administrador/perfil" component={Admin.Perfil.PerfilScreen}></Route>
            
            <Route path="/administrador/usuarios" component={Admin.Usuario.UsuarioScreen}></Route>
            <Route path="/administrador/usuario/ver" component={Admin.Usuario.VerUsuarioScreen}></Route>
            
            <Route path="/administrador/cifras" component={Admin.Cifras.CifrasScreen}></Route>
            <Route path="/administrador/cifras/ver" component={Admin.Cifras.VerTransacaoScreen}></Route>
        </Route>
        
        {/*Rotas usuário comum*/}
        <Route path='/usuario/' component={Usuario.Padrao} onEnter={requireUsuario}>
            <IndexRoute component={Usuario.HomeScreen}/>
            <Route path="/usuario/jogo" component={Usuario.JogoScreen}></Route>
            <Route path="/usuario/resultados" component={Usuario.ResultadoScreen}></Route>
            <Route path="/usuario/classificacao/:idRodada" component={Usuario.ClassificacaoScreen}></Route>
            <Route path="/usuario/historico/" component={Usuario.HistoricoScreen}></Route>
            <Route path="/usuario/comprar/" component={Usuario.CompraCifrasScreen}></Route>
            <Route path="/usuario/perfil/" component={Usuario.PerfilScreen}></Route>
            <Route path="/usuario/treino/" component={Usuario.TreinoScreen}></Route>
            <Route path="/usuario/treino/ranking/" component={Usuario.RankingTreinoScreen}></Route>
            <Route path="/usuario/indicacoes/" component={Usuario.IndicacoesScreen}></Route>
            <Route path="/usuario/transacoes/" component={Usuario.TransacoesScreen}></Route>
        </Route>

        {/* Rotas de erros */}
        <Route component={Public.Padrao}>
            <Route path='/erros/404' component={Public.Error404Screen} />
        </Route>
        
        {/* Cath erros */}
        <Redirect from="*" to='/erros/404'/>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
