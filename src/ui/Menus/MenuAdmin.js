import React, { Component } from "react";
import { Link } from "react-router";
import providerLogout from "../../providers/public/autenticacao/providerLogout";
import utilLocalStorage from '../../util/localStorage/';
import {browserHistory} from "react-router/lib";
import toastr from "toastr";

export default class MenuNavPublic extends Component{
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
        this.state = {
            width: 768
        }
    }
    async componentDidMount(){
        await this.setState({
            width: window.innerWidth
        });
        window.addEventListener("resize", async ()=>{
            await this.setState({
                width: window.innerWidth
            });
        })
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
            <ul className="navbar-nav align-items-lg-center ml-lg-auto" data-toggle="collapse" data-target={this.state.width>990 ?"" :"#navbar_global"} aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation" role="button">
                <li className="nav-item">
                    <Link to='/administrador/' className="nav-link">Início</Link>
                </li>
                <li className="nav-item">
                    <Link to='/administrador/usuarios' className="nav-link">Usuários</Link>
                </li>
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link" data-toggle="dropdown" href="" role="button">
                        <i className="ni ni-collection d-lg-none"></i>
                        <span className="nav-link-inner--text">Patrocinadores</span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to="/administrador/patrocinador/adicionar" className="dropdown-item">Novo</Link>
                        <Link to="/administrador/patrocinador/" className="dropdown-item">Ver patrocinadores</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link" data-toggle="dropdown"  href="" role="button">
                        <i className="ni ni-collection d-lg-none"></i>
                        <span className="nav-link-inner--text">Questões</span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to="/administrador/questoes/adicionar" className="dropdown-item">Nova</Link>
                        <Link to="/administrador/questoes/ver" className="dropdown-item">Ver questões</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link" data-toggle="dropdown"  href="" role="button">
                        <i className="ni ni-collection d-lg-none"></i>
                        <span className="nav-link-inner--text">Rodadas</span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to="/administrador/rodada/adicionar" className="dropdown-item">Nova</Link>
                        <Link to="/administrador/rodada/ver" className="dropdown-item">Ver rodadas</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to='/administrador/cifras' className="nav-link">Cifras</Link>
                </li>
                <li className="nav-item">
                    <Link to='/administrador/perfil' className="nav-link">Perfil</Link>
                </li> 
                <li onClick={(e) => this.handleSair(e)} className="nav-item">
                    <Link to='/' className="nav-link">Sair</Link>
                </li> 
            </ul>
        );
    }
}