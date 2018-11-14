import React, { Component } from "react";
import { Link } from "react-router";
import providerLogout from "../../providers/public/autenticacao/providerLogout";
import utilLocalStorage from '../../util/localStorage/';
import {browserHistory} from "react-router/lib";
import toastr from "toastr";
import swal from 'sweetalert2';

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
        
        swal({
            title: 'Você tem certeza?',
            text: "Deseja realmente sair?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, quero sair!',
            cancelButtonText: 'Não quero sair'
        }).then(async (result) => {
            
            if (result.value) {
                let sairSessao = await providerLogout.sairSessao();
        
                if(!sairSessao.status){
                    toastr.error("Tivemos um problema ao finalizar sua sessão por favor tente novamente.", "Erro ao realizar logout");
                }else{
                    utilLocalStorage.clearAll();
                    toastr.success("Sua sessão foi encerrada com sucesso, volte logo :)", "Sessão finalizada");
                    browserHistory.push('/');  
                }   
            }
        });        
    }
    render(){
        return(
            <ul className="navbar-nav align-items-lg-center ml-lg-auto" data-toggle="collapse" data-target={this.state.width>990 ?"" :"#navbar_global"} aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation" role="button">
                <li className="nav-item">
                    <Link to='/usuario/' className="nav-link">Início</Link>
                </li>   
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link" data-toggle="dropdown"  href="" role="button">
                        <i className="ni ni-bold-down d-lg-none"></i>
                        <span className="nav-link-inner--text">Jogo</span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to='/usuario/treino/' className="dropdown-item">Treino</Link>
                        <Link to='/usuario/treino/ranking/' className="dropdown-item">Ranking semanal</Link>
                        <Link to='/usuario/historico/' className="dropdown-item">Histórico de rodadas</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link" data-toggle="dropdown"  href="" role="button">
                        <i className="ni ni-bold-down d-lg-none"></i>
                        <span className="nav-link-inner--text">Compras e transações</span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to='/usuario/comprar/' className="dropdown-item">Cifras</Link>
                        <Link to='/usuario/transacoes/' className="dropdown-item">Transações</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link" data-toggle="dropdown"  href="" role="button">
                        <i className="ni ni-bold-down d-lg-none"></i>
                        <span className="nav-link-inner--text">Meu De$cifre</span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to='/usuario/perfil/' className="dropdown-item">Perfil</Link>
                        <Link to='/usuario/indicacoes/' className="dropdown-item">Indicar amigos</Link>
                        <Link to='/usuario/vouchers/' className="dropdown-item">Vouchers</Link>
                    </div>
                </li>
                <li onClick={(e) => this.handleSair(e)} className="nav-item" style={{cursor: 'pointer'}}>
                    <Link to='' className="nav-link">Sair</Link>
                </li>
            </ul>
        );
    }
}