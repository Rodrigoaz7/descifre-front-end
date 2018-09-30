import React, { Component } from "react";
import { Link } from "react-router";
export default class MenuUsuario extends Component{
    render(){
        return(
            <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                <li className="nav-item">
                    <Link to='/usuario/' className="nav-link">Início</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/treino/' className="nav-link">Treino</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/historico/' className="nav-link">Histórico de rodadas</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/comprar' className="nav-link">Comprar cifras</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/Perfil' className="nav-link">Perfil</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/sair' className="nav-link">Sair</Link>
                </li>
            </ul>
        );
    }
}