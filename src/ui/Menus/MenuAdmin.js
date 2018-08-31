import React, { Component } from "react";
import { Link } from "react-router";
export default class MenuNavPublic extends Component{
    render(){
        return(
            <ul className="navbar-nav align-items-lg-center ml-lg-auto">
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
                <li className="nav-item">
                    <Link to='/administrador/sair' className="nav-link">Sair</Link>
                </li> 
            </ul>
        );
    }
}