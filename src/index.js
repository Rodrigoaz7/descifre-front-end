import React from 'react';
import ReactDOM from 'react-dom';
import Public from './screens/public/index';
import Admin from './screens/administrador/index';
import { Router, Route, IndexRoute, browserHistory } from 'react-router/lib';
import registerServiceWorker from './registerServiceWorker';

const loggedAdministrador = () => {
    if(localStorage.getItem('descifre_userData')!==null && localStorage.getItem('descifre_tokenUsuario')!==null){
        let data = JSON.parse(localStorage.getItem('descifre_userData'));
        let admin = false;
        data.permissoes.map((permissao, index) =>{
            if(permissao=="Administrador") admin = true;
        });
        if(admin) return true;
        return false;
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
        <Route path='/' component={Public.Padrao}>
            <IndexRoute component={Public.InicialScreen}/>
            <Route path='/usuario/login' component={Public.LoginScreen}></Route>
            <Route path='/usuario/cadastro' component={Public.CadastroScreen}></Route>
            <Route path='/usuario/recuperar-senha' component={Public.RecuperarSenhaScreen}></Route>
        </Route>

        <Route path='/administrador/' component={Admin.Padrao} onEnter={requireAdmistrador}>
            <IndexRoute component={Admin.HomeScreen}/>
            
            <Route path="/administrador/questoes/adicionar" component={Admin.Questao.NovaQuestaoScreen}></Route>
            <Route path="/administrador/questoes/ver" component={Admin.Questao.VerQuestoesScreen}></Route>
            
            <Route path="/administrador/patrocinador/adicionar" component={Admin.Patrocinadores.NovoPatrocinadorScreen}></Route>
            <Route path="/administrador/patrocinador" component={Admin.Patrocinadores.PatrocinadoresScreen}></Route>

            <Route path="/administrador/rodada/adicionar" component={Admin.Rodadas.NovaRodadaScreen}></Route>
            <Route path="/administrador/rodada/ver" component={Admin.Rodadas.VerRodadaScreen}></Route>
            
            <Route path="/administrador/perfil" component={Admin.Perfil.PerfilScreen}></Route>
            
            <Route path="/administrador/usuarios" component={Admin.Usuario.UsuarioScreen}></Route>
            
            <Route path="/administrador/cifras" component={Admin.Cifras.CifrasScreen}></Route>
        </Route>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
