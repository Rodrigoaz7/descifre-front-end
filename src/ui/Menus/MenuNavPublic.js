import React, { Component } from "react";
import { Link } from "react-router";
export default class MenuNavPublic extends Component{
    render(){
        return(
            <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                <li className="nav-item">
                    <Link to='/' className="nav-link">Início</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/cadastro' className="nav-link">Cadastrar-se</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/login' className="nav-link">Entrar</Link>
                </li>
            </ul>
        );
    }
}