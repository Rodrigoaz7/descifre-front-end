import React from 'react';
import ReactDOM from 'react-dom';
import Public from './screens/public/index';
import Admin from './screens/administrador/index';
import { Router, Route, IndexRoute, browserHistory } from 'react-router/lib';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={Public.Padrao}>
            <IndexRoute component={Public.InicialScreen}/>
            <Route path='/usuario/login' component={Public.LoginScreen}></Route>
            <Route path='/usuario/cadastro' component={Public.CadastroScreen}></Route>
            <Route path='/usuario/recuperar-senha' component={Public.RecuperarSenhaScreen}></Route>
        </Route>
        <Route path='/administrador/' component={Admin.Padrao}>
            <IndexRoute component={Admin.HomeScreen}/>
            <Route path="/administrador/questoes/adicionar" component={Admin.Questao.NovaQuestaoScreen}></Route>
            <Route path="/administrador/questoes/ver" component={Admin.Questao.VerQuestoesScreen}></Route>
            <Route path="/administrador/rodada/adicionar" component={Admin.Rodadas.NovaRodadaScreen}></Route>
            <Route path="/administrador/rodada/ver" component={Admin.Rodadas.VerRodadaScreen}></Route>
        </Route>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
