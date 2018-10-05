import React, { Component } from "react";
import { Link } from "react-router";
import providerLogout from "../../providers/public/autenticacao/providerLogout";
import utilLocalStorage from '../../util/localStorage/';
import {browserHistory} from "react-router/lib";
import toastr from "toastr";
export default class MenuUsuario extends Component{
    constructor(){
        super();
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }
    handleSair = async (e) =>{
        e.preventDefault();
        let sairSessao = await providerLogout.sairSessao();
        
        if(!sairSessao.status){
            toastr.error("Tivemos um problema ao finalizar sua sessão por favor tente novamente.", "Erro ao realizar logout");
        }else{
            utilLocalStorage.clearAll();
            toastr.success("Sua sessão foi encerrada com sucesso, volte logo :)", "Sessão finalizada");
            browserHistory.push('/');  
        }           
    }
    render(){
        return(
            <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                <li className="nav-item">
                    <Link to='/usuario/' className="nav-link">Início</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/indicacoes/' className="nav-link">Indicar Amigos</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/historico/' className="nav-link">Histórico de rodadas</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/comprar/' className="nav-link">Comprar cifras</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/perfil/' className="nav-link">Perfil</Link>
                </li>
                <li onClick={(e) => this.handleSair(e)} className="nav-item">
                    <Link to='/usuario/sair' className="nav-link">Sair</Link>
                </li>
            </ul>
        );
    }
}